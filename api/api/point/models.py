from api import db

class Point(db.Model):
    __tablename__ = "point"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    explanation = db.Column(db.String, nullable=False)
    language = db.Column(db.String, nullable=False)
    chapter = db.Column(db.String)
    example1 = db.Column(db.String)
    example2 = db.Column(db.String)
    example3 = db.Column(db.String)
    created_by = db.Column(db.Integer, db.ForeignKey("site_user.id"), nullable=False)
    date_created = db.Column(db.Date,  nullable=False)
    element_list = db.relationship('Element', backref='point', lazy=True)
    # category_list = db.relationship('Category', backref='point', lazy=True)

# Thinking that a table for elements with point_id as the foreign key will be better appoarch
# Will keep this just in case I like it better

class Element(db.Model):
    __tablename__ = "element"
    id = db.Column(db.Integer, primary_key=True)
    point_id = db.Column(db.Integer, db.ForeignKey("point.id"), nullable=False)
    text = db.Column(db.String, nullable=False)
    type = db.Column(db.String, nullable=False)

# class Category(db.Model):
#     __tablename__ = 'category'
#     id = db.Column(db.Integer, primary_key=True)
#     point_id = db.Column(db.Integer, db.ForeignKey("point.id"), nullable=False)
#     category = db.Column(db.String, nullable=False)