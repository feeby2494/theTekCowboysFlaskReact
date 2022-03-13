from api import app, db
from api.jwt_token.__token_required__ import token_required
from flask import Response, request
import json
from .models import User
from sqlalchemy import exc
import uuid
from werkzeug.security import check_password_hash


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
        user_list[user.public_id]['name'] = user.name
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
    specific_user_object[specific_user.public_id]['name'] = specific_user.name
    specific_user_object[specific_user.public_id]['username'] = specific_user.username
    specific_user_object[specific_user.public_id]['email'] = specific_user.email
    specific_user_object[specific_user.public_id]['admin'] = specific_user.admin


    return Response(json.dumps(specific_user_object), mimetype='application/json')

@app.route('/api/user', methods=['POST'])
@token_required
def create_user(current_user):

    """
        Create an new user; Only admin users can do this
    """

    if not current_user.admin:
        return Response(json.dumps({'message' : 'Cannot perform this action. You are not an Admin'}), mimetype='application/json')

    data = request.get_json()

    try:
        new_user = User(public_id=str(uuid.uuid4()), username=data['username'], name = data['name'], email=data['email'], password=data['password'], admin=False)
        db.session.add(new_user)
        db.session.commit()

        return Response(json.dumps({'message' : f'New user, {data["username"]}, created'}), mimetype='application/json')
    except exc.IntegrityError as e:
        db.session.rollback()
        return Response(json.dumps({'message' : f'ERROR: Cannot create user: {data["username"]}. Due to ERROR: {e}'}), mimetype='application/json')

@app.route('/api/register', methods=['POST'])
def self_register():
    data = request.get_json()

    try:
        new_user = User(public_id=str(uuid.uuid4()), username=data['username'], name = data['name'], email=data['email'], password=data['password'], admin=False)
        db.session.add(new_user)
        db.session.commit()

        return Response(json.dumps({'message' : f'New user, {data["username"]}, created'}), mimetype='application/json')
    except exc.IntegrityError as e:
        db.session.rollback()
        return Response(json.dumps({'message' : f'ERROR: Cannot create user: {data["username"]}. Due to ERROR: {e}'}), mimetype='application/json')



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
        token = user.encode_auth_token( user.public_id )
        return Response(json.dumps({'token' : token }), mimetype='application/json')

    return Response(json.dumps({'message' : 'Wrong password.'}), mimetype='application/json'), 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'}
