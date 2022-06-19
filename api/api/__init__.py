import os
import sys
from flask import Flask, redirect, Response
from flask_cors import CORS, cross_origin
from flask_sqlalchemy  import SQLAlchemy
import uuid

from dotenv import load_dotenv
# from flask_bcrypt import Bcrypt
from flask_migrate import Migrate

load_dotenv()

app = Flask(__name__)

# take care od CORS
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Don't forget to change this SECRET_KEY and SQLALCHEMY_DATABASE_URI and put in sepearte file or .env file and have git ignore it
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('FLASK_DB')

# init DB
db = SQLAlchemy(app)

# init Migrate
migrate = Migrate(app, db)

# Importing API and View modules
import api.user.routes
import api.jwt_token.routes
import api.point.routes
import api.todo.routes
import api.vocab.routes
import api.general_ledger.routes

if __name__ == '__main__':
    app.run(debug=True)