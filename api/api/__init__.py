import os
import sys
from flask import Flask, redirect, Response
from flask_cors import CORS, cross_origin
from flask_sqlalchemy  import SQLAlchemy
import uuid

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
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('FLASK_DB')



# Application Factory
# db = SQLAlchemy()
# migrate = Migrate()

# def create_app():
#     """Application-factory pattern"""
#     app = Flask(__name__)

#      # take care od CORS
#     cors = CORS(app)
#     app.config['CORS_HEADERS'] = 'Content-Type'

#     # Don't forget to change this SECRET_KEY and SQLALCHEMY_DATABASE_URI and put in sepearte file or .env file and have git ignore it
#     app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
#     app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('FLASK_DB')

#     db.init_app(app)
#     migrate.init_app(app, db)
#     return app

# create_app()



# # init DB
db = SQLAlchemy(app)

# # # init Migrate
migrate = Migrate(app, db)

import api.api.site_user.routes
import api.api.jwt_token.routes
import api.api.point.routes
import api.api.todo.routes
import api.api.vocab.routes
import api.api.general_ledger.routes
import api.api.videos.routes
import api.api.mail_in_service.routes

if __name__ == '__main__':
    app.run(debug=True)