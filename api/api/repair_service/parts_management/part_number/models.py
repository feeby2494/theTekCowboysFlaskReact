from api import db

class Part_Number(db.Model):
    __tablename__ = "part_number"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    part_instance_list = db.relationship("Part_Instance", backref="part_number", lazy=True)
    inventory_list = db.relationship("Inventory", backref="part_number", lazy=True)