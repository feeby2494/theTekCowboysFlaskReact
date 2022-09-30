from api import db

class Model(db.Model):
    __tablename__ = "model"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    brand_id = db.Column(db.Integer, db.ForeignKey("brand.id"), nullable=False)
    repair_type_list = db.relationship("Repair_Type", backref="model", lazy=True)
