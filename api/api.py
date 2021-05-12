



# Need to add different types of users




################################################################################################################
#
#                                                  WELCOME TO THE TODO LIST API!
#
################################################################################################################

from flask import Flask, request, jsonify, Response, make_response
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import exc
import uuid
from werkzeug.security import generate_password_hash, check_password_hash
import json
#when installing this with pip: pip install pyJwt
import jwt
import datetime
from functools import wraps
import os

################################################################################################################
#
#                                                  INITIALIZE APP AND DB
#
################################################################################################################

app = Flask(__name__)

#Don't forget to change this SECRET_KEY and SQLALCHEMY_DATABASE_URI and put in sepearte file or .env file and have git ignore it
app.config['SECRET_KEY'] = 'dkfi@%&*o49wr%^&p209fso4()903@$%$^4rwt3%^34t3#%^$&$%245g'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data/todo.db'

db = SQLAlchemy(app)

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
@token_required
def get_all_json(currentUser, level):
    json_for_all = open(os.path.join( app.static_folder, f'json/{level}', f"{level}_all.json"), "r")
    data = json.load(json_for_all)
    print(data)
    return Response(json.dumps(data), mimetype='application/json')

@app.route('/api/japanese/<level>/info')
@token_required
def get_json_info(currentUser, level):
    data = [
                'all',
                '01',
                '02',
                '03',
                '04',
                '05',
                '06',
                '07',
                '08',
                '09',
                '10',
                '11',
                '12',
                '13',
                '14',
                '15',
                '16',
                '17',
                '18',
                '19',
                '20',
                '21'
            ]

    return Response(json.dumps(data), mimetype='application/json')

@app.route('/api/japanese/<level>/<id>')
@token_required
def get_json_one_lesson(currentUser, level, id):
    json_one_lesson = open(os.path.join( app.static_folder, f'json/{level}', f"{level}_" + id + ".json"), "r")
    data = json.load(json_one_lesson)
    return Response(json.dumps(data), mimetype='application/json')




################################################################################################################
#
#                                                  MAIN
#
################################################################################################################

if __name__ == '__main__':
    app.run(debug=True)
