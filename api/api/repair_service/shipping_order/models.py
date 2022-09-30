from api import db

class Shipping_Order(db.Model):
    __tablename__ = "shipping_order"
    id = db.Column(db.Integer, primary_key=True)
    repair_list = db.relationship('Repair', backref='shipping_order', lazy=True)
    service = db.Column(db.String)
    tracking = db.Column(db.String)