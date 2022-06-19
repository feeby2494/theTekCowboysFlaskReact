import datetime
from email.policy import default
from api import db

class Ledger_line_item(db.Model):
    __tablename__ = "ledger_line_item"
    id = db.Column(db.Integer, primary_key=True)
    desc = db.Column(db.String, nullable=False)
    part_number = db.Column(db.String)
    type = db.Column(db.String, nullable=False)
    expense = db.Column(db.Float)
    revenue = db.Column(db.Float)
    profit = db.Column(db.Float)
    price = db.Column(db.Float)
    qty_sold_per_listing = db.Column(db.Integer)
    ebay_order_number = db.Column(db.String)
    amazon_order_number = db.Column(db.String)
    ebay_fees = db.Column(db.Float)
    shipping = db.Column(db.Float)
    taxes = db.Column(db.Float)
    extra_fees = db.Column(db.Float)
    part_expenses = db.Column(db.Float)
    seller = db.Column(db.String)
    created_by = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    date = db.Column(db.DateTime, default=datetime.datetime.now,  nullable=False)

    def get_all_items(self):
        """
            Gets all line items
            :return: object
        """

        try:
            session = Session.object_session(self)
            query = session.query()
            print(query)
            
            return query
        except Exception as e:
            return e


    def __repr__(self):
        return '<Ledger Line Item %r>' % self.desc