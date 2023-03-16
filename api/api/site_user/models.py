from turtle import pos
from api import db, app
import datetime
import jwt
from werkzeug.security import generate_password_hash, check_password_hash
from api.todo.models import Todo
from api.point.models import Point
from api import UserMixin, LoginManager, current_user, login, admin, ModelView, db, admin

class SiteUser(db.Model):
    __tablename__ = "site_user"
    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(127), unique=True)
    username = db.Column(db.String(127), unique=True)
    name = db.Column(db.String(127), unique=False)
    email = db.Column(db.String(100), unique=True)
    phone = db.Column(db.String(127), unique=False)
    password = db.Column(db.String(512)) #This field was too short for password field
    admin = db.Column(db.Boolean)
    registered_on = db.Column(db.DateTime, nullable=False)
    todos = db.relationship('Todo', backref='site_user', lazy=True)
    points = db.relationship('Point', backref='site_user', lazy=True)
    address_list = db.relationship('Address', backref='site_user', lazy=True)

    def __init__(self, public_id, username, name, email, password, admin=False):
        self.public_id = public_id
        self.username = username
        self.name = name
        self.email = email
        self.password = generate_password_hash(password, method='pbkdf2:sha256', salt_length=10)
        self.registered_on = datetime.datetime.now()
        self.admin = admin

    def __repr__(self):
        return f'User: username => {self.username}'

    def encode_auth_token(self, public_id):
        """
            Generates the Auth Token
            :return: string
        """

        try:
            payload = {
                'exp': datetime.datetime.utcnow() + datetime.timedelta( hours=8 ),
                'iat': datetime.datetime.utcnow(),
                'public_id': public_id
            }

            return jwt.encode(
                payload,
                app.config.get('SECRET_KEY'),
                algorithm='HS256'
            )
        except Exception as e:
            return e
    
    def decode_auth_token(auth_token):
        """
            Decodes the auth token
            :param auth_token:
            :return: integer|string
        """

        try:
            payload = jwt.decode(auth_token, app.config.get('SECRET_KEY'), algorithm="HS256")
        except jwt.ExpiredSignatureError:
            return 'Signature expired. Please log in again.'
        except jwt.InvalidTokenError:
            return  'Invalid token. Please log in again.'

class Address(db.Model):
    __tablename__ = "address"
    id = db.Column(db.Integer, primary_key=True)
    line_one = db.Column(db.String(127), unique=False)
    line_two = db.Column(db.String(127), unique=False)
    city = db.Column(db.String(80), unique=False)
    state = db.Column(db.String(50), unique=False)
    postal_code = db.Column(db.String(50), unique=False)
    country = db.Column(db.String(80), unique=False)
    user_id = db.Column(db.Integer, db.ForeignKey('site_user.id'), nullable=False)

    def __init__(self, line_one, line_two, city, state, postal_code, country, user_id):
        self.line_one = line_one
        self.line_two = line_two
        self.city = city
        self.state = state
        self.postal_code = postal_code
        self.country = country
        self.user_id = user_id



# Admin Login Setup

@login.user_loader
def load_user(user_id):
    return SiteUser.query.get(user_id)



# Admin Panel setup
class SiteUserModelView(ModelView):
    def is_accessible(self):
        return not current_user.is_authenticated

# add Admin views for models
admin.add_view(SiteUserModelView(SiteUser, db.session))
admin.add_view(SiteUserModelView(Address, db.session))
