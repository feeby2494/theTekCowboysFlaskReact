from api import db

class Part_Instance(db.Model):
    __tablename__ = "part_instance"
    id = db.Column(db.Integer, primary_key=True)
    part_number_id = db.Column(db.Integer, db.ForeignKey("part_number.id"), nullable=False)
    defective = db.Column(db.Boolean, default=False)
    used = db.Column(db.Boolean, default=False)
    broken_by_tech = db.Column(db.Boolean, default=False)
    repair_job_id = db.Column(db.Integer, db.ForeignKey("repair_job.id"))
