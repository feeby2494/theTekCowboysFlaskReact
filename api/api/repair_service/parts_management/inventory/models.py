from api import db

class Inventory(db.Model):
    __tablename__ = "inventory"
    id = db.Column(db.Integer, primary_key=True)
    part_number_id = db.Column(db.Integer, db.ForeignKey("part_number.id"), nullable=False)
    location_id = db.Column(db.Integer, db.ForeignKey("location.id"), nullable=False)
    count = db.Column(db.Integer)
