from api import db

class Sales_Order(db.Model):
    __tablename__ = "sales_order"
    id = db.Column(db.Integer, primary_key=True)
    revenue_item_list = db.relationship('Revenue_Item', backref='sales_order', lazy=True)
    expenditure_item_list = db.relationship('Expenditure_Item', backref='sales_order', lazy=True)
    work_order_list = db.relationship('Work_Order', backref='sales_order', lazy=True)
    total_profit = db.Column(db.Float)