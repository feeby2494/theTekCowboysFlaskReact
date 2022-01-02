



# Need to add different types of users




################################################################################################################
#
#                                                  WELCOME TO THE TODO LIST API!
#
################################################################################################################

from flask import Flask, request, jsonify, Response, make_response, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
from sqlalchemy import exc
import uuid
from werkzeug.security import generate_password_hash, check_password_hash
import json
#when installing this with pip: pip install pyJwt
import jwt
import datetime
from functools import wraps
import os

from flask_migrate import Migrate

################################################################################################################
#
#                                                  INITIALIZE APP AND DB
#
################################################################################################################

app = Flask(__name__)

# Stupid CORS crap:
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

#Don't forget to change this SECRET_KEY and SQLALCHEMY_DATABASE_URI and put in sepearte file or .env file and have git ignore it
app.config['SECRET_KEY'] = 'dkfi@%&*o49wr%^&p209fso4()903@$%$^4rwt3%^34t3#%^$&$%245g'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data/todo.db'

db = SQLAlchemy(app)

migrate = Migrate(app, db)

#Defining DB tables

################################################## USERS #######################################################

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(50), unique=True)
    username = db.Column(db.String(50), unique=True)
    email = db.Column(db.String(80), unique=True)
    password = db.Column(db.String(80))
    admin = db.Column(db.Boolean)
    todos = db.relationship('Todo', backref='user', lazy=True)
    points = db.relationship('Point', backref='user', lazy=True)

################################################## TODO ########################################################

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(50))
    complete = db.Column(db.Boolean)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

################################################## BRANDS ######################################################

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

################################################## POINTS ######################################################

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
    created_by = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
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

################################################################################################################
#
#                                                  DECORATORS
#
################################################################################################################

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):

        """

        """

        token = None

        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']

        if not token:
            return Response(json.dumps({'message' : 'Token is missing'}), mimetype='application/json'), 401

        try:
            #pyJwt has changed since the tortoral from PrettyPrinted: algorithms=["HS256"] must be passed as an argument to jwt.decode; change "HS256" to what algorithm yiu sued to encode your jwt
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])

            current_user = User.query.filter_by(public_id=data['public_id']).first()
        except:

            return Response(json.dumps({'message' : 'Token is invalid'}), mimetype='application/json'), 401

        return f(current_user, *args, **kwargs)

    return decorated

################################################################################################################
#
#                                                  CHECK TOKEN
#
################################################################################################################

@app.route('/api/checktoken', methods=['GET'])
@token_required
def checktoken(currentUser):

    return Response(json.dumps(currentUser), mimetype='application/json'), 200



################################################################################################################
#
#                                                  HOME
#
################################################################################################################

@app.route('/api/home', methods=['GET'])
def home():

    home = {'message' : "Welcome to Seolynn!" }

    return Response(json.dumps(home), mimetype='application/json')


################################################################################################################
#
#                                                  USER MANAGEMENT
#
################################################################################################################

@app.route('/api/user', methods=['GET'])
@token_required
def get_all_users(current_user):

    """

    """

    # if not current_user.admin:
    #     return Response(json.dumps({'message' : 'Cannot perform this action. You are not an Admin'}), mimetype='application/json')

    user_list = {}
    all_users = db.session.query(User).all()
    for user in all_users:
        user_list[user.public_id] = {}
        user_list[user.public_id]['public_id'] = user.public_id
        user_list[user.public_id]['username'] = user.username
        user_list[user.public_id]['email'] = user.email
        user_list[user.public_id]['admin'] = user.admin

    return Response(json.dumps(user_list), mimetype='application/json')

@app.route('/api/user/<public_id>', methods=['GET'])
@token_required
def get_one_user(current_user, public_id):

    """

    """

    # if not current_user.admin:
    #     return Response(json.dumps({'message' : 'Cannot perform this action. You are not an Admin'}), mimetype='application/json')

    specific_user = db.session.query(User).filter_by(public_id=public_id).first()

    # Checking if the user is in the database
    if specific_user is None:
        return Response(json.dumps({'message' : f'The user with public_id: {public_id} doesn\'t exist.'}), mimetype='application/json')

    specific_user_object = {}

    specific_user_object[specific_user.public_id] = {}
    specific_user_object[specific_user.public_id]['public_id'] = specific_user.public_id
    specific_user_object[specific_user.public_id]['username'] = specific_user.username
    specific_user_object[specific_user.public_id]['email'] = specific_user.email
    specific_user_object[specific_user.public_id]['admin'] = specific_user.admin


    return Response(json.dumps(specific_user_object), mimetype='application/json')

@app.route('/api/user', methods=['POST'])
@token_required
def create_user(current_user):

    """

    """

    if not current_user.admin:
        return Response(json.dumps({'message' : 'Cannot perform this action. You are not an Admin'}), mimetype='application/json')

    data = request.get_json()
    password = data['password']
    username = data['username']
    username = data['email']

    hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256', salt_length=10)

    try:
        new_user = User(public_id=str(uuid.uuid4()), username=data['username'], email=data['email'], password=hashed_password, admin=False)
        db.session.add(new_user)
        db.session.commit()

        return Response(json.dumps({'message' : f'New user, {username}, created'}), mimetype='application/json')
    except exc.IntegrityError as e:
        db.session.rollback()
        return Response(json.dumps({'message' : f'ERROR: Cannot create user: {username}. Due to ERROR: {e}'}), mimetype='application/json')

@app.route('/api/register', methods=['POST'])
def self_register():
    data = request.get_json()
    password = data['password']
    username = data['username']
    username = data['email']

    hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256', salt_length=10)

    try:
        new_user = User(public_id=str(uuid.uuid4()), username=data['username'], email=data['email'], password=hashed_password, admin=False)
        db.session.add(new_user)
        db.session.commit()

        return Response(json.dumps({'message' : f'New user, {username}, created'}), mimetype='application/json')
    except exc.IntegrityError as e:
        db.session.rollback()
        return Response(json.dumps({'message' : f'ERROR: Cannot create user: {username}. Due to ERROR: {e}'}), mimetype='application/json')



@app.route('/api/user/<public_id>', methods=['PUT'])
@token_required
def promote_user(current_user, public_id):

    """

    """

    if not current_user.admin:
        return Response(json.dumps({'message' : 'Cannot perform this action. You are not an Admin'}), mimetype='application/json')

    specific_user = db.session.query(User).filter_by(public_id=public_id).first()

    # Checking if the user is in the database
    if specific_user is None:
        return Response(json.dumps({'message' : f'The user with public_id: {public_id} doesn\'t exist.'}), mimetype='application/json')

    specific_user.admin = not specific_user.admin
    db.session.commit()

    return Response(json.dumps({'message' : f'{specific_user.username} admin status: {specific_user.admin}'}), mimetype='application/json')

@app.route('/api/user/<public_id>', methods=['DELETE'])
@token_required
def delete_user(current_user, public_id):

    """

    """

    if not current_user.admin:
        return Response(json.dumps({'message' : 'Cannot perform this action. You are not an Admin'}), mimetype='application/json')

    user_to_delete = db.session.query(User).filter_by(public_id=public_id).first()

    # Checking if the user is in the database
    if user_to_delete is None:
        return Response(json.dumps({'message' : f'The user with public_id: {public_id} doesn\'t exist.'}), mimetype='application/json')


    db.session.delete(user_to_delete)
    db.session.commit()

    return Response(json.dumps({'message' : f'{user_to_delete.username} is deleted'}), mimetype='application/json')

# Only use HTTP BASIC Auth on login; all other routes concenring user managment requires jwt and admin user priveledges
@app.route('/api/login', methods=['POST'])
def login():

    """

    """

    auth = request.authorization



    # need to do basic auth here

    if not auth or not auth.username or not auth.password:
        #return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})
        Response(json.dumps({'message' : 'Could not verify.'}), mimetype='application/json'), 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'}

    user = User.query.filter_by(username=auth.username).first()

    if not user:
        return Response(json.dumps({'message' : f'The user with username: {auth.username} doesn\'t exist.'}), mimetype='application/json'), 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'}

    if check_password_hash(user.password, auth.password):
        token = jwt.encode({'public_id' : user.public_id, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=60)}, app.config['SECRET_KEY'], algorithm="HS256")

        return Response(json.dumps({'token' : token }), mimetype='application/json')

    return Response(json.dumps({'message' : 'Wrong password.'}), mimetype='application/json'), 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'}


################################################################################################################
#
#                                                  TODO LISTS MANAGEMENT
#
################################################################################################################

@app.route('/api/todo', methods=['GET'])
@token_required
def get_all_todos(current_user):

    """

    """

    todos = db.session.query(Todo).all()

    todos_object = {}
    for todo in todos:
        todos_object[todo.text] = {}
        todos_object[todo.text]["id"] = todo.id
        todos_object[todo.text]["text"] = todo.text
        todos_object[todo.text]["complete"] = todo.complete

    return Response(json.dumps(todos_object), mimetype='application/json')

@app.route('/api/todo/<todo_id>', methods=['GET'])
@token_required
def get_one_todo(current_user, todo_id):

    """

    """

    specific_todo = db.session.query(Todo).filter_by(id=todo_id).first()

    specific_todo_object = {}

    specific_todo_object[specific_todo.text] = {}
    specific_todo_object[specific_todo.text]["id"] = specific_todo.id
    specific_todo_object[specific_todo.text]["complete"] = specific_todo.complete
    specific_todo_object[specific_todo.text]["text"] = specific_todo.text

    return Response(json.dumps(specific_todo_object), mimetype='application/json')


@app.route('/api/todo', methods=['POST'])
@token_required
def create_todo(current_user):

    """

    """

    user_id = User.query.filter_by(public_id=current_user.public_id).first().id
    data = request.get_json()
    text = data['text']

    try:
        new_todo = Todo(text=text, complete=False, user_id=user_id)
        db.session.add(new_todo)
        db.session.commit()

        return Response(json.dumps({'message' : f'New todo, {text}, created'}), mimetype='application/json')
    except exc.IntegrityError as e:
        db.session.rollback()
        return Response(json.dumps({'message' : f'ERROR: Cannot create todo: {text}. Due to ERROR: {e}'}), mimetype='application/json')

@app.route('/api/todo/<todo_id>', methods=['PUT'])
@token_required
def complete_todo(current_user, todo_id):

    """

    """

    specific_todo = db.session.query(Todo).filter_by(id=todo_id).first()

    specific_todo.complete = not specific_todo.complete
    db.session.commit()

    return Response(json.dumps({'message' : f'Task, {specific_todo.text}, is complete status: {specific_todo.complete}'}), mimetype='application/json')

@app.route('/api/todo/<todo_id>', methods=['DELETE'])
@token_required
def delete_todo(current_user, todo_id):

    """

    """

    specific_todo = db.session.query(Todo).filter_by(id=todo_id).first()

    db.session.delete(specific_todo)
    db.session.commit()

    return Response(json.dumps({'message' : f'{specific_todo.text} is deleted.'}), mimetype='application/json')

################################################################################################################
#
#                                                  PARTS INVENTORY MANAGEMENT
#
################################################################################################################

################################################## BRANDS ######################################################

#Get all brands
@app.route('/api/brands', methods=['GET'])
def get_all_brands():
    brands = Brand.query.all()
    object = {}
    for brand in brands:
        object[brand.name] = {}
        object[brand.name]["id"] = brand.id
        object[brand.name]["name"] = brand.name
        object[brand.name]["models"] = brand.models

    return Response(json.dumps(object), mimetype='application/json'), 200

#Get one brand
@app.route('/api/brands/<brand_id>', methods=['GET'])
def get_one_brand(brand_id):
    one_brand = Brand.query.filter_by(id=brand_id).first()
    object = {}
    object[one_brand.name] = {}
    object[one_brand.name]["id"] = one_brand.id
    object[one_brand.name]["name"] = one_brand.name
    object[one_brand.name]["models"] = one_brand.models

    return Response(json.dumps(object), mimetype='application/json'), 200

#Create a new brand
@app.route('/api/brands', methods=['POST'])
def create_brand():
    data = request.get_json()
    new_brand = Brand(name=data["name"])
    db.session.add(new_brand)
    db.session.commit()

    """
        Preform an updated GET after adding new brand
    """

    brands = Brand.query.all()
    object = {}
    for brand in brands:
        object[brand.name] = {}
        object[brand.name]["id"] = brand.id
        object[brand.name]["name"] = brand.name
        object[brand.name]["models"] = brand.models

    return Response(json.dumps(object), mimetype='application/json'), 200

#Modify a brand
@app.route('/api/brands/<brand_id>', methods=['PATCH'])
def modify_brand(brand_id):
    data = request.get_json()
    new_name = data["name"]
    one_brand = Brand.query.filter_by(id=brand_id).first()
    one_brand.name = new_name
    db.session.commit()

    """
        Preform an updated GET after changing brand name
    """

    updated_brand = Brand.query.filter_by(id=brand_id).first()
    object = {}
    object[updated_brand.name] = {}
    object[updated_brand.name]["id"] = updated_brand.id
    object[updated_brand.name]["name"] = updated_brand.name
    object[updated_brand.name]["models"] = updated_brand.models

    return Response(json.dumps(object), mimetype='application/json'), 200

#Delete a brand; WARNING: will not work in SQL DB if it has objects related to it
@app.route('/api/brands/<brand_id>', methods=['DELETE'])
def delete_brand(brand_id):
    data = request.get_json()
    new_name = data["name"]
    one_brand = Brand.query.filter_by(id=brand_id).first()
    db.session.delete(one_brand)
    db.session.commit()

    """
        Preform an updated GET for all remaining brands after deleting pervious one
    """

    brands = Brand.query.all()
    object = {}
    for brand in brands:
        object[brand.name] = {}
        object[brand.name]["id"] = brand.id
        object[brand.name]["name"] = brand.name
        object[brand.name]["models"] = brand.models

    return Response(json.dumps(object), mimetype='application/json'), 200

################################################## MODELS ######################################################

#Get all models for a brand_id
@app.route('/api/models/<brand_id>', methods=['GET'])
def get_all_models(brand_id):
    return ''

#Get one model for a model_id
@app.route('/api/models/<model_id>', methods=['GET'])
def get_one_model(model_id):
    return ''

#Create a new model
@app.route('/api/models', methods=['POST'])
def create_model():
    return ''

#Modify a model
@app.route('/api/models/<model_id>', methods=['PATCH'])
def modify_model(model_id):
    return ''

#Delete a model; WARNING: will not work in SQL DB if it has objects related to it
@app.route('/api/models/<model_id>', methods=['DELETE'])
def delete_model(model_id):
    return ''

################################################## REPAIR AREA #################################################

#Get all repairs for a model_id
@app.route('/api/repairs/<model_id>', methods=['GET'])
def get_all_repairs(model_id):
    return ''

#Get one repair for a repair_id
@app.route('/api/repairs/<repair_id>', methods=['GET'])
def get_one_repair(repair_id):
    return ''

#Create a new repair
@app.route('/api/repairs', methods=['POST'])
def create_repair():
    return ''

#Modify a repair
@app.route('/api/repairs/<repair_id>', methods=['PATCH'])
def modify_repair(repair_id):
    return ''

#Delete a repair; WARNING: will not work in SQL DB if it has objects related to it
@app.route('/api/repairs/<repair_id>', methods=['DELETE'])
def delete_repair(repair_id):
    return ''

################################################## PARTS #######################################################

#Get all parts for a repair_id
@app.route('/api/parts/<repair_id>', methods=['GET'])
def get_all_parts(repair_id):
    return ''

#Get one part for a part_id
@app.route('/api/parts/<part_id>', methods=['GET'])
def get_one_part(part_id):
    return ''

#Create a new part
@app.route('/api/parts', methods=['POST'])
def create_part():
    return ''

#Modify a part
@app.route('/api/parts/<part_id>', methods=['PATCH'])
def modify_part(part_id):
    return ''

#Delete a part; WARNING: will not work in SQL DB if it has objects related to it
@app.route('/api/parts/<part_id>', methods=['DELETE'])
def delete_part(part_id):
    return ''

################################################## LOCATIONS ###################################################

#Get all locations
@app.route('/api/locations', methods=['GET'])
def get_all_locations():
    return ''

#Get one part for a part_id
@app.route('/api/locations/<location_id>', methods=['GET'])
def get_one_location(location_id):
    return ''

#Create a new part
@app.route('/api/locations', methods=['POST'])
def create_location():
    return ''

#Modify a part
@app.route('/api/locations/<location_id>', methods=['PATCH'])
def modify_location(location_id):
    return ''

#Delete a part; WARNING: will not work in SQL DB if it has objects related to it
@app.route('/api/locations/<location_id>', methods=['DELETE'])
def delete_location(location_id):
    return ''

################################################## INVENTORY #####################################################

#Get all inventory
@app.route('/api/inventory', methods=['GET'])
def get_all_stock():
    return ''

#Get all stock for a location
@app.route('/api/inventory/<location_id>', methods=['GET'])
def get_stock_for_one_location(location_id):
    return ''

#Get all stock for a part
@app.route('/api/inventory/<part_id>', methods=['GET'])
def get_stock_for_one_part(part_id):
    return ''

#Get all stock for a repair
@app.route('/api/inventory/<repair_id>', methods=['GET'])
def get_stock_for_one_repair(repair_id):
    return ''

#Create a new stock in a location
@app.route('/api/inventory', methods=['POST'])
def create_stock():
    return ''

#Modify a stock or add if not found; Using PUT instead of PATCH
@app.route('/api/inventory/<inventory_id>', methods=['PUT'])
def modify_stock(inventory_id):
    return ''

#Delete a part; WARNING: will not work in SQL DB if it has objects related to it
@app.route('/api/inventory/<inventory_id>', methods=['DELETE'])
def delete_stock(inventory_id):
    return ''


################################################################################################################
#
#                                                  JLPT N5 Level
#
################################################################################################################

@app.route('/api/japanese/<level>/all')

def get_all_json( level):
    json_for_all = open(os.path.join( app.static_folder, f'json/{level}', f"{level}_all.json"), "r")
    data = json.load(json_for_all)
    print(data)
    return Response(json.dumps(data), mimetype='application/json')

@app.route('/api/japanese/<level>/info')

def get_json_info( level):
    data = [
                'all'
            ]
    # After selection level, we need to get the "how many words"
    # We must use this to limit the results from the sql query
    # query(Model).filter(something).limit(5).all()
    # Oh!!! We don't have a DB yet!!!


    return Response(json.dumps(data), mimetype='application/json')

@app.route('/api/japanese/<level>/<id>')

def get_json_one_lesson( level, id):
    json_one_lesson = open(os.path.join( app.static_folder, f'json/{level}', f"{level}_" + id + ".json"), "r")
    data = json.load(json_one_lesson)
    return Response(json.dumps(data), mimetype='application/json')

################################################################################################################
#
#                                                  LANGUAGE POINT MANAGEMENT
#
################################################################################################################

@app.route('/api/points', methods=['GET', 'POST'])
def get_all_points():

    # Have to get all categories First
    points_for_lang = db.session.query(Point).all()
    categories = []
    for point in points_for_lang:
        # add to our list of chapters/categories for each point
        categories.append(point.chapter)

    # Trying to convert categories list to set, to get rid of duplicates, then convert back to list
    categories = set([x for x in categories])
    categories = list(categories)

    if request.method == 'POST':
        data = request.get_json()
        filter_category = data['filter_category']
        filter_language = data['filter_language']

        # Basically same as the GET method, no filtering
        if filter_category == 'all' and filter_language == 'all':
            # Already have the query for points_for_lang
            pass

        # only filter by language
        if filter_category == 'all' and filter_language != 'all':
            points_for_lang = db.session.query(Point).filter_by(language=filter_language).all()

        # only filter by category
        if filter_language == 'all' and filter_category != 'all':
            points_for_lang = db.session.query(Point).filter_by(chapter=filter_category).all()

        # if both are not set to 'all', then query with both filters
        if filter_language != 'all' and filter_category != 'all':
            points_for_lang = db.session.query(Point).filter_by(chapter=filter_category, language=filter_language).all()

    # Remember we already defined points_for_lang inorder to get all the categories, so we just reuse it here
    # This will pass on to the rest of the code to make a request object and takes care of the 'GET' and 'POST'
    # with both filters set to 'all'
    if request.method == 'GET':
        """
            This route will get all the points for a certain language.
        """

        # Already have the query for points_for_lang
        pass

    # What I want is to get a string with ";" as the delimiter and use python to
    # split up into multiple elements, so we can store multiple elements in one column inside one SQL Table
    # point_elements_array = points_for_lang.elements.split(';')


    points_object = {}
    for point in points_for_lang:
        points_object[point.title] = {}
        points_object[point.title]["id"] = point.id
        points_object[point.title]["explanation"] = point.explanation
        points_object[point.title]["title"] = point.title
        points_object[point.title]["elements"] = []
        # There's some way to access the element_list for each point, but forgot how to do it
        # for element in point['element_list']:
        #     points_object[point.title]["elements"].append({
        #         id: element.id,
        #         text: element.text,
        #         type: element.type
        #     })
        elements_for_this = db.session.query(Element).filter_by(point_id=point.id).all()
        for element in elements_for_this:
            points_object[point.title]["elements"].append({
                "id": element.id,
                "text": element.text,
                "type": element.type
            })
        points_object[point.title]["language"] = point.language
        points_object[point.title]["chapter"] = point.chapter


    languages = ["japanese", "Korean"]

    return Response(json.dumps([points_object, categories, languages]), mimetype='application/json')


@app.route('/api/points_by_language', methods=['GET'])
def get_all_points_by_language(language):

    """
        This route will get all the points for a certain language.
    """

    points_for_lang = db.session.query(Point).filter_by(language=language).all()

    # What I want is to get a string with ";" as the delimiter and use python to
    # split up into multiple elements, so we can store multiple elements in one column inside one SQL Table
    # point_elements_array = points_for_lang.elements.split(';')



    points_object = {}
    for point in points_for_lang:
        points_object[point.title] = {}
        points_object[point.title]["id"] = point.id
        points_object[point.title]["explanation"] = point.explanation
        points_object[point.title]["title"] = point.title
        points_object[point.title]["elements"] = []
        for element in point['element_list']:
            points_object[point.title]["elements"].append({
                id: element.id,
                text: element.text,
                type: element.type
            })
        points_object[point.title]["language"] = point.language
        points_object[point.title]["chapter"] = point.chapter

    return Response(json.dumps(points_object), mimetype='application/json')

@app.route('/api/points_by_chapter', methods=['GET'])
def get_all_points_by_chapter(language, chapter):

    """
        This route will get all the points for a certain language and chapter.
    """

    points_for_lang = db.session.query(Point).filter_by(language=language, chapter=chapter).all()

    # What I want is to get a string with ";" as the delimiter and use python to
    # split up into multiple elements, so we can store multiple elements in one column inside one SQL Table
    # point_elements_array = points_for_lang.elements.split(';')

    points_object = {}
    for point in points_for_lang:
        points_object[point.title] = {}
        points_object[point.title]["id"] = point.id
        points_object[point.title]["explanation"] = point.explanation
        points_object[point.title]["title"] = point.title
        points_object[point.title]["elements"] = []
        for element in point['element_list']:
            points_object[point.title]["elements"].append({
                id: element.id,
                text: element.text,
                type: element.type
            })
        points_object[point.title]["language"] = point.language
        points_object[point.title]["chapter"] = point.chapter

    return Response(json.dumps(points_object), mimetype='application/json')

@app.route('/api/points/<point_id>', methods=['GET'])
def get_one_point(point_id):

    """
        This route will get only one specific point by point_id.
    """

    point = db.session.query(Point).filter_by(id=point_id).first()

    # What I want is to get a string with ";" as the delimiter and use python to
    # split up into multiple elements, so we can store multiple elements in one column inside one SQL Table
    # point_elements_array = points_for_lang.elements.split(';')


    # no loop here since we only get the first point from DB
    points_object = {}

    points_object[point.title] = {}
    points_object[point.title]["id"] = point.id
    points_object[point.title]["explanation"] = point.explanation
    points_object[point.title]["title"] = point.title
    points_object[point.title]["element_list"] = []
    for element in point.element_list:
        points_object[point.title]["element_list"].append({
            "id": element.id,
            "text": element.text,
            "type": element.type
        })

    points_object[point.title]["language"] = point.language
    points_object[point.title]["chapter"] = point.chapter

    return Response(json.dumps(points_object), mimetype='application/json')

@app.route('/api/post_points', methods=['POST'])
@token_required
def create_point(current_user):

    """
        Create a new point, must be logged in as Admin user
    """

    # Check if user is Admin first:
    # if not current_user.admin:
    #     return Response(json.dumps({'message' : 'Cannot perform this action. You are not an Admin'}), mimetype='application/json')
    #
    # print(current_user)

    data = request.get_json()
    # elements_array = ";".join(data["elements"])
    date_created = datetime.date.today()

    try:
        new_point = Point(explanation=data['explanation'], title=data['title'], language=data['language'], chapter=data['chapter'], created_by=current_user.id, date_created=date_created)
        # , author=user_id, date_created=date_created)
        db.session.add(new_point)
        # Maybe better to do this after in another try, so I can make sure the point
        # is made first and to catch errors relating to either point creation or element creation
        db.session.commit()

    except exc.IntegrityError as e:
        db.session.rollback()
        return Response(json.dumps({'message' : f"ERROR: Cannot create point: {data['title']}. Due to ERROR: {e}"}), mimetype='application/json')
    try:
        for element in data['elements'].split(";"):
            new_element = Element(point_id=new_point.id, text=element, type="p")
            db.session.add(new_element)
            db.session.commit()
        print(f"New point, {data['title']}, created by: {current_user.username} at {date_created}")
        return redirect(url_for('get_all_points'))
        #return Response(json.dumps({'message' : f"New point, {data['title']}, created by: {current_user.username} at {date_created}"}), mimetype='application/json')
    except exc.IntegrityError as e:
        db.session.rollback()
        return Response(json.dumps({'message' : f"ERROR: Cannot create elements for: {data['title']}. Due to ERROR: {e}"}), mimetype='application/json')

@app.route('/api/points/<point_id>', methods=['PATCH'])
@token_required
def complete_point(current_user, point_id):

    """
        Edit specific Point.
    """

    # Check is user is Admin first:
    # if not current_user.admin:
    #     return Response(json.dumps({'message' : 'Cannot perform this action. You are not an Admin'}), mimetype='application/json')

    specific_point = db.session.query(Point).filter_by(id=point_id).first()

    # user_object = User.query.filter_by(public_id=current_user.public_id).first()
    # last_edited_by = user_object.id
    data = request.get_json()
    date_modified = datetime.date.today()



    try:
        # Actual update of point:
        specific_point.explanation = data['explanation']
        specific_point.title = data['title']
        specific_point.language = data['language']
        specific_point.chapter = data['chapter']
        # point_to_mod.last_edited_by = last_edited_by
        # point_to_mod.last_modified = date_modified
        db.session.commit()

    except exc.IntegrityError as e:
        db.session.rollback()
        return Response(json.dumps({'message' : f"ERROR: Cannot modify: {data['title']}. Due to ERROR: {e}"}), mimetype='application/json')

    # Need to take care of the new elements:
    elements_for_point = db.session.query(Element).filter_by(point_id=point_id).all()

    old_elements = []

    for element in elements_for_point:

        old_elements.append({"id": element.id, "type": element.type, "text": element.text})

    try:
        elements_for_point.clear()
        elements_for_point = data['element_list']
        #First add new stuff
        # for element in data['element_list']:
        #     elements_for_point.append(element)
        # #remove the old stuff
        # for item in elements_for_point:
        #     if item not in data['element_list']:
        #         elements_for_point.remove(item)

        db.session.commit()

    except exc.IntegrityError as e:
        db.session.rollback()
        return Response(json.dumps({'message' : f"ERROR: Cannot modify new Elements for: {data['title']}. Due to ERROR: {e}"}), mimetype='application/json')


    """
        Preform an updated GET after modifing Point:
        (Will make this into a function later on)
    """

    updated_point = db.session.query(Point).filter_by(id=point_id).first()
    updated_elements = db.session.query(Element).filter_by(point_id=point_id).all()

    # What I want is to get a string with ";" as the delimiter and use python to
    # split up into multiple elements, so we can store multiple elements in one column inside one SQL Table
    # point_elements_array = points_for_lang.elements.split(';')


    # no loop here since we only get the first point from DB
    points_object = {}

    points_object[updated_point.title] = {}
    points_object[updated_point.title]["id"] = updated_point.id
    points_object[updated_point.title]["explanation"] = updated_point.explanation
    points_object[updated_point.title]["title"] = updated_point.title
    points_object[updated_point.title]["element_list"] = []
    for element in updated_elements:
        points_object[updated_point.title]["element_list"].append({
            "id": element.id,
            "text": element.text,
            "type": element.type
        })
    points_object[updated_point.title]["language"] = updated_point.language
    points_object[updated_point.title]["chapter"] = updated_point.chapter

    return Response(json.dumps(points_object), mimetype='application/json')

@app.route('/api/points/<point_id>', methods=['DELETE'])
@token_required
def delete_point(current_user, point_id):

    """
        Delete specific Point.
    """

    # Check is user is Admin first:
    # if not current_user.admin:
    #     return Response(json.dumps({'message' : 'Cannot perform this action. You are not an Admin'}), mimetype='application/json')

    # Delete all elements first:
    element_for_this_point = db.session.query(Element).filter_by(point_id=point_id).all()
    if element_for_this_point is not None:
        for el in element_for_this_point:
            db.session.delete(el)
        # db.session.commit()

    specific_point = db.session.query(Point).filter_by(id=point_id).first()

    try:
        db.session.delete(specific_point)
        db.session.commit()
    except exc.IntegrityError as e:
        db.session.rollback()
        return Response(json.dumps({'message' : f"ERROR: Cannot modify new Elements for: {data['title']}. Due to ERROR: {e}"}), mimetype='application/json')


    # update list of elements
    print(f'{specific_point.title} is deleted.')
    # return redirect(url_for('get_all_points'))

    # Could not get redirect to work, resulted in HTTP Method not Allowed Error, so just copy and pasted from this route to get update list of points.

    points_for_lang = db.session.query(Point).all()

    # What I want is to get a string with ";" as the delimiter and use python to
    # split up into multiple elements, so we can store multiple elements in one column inside one SQL Table
    # point_elements_array = points_for_lang.elements.split(';')



    points_object = {}
    for point in points_for_lang:
        points_object[point.title] = {}
        points_object[point.title]["id"] = point.id
        points_object[point.title]["explanation"] = point.explanation
        points_object[point.title]["title"] = point.title
        points_object[point.title]["elements"] = []
        # There's some way to access the element_list for each point, but forgot how to do it
        # for element in point['element_list']:
        #     points_object[point.title]["elements"].append({
        #         id: element.id,
        #         text: element.text,
        #         type: element.type
        #     })
        elements_for_this = db.session.query(Element).filter_by(point_id=point.id).all()
        for element in elements_for_this:
            points_object[point.title]["elements"].append({
                "id": element.id,
                "text": element.text,
                "type": element.type
            })
        points_object[point.title]["language"] = point.language
        points_object[point.title]["chapter"] = point.chapter

    return Response(json.dumps(points_object), mimetype='application/json')

    #return Response(json.dumps({'message' : f'{specific_point.title} is deleted.'}), mimetype='application/json')



################################################################################################################
#
#                                                  MAIN
#
################################################################################################################

if __name__ == '__main__':
    app.run(debug=True)
