from api import db

class Work_Order(db.Model):
    __tablename__ = "work_order"
    id = db.Column(db.Integer, primary_key=True)
    repair_list = db.relationship("Repair", backref="work_order", lazy=True)
    completed = db.Column(db.Boolean, default=False)
    submited_by = db.Column(db.Date)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    sales_order_id = db.Column(db.Integer, db.ForeignKey("sales_order.id"), nullable=False)