from api import db

class ledger_line_item(db.Model):
    __tablename__ = "point"
    id = db.Column(db.Integer, primary_key=True)
    desc = db.Column(db.String, nullable=False)
    part_number = db.Column(db.String, nullable=False)
    type = db.Column(db.String, nullable=False)
    expense = db.Column(db.Float, primary_key=True)
    revenue = db.Column(db.Float, primary_key=True)
    profit = db.Column(db.Float, primary_key=True)
    price = db.Column(db.Float, primary_key=True)
    qty_sold_per_listing = db.Column(db.Integer, primary_key=True)
    ebay_order_number = db.Column(db.String, primary_key=True)
    amazon_order_number = db.Column(db.String, primary_key=True)
    ebay_fees = db.Column(db.Float, primary_key=True)
    shipping = db.Column(db.Float, primary_key=True)
    taxes = db.Column(db.Float, primary_key=True)
    extra_fees = db.Column(db.Float, primary_key=True)
    part_expenses = db.Column(db.Float, primary_key=True)
    seller = db.Column(db.String, nullable=False)
    created_by = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    date = db.Column(db.Date,  nullable=False)

    def __repr__(self):
        return '<Ledger Line Item %r>' % self.desc