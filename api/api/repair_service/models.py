from api import db, admin, current_user, ModelView
import datetime
from api.site_user.models import SiteUser

class OrderContact(db.Model):
    __tablename__ = "order_contact"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(127), unique=False)
    email = db.Column(db.String(127), unique=True)
    order_list = db.relationship("Order", backref="order_contact", lazy=True)

class OrderAddress(db.Model):
    __tablename__ = "order_address"
    id = db.Column(db.Integer, primary_key=True)
    line_one = db.Column(db.String(127), unique=False)
    line_two = db.Column(db.String(127), unique=False, nullable=True)
    city = db.Column(db.String(127), unique=False)
    state = db.Column(db.String(127), unique=False)
    state = db.Column(db.String(127), unique=False)
    postal_code = db.Column(db.String(127), unique=False)
    country = db.Column(db.String(127), unique=False)
    order_list = db.relationship("Order", backref="order_address", lazy=True)

class Order(db.Model):
    __tablename__ = "order"
    id = db.Column(db.Integer, primary_key=True)
    device_list = db.relationship("Device", backref="order", lazy=True)
    completed = db.Column(db.Boolean, default=False)
    submitted_date = db.Column(db.DateTime, default=datetime.datetime.now,  nullable=False)
    contact = db.Column(db.Integer, db.ForeignKey("order_contact.id"), nullable=True)
    address = db.Column(db.Integer, db.ForeignKey("order_address.id"), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey("site_user.id"), nullable=True)

class Device(db.Model):
    __tablename__ = "device"
    id = db.Column(db.Integer, primary_key=True)
    brand = db.Column(db.String(127), unique=False)
    model = db.Column(db.String(127), unique=False)
    issue = db.Column(db.String(255), unique=False)
    serial_number = db.Column(db.String(127), unique=False)
    completed = db.Column(db.Boolean, default=False)
    received_by = db.Column(db.DateTime, nullable=True)
    finished_by = db.Column(db.DateTime)
    work_order_id = db.Column(db.Integer, db.ForeignKey("order.id"), nullable=False)

    def __str__(self):
        return f"{self.brand}-{self.model}-{self.issue}"
    

# Admin Panel setup
class RepairServiceModelView(ModelView):
    def is_accessible(self):
        return not current_user.is_authenticated

# add Admin views for models
admin.add_view(RepairServiceModelView(OrderContact, db.session))
admin.add_view(RepairServiceModelView(OrderAddress, db.session))
admin.add_view(RepairServiceModelView(Order, db.session))
admin.add_view(RepairServiceModelView(Device, db.session))