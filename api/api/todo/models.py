from api import db, admin, ModelView

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(50))
    complete = db.Column(db.Boolean)
    user_id = db.Column(db.Integer, db.ForeignKey('site_user.id'), nullable=False)

admin.add_view(ModelView(Todo, db.session))