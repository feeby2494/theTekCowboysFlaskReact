from api import db, app
from sqlalchemy import exc
import datetime
import jwt
from api.site_user import SiteUser, Address, Contact

class Web_Order(db.Model):
    __tablename__ = "web_order"
    id = db.Column(db.Integer, primary_key=True)
    submitted_on = db.Column(db.DateTime)
    user_id = db.Column(db.Integer, db.ForeignKey('site_user.id'), nullable=False)
    project_list = db.relationship('Project', backref='web_order', lazy=True)

    def __init__(self, user_id):
        self.submitted_on = datetime.datetime.now()
        self.user_id = user_id

    def __repr__(self):
        return f'{[project for project in self.project_list]}'

    

class Project(db.Modal):
    id = db.Column(db.Integer, primary_key=True)
    wordpress = db.Column(db.Boolean, unique=False)
    project_explanation = db.Column(db.String(1000), unique=False)
    extra_details = db.Column(db.String(1000), unique=False)
    web_order_id = db.Column(db.Integer, db.ForeignKey('web_order.id'), nullable=False)

