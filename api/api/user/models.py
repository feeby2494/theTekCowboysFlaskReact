from api import db, app
from sqlalchemy import exc
import datetime
import jwt
from werkzeug.security import generate_password_hash, check_password_hash


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(50), unique=True)
    username = db.Column(db.String(50), unique=True)
    name = db.Column(db.String(30), unique=False)
    email = db.Column(db.String(80), unique=True)
    password = db.Column(db.String(80))
    admin = db.Column(db.Boolean)
    registered_on = db.Column(db.DateTime, nullable=False)
    todos = db.relationship('Todo', backref='user', lazy=True)
    points = db.relationship('Point', backref='user', lazy=True)

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