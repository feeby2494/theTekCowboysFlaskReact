import os
import sys
from flask import Flask, redirect, Response
from flask_cors import CORS, cross_origin
from flask_sqlalchemy  import SQLAlchemy
import uuid

from sqlalchemy import create_engine
from sqlalchemy_utils import database_exists, create_database

from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView

from flask_login import UserMixin, LoginManager, current_user

import psycopg2

# Importing API and View modules


from dotenv import load_dotenv
# from flask_bcrypt import Bcrypt
from flask_migrate import Migrate

load_dotenv()

# No Factory
app = Flask(__name__)

# take care od CORS
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Don't forget to change this SECRET_KEY and SQLALCHEMY_DATABASE_URI and put in sepearte file or .env file and have git ignore it
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')


# Checking if this environemnt is dev or prod, so we load the right db
if(os.environ.get('FLASK_DEBUG') == True):
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DEV_LOCAL_DB')
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('FLASK_DB')

print(app.config['SQLALCHEMY_DATABASE_URI'])

# # init DB
db = SQLAlchemy(app)

# # # init Migrate
migrate = Migrate(app, db)

# Manage Login for admin panel
login = LoginManager(app, db)



# Initializing Admin panel
admin = Admin(app, db)

import api.site_user.routes
import api.jwt_token.routes
import api.point.routes
import api.todo.routes
import api.vocab.routes
import api.general_ledger.routes
import api.videos.routes
import api.mail_in_service.routes
import api.web_service.routes
import api.repair_service.routes

if __name__ == '__main__':
    app.run(debug=True)