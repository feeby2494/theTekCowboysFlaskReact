from api import db

class Repair(db.Model):
    __tablename__ = "repair"
    id = db.Column(db.Integer, primary_key=True)
    serial_number = db.Column(db.String(127), unique=False)
    completed = db.Column(db.Boolean, default=False)
    received_by = db.Column(db.DateTime, nullable=False)
    finished_by = db.Column(db.DateTime)
    work_order_id = db.Column(db.Integer, db.ForeignKey("work_order.id"), nullable=False)
    tech_id = db.Column(db.Integer, db.ForeignKey("tech.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False))
    repair_job_list = db.relationship('Repair_Job', backref='repair', lazy=True)
    shipping_order_id = db.Column(db.Integer, db.ForeignKey("shipping_order"))
