from api import db

class Repair_Job(db.Model):
    __tablename__ = "repair_job"
    id = db.Column(db.Integer, primary_key=True)
    part_instance_list = db.relationship('Part_Instance', backref='repair_job', lazy=True)
    diagnosed_by = db.Column(db.DateTime)
    repair_id = db.Column(db.Integer, db.ForeignKey("repair.id"), nullable=False)
    
