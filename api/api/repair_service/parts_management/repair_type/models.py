from api import db

class Repair_Type(db.Model):
    __tablename__ = "repair_type"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    labor_time = db.Column(db.Integer)
    model_id = db.Column(db.Integer, db.ForeignKey("model.id"), nullable=False)