from api import db

class Brand(db.Model):
    __tablename__ = "brand"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)
    models = db.relationship("Model", backref='brand', lazy=True)

################################################## MODELS ######################################################

class Model(db.Model):
    __tablename__ = "model"
    id = db.Column(db.Integer, primary_key=True)
    model_name = db.Column(db.String, nullable=False, unique=True)
    brand_id = db.Column(db.Integer, db.ForeignKey("brand.id"), nullable=False)
    repairs = db.relationship('Repair', backref='model', lazy=True)
    parts = db.relationship('Part', backref='model', lazy=True)
    inventories = db.relationship('Inventory', backref='model', lazy=True)

################################################## REPAIRS #####################################################

class Repair(db.Model):
    __tablename__ = "repair"
    id = db.Column(db.Integer, primary_key=True)
    repair_type = db.Column(db.String, nullable=False, unique=True)
    repair_area = db.Column(db.String, nullable=False)
    model_id = db.Column(db.Integer, db.ForeignKey("model.id"), nullable=False)
    parts = db.relationship('Part', backref='repair', lazy=True)
    inventories = db.relationship('Inventory', backref='repair', lazy=True)

################################################## PARTS #######################################################

class Part(db.Model):
    __tablename__ = "part"
    id = db.Column(db.Integer, primary_key=True)
    part_number = db.Column(db.String, unique=True)
    alt_part_numbers = db.Column(db.String)
    model_id = db.Column(db.Integer, db.ForeignKey("model.id"), nullable=False)
    repair_id = db.Column(db.Integer, db.ForeignKey("repair.id"), nullable=False)
    inventories = db.relationship('Inventory', backref='part', lazy=True)

################################################## LOCATIONS ###################################################

class Location(db.Model):
    __tablename__ = "location"
    id = db.Column(db.Integer, primary_key=True)
    location_name = db.Column(db.String, nullable=False, unique=True)
    inventories = db.relationship('Inventory', backref='location', lazy=True)

################################################## STOCK #######################################################

class Inventory(db.Model):
    __tablename__ = "inventory"
    id = db.Column(db.Integer, primary_key=True)
    count = db.Column(db.Integer, nullable=False)
    part_id = db.Column(db.Integer, db.ForeignKey("part.id"), nullable=False)
    location_id = db.Column(db.Integer, db.ForeignKey("location.id"), nullable=False)
    repair_id = db.Column(db.Integer, db.ForeignKey("repair.id"), nullable=False)
    model_id = db.Column(db.Integer, db.ForeignKey("model.id"), nullable=False)
