from api.api import db, app
from sqlalchemy import exc
import datetime
import jwt

class Web_service(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(127), unique=False)
    last_name = db.Column(db.String(127), unique=False)
    email = db.Column(db.String(100), unique=False)
    phone = db.Column(db.String(127), unique=False)
    project_explanation = db.Column(db.String(1000), unique=False)
    extra_details = db.Column(db.String(1000), unique=False)

    def __init__(self, first_name, last_name, email, phone, project_explanation, extra_details):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.phone = phone
        self.project_explanation = project_explanation
        self.extra_details = extra_details
        self.submitted_on = datetime.datetime.now()

    def __repr__(self):
        return f'\
            First Name: {self.first_name}\n\
            Last Name: {self.last_name}\n\
            Email: {self.email}\n\
            Project Explanation: {self.project_explanation}\n\
            Extra Details: {self.extra_details}\n\
        '