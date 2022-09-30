from api import db

class Location(db.Model):
    __tablename__ = "location"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    inventory_list = db.relationship("Inventory", backref="location", lazy=True)
