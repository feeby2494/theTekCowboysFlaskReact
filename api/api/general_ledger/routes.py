from api import app, db
from flask import request, Response, redirect, url_for
import json
from .models import ledger_line_item
from sqlalchemy import exc
from api.jwt_token.__token_required__ import token_required
import datetime


@app.route('/api/general_ledger', methods=['GET', 'POST'])
def general_ledger():

    if request.method == "GET":

        return Response(json.dumps({"message": "hi"}), mimetype='application/json')
    
    if request.method == "GET":

        return Response(json.dumps({"message": "hi"}), mimetype='application/json')
 