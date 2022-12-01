from api import db
import datetime

# Will put every submission for device repair on a new work order with an option to add or remove new multiple repairs for each WO
################# Work Order: ###
class Work_Order(db.Model):
    __tablename__ = "work_order"
    id = db.Column(db.Integer, primary_key=True)
    completed = db.Column(db.Boolean, default=False)
    submitted_date = db.Column(db.DateTime, default=datetime.datetime.now,  nullable=False)
    delivery_method = db.Column(db.String)
    collection_date = db.Column(db.DateTime, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey("site_user.id"))
    repair_list = db.relationship('Repair', backref='work_order', lazy=True)
    customer_contact_list = db.relationship('Customer_Contact', backref='work_order', lazy=True)
    customer_address_list = db.relationship('Customer_Address', backref='work_order', lazy=True)

################# Repair VER II: ###
class Repair(db.Model):
    __tablename__ = "repair"
    id = db.Column(db.Integer, primary_key=True)
    brand = db.Column(db.String)
    model = db.Column(db.String)
    serial = db.Column(db.String)
    issue = db.Column(db.String)
    completed = db.Column(db.Boolean, default=False)
    date_submitted = db.Column(db.DateTime, default=datetime.datetime.now,  nullable=False)
    date_received = db.Column(db.DateTime)
    date_completed = db.Column(db.DateTime)
    user_id = db.Column(db.Integer, db.ForeignKey("site_user.id"), nullable=True)
    work_order_id = db.Column(db.Integer, db.ForeignKey("work_order.id"))

    def __str__(self):
        return str(f"{self.brand}-{self.model} SERAIL: {self.serial}")

################# Customer Contact: ###
class Customer_Contact(db.Model):
    __tablename__ = "customer_contact"
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    email = db.Column(db.String)
    phone = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey("site_user.id"), nullable=True)
    work_order_id = db.Column(db.Integer, db.ForeignKey("work_order.id"))
    
    def __str__(self):
        return str(self.email)

################# Customer Address: ###
class Customer_Address(db.Model):
    __tablename__ = "customer_address"
    street_line_one = db.Column(db.String)
    street_line_two = db.Column(db.String)
    city = db.Column(db.String)
    state = db.Column(db.String)
    postal_code = db.Column(db.String)
    country = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey("site_user.id"), nullable=True)
    work_order_id = db.Column(db.Integer, db.ForeignKey("work_order.id"))

    def __str__(self):
        return str(f"{self.street_line_one} {self.street_line_two} {self.city}")




################# Repair VER I (WILL PHASE OUT!): ###

class Mail_In_Repair(db.Model):
    __tablename__ = "mail_in_repair"
    id = db.Column(db.Integer, primary_key=True)
    repair_first_name = db.Column(db.String)
    repair_last_name = db.Column(db.String)
    repair_email = db.Column(db.String)
    repair_phone = db.Column(db.String)
    repair_address_line_one = db.Column(db.String)
    repair_address_line_two = db.Column(db.String)
    repair_address_city = db.Column(db.String)
    repair_address_state = db.Column(db.String)
    repair_address_postal_code = db.Column(db.String)
    repair_address_country = db.Column(db.String)
    repair_brand = db.Column(db.String)
    repair_model = db.Column(db.String)
    repair_serial = db.Column(db.String)
    repair_issue = db.Column(db.String)
    repair_completed = db.Column(db.Boolean, default=False)
    repair_date_submitted = db.Column(db.DateTime, default=datetime.datetime.now,  nullable=False)
    repair_date_received = db.Column(db.DateTime)
    repair_date_completed = db.Column(db.DateTime)
    repair_user_id = db.Column(db.Integer, db.ForeignKey("site_user.id"))
    work_order_id = db.Column(db.Integer, db.ForeignKey("work_order.id"))

class Mail_In_Web(db.Model):
    __tablename__ = "mail_in_web"
    id = db.Column(db.Integer, primary_key=True)
    web_service_first_name  = db.Column(db.String)
    web_service_last_name  = db.Column(db.String)
    web_service_email  = db.Column(db.String)
    web_service_phone  = db.Column(db.String)
    web_service_project_explanation  = db.Column(db.String)
    web_service_extra_details  = db.Column(db.String)
    web_service_date_submitted = db.Column(db.DateTime, default=datetime.datetime.now,  nullable=False)
    web_service_user_id = db.Column(db.Integer, db.ForeignKey("site_user.id"))