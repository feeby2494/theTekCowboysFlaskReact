from api import app, db
from flask import request, Response, redirect, url_for
import json
from .models import ledger_line_item
from sqlalchemy import exc
from api.jwt_token.__token_required__ import token_required
import datetime


@app.route('/api/general_ledger_all', methods=['GET'])
def general_ledger():

    if request.method == "GET":

        return Response(json.dumps({"message": "hi"}), mimetype='application/json')
    
 
 @app.route('/api/general_ledger_one', methods=['GET', 'POST', 'PUT', 'DELETE'])
def general_ledger():

    if request.method == "GET":

        return Response(json.dumps({"message": "hi"}), mimetype='application/json')

    if request.method == "POST":

        return Response(json.dumps({"message": "hi"}), mimetype='application/json')

    if request.method == "PUT":

        return Response(json.dumps({"message": "hi"}), mimetype='application/json')

    if request.method == "DELETE":

        return Response(json.dumps({"message": "hi"}), mimetype='application/json')
 