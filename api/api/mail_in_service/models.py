from api import db
import datetime

class Mail_In_Repair(db.Model):
    __tablename__ = "mail_in_repair"
    id = db.Column(db.Integer, primary_key=True)
    repair_first_name = db.Column(db.String)
    repair_last_name = db.Column(db.String)
    repair_email = db.Column(db.String)
    repair_phone = db.Column(db.String)
    repair_address_line_one = db.Column(db.String)
    repair_address_line_two = db.Column(db.String)
    repair_address_city = db.Column(db.String)
    repair_address_state = db.Column(db.String)
    repair_address_postal_code = db.Column(db.String)
    repair_address_country = db.Column(db.String)
    repair_brand = db.Column(db.String)
    repair_model = db.Column(db.String)
    repair_serial = db.Column(db.String)
    repair_issue = db.Column(db.String)
    repair_date_submitted = db.Column(db.DateTime, default=datetime.datetime.now,  nullable=False)
    repair_date_received = db.Column(db.DateTime)
    repair_date_completed = db.Column(db.DateTime)
    repair_user_id = db.Column(db.Integer, db.ForeignKey("site_user.id"))

class Mail_In_Web(db.Model):
    __tablename__ = "mail_in_web"
    id = db.Column(db.Integer, primary_key=True)
    web_service_first_name  = db.Column(db.String)
    web_service_last_name  = db.Column(db.String)
    web_service_email  = db.Column(db.String)
    web_service_phone  = db.Column(db.String)
    web_service_project_explanation  = db.Column(db.String)
    web_service_extra_details  = db.Column(db.String)
    web_service_date_submitted = db.Column(db.DateTime, default=datetime.datetime.now,  nullable=False)
    web_service_user_id = db.Column(db.Integer, db.ForeignKey("site_user.id"))