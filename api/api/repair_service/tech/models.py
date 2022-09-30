from api import db

class Tech(db.Model):
    __tablename__ = "tech"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    position = db.Column(db.String)
    repair_list = db.relationship("Repair", backref="tech", lazy=True)
    