from api import app, db
from .models import Todo
from api.jwt_token.__token_required__ import token_required
from flask import Response, request
import json
from api.user.models import User
from sqlalchemy import exc

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