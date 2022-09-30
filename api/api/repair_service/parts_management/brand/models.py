from api import db

class Brand(db.Model):
    __tablename__ = "brand"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    model_list = db.relationship("Model", backref="brand", lazy=True)