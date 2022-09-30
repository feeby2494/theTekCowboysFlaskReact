from api import db
import datetime

class Address(db.Model):
    __tablename__ = "address"
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(127), unique=False)
    last_name = db.Column(db.String(127), unique=False)
    address_email = db.Column(db.String(100), unique=False)
    address_phone = db.Column(db.String(127), unique=False)
    address_line_one = db.Column(db.String(127), unique=False)
    address_line_two = db.Column(db.String(127), unique=False)
    address_city = db.Column(db.String(80), unique=False)
    address_state = db.Column(db.String(50), unique=False)
    address_postal_code = db.Column(db.String(50), unique=False)
    address_country = db.Column(db.String(80), unique=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)