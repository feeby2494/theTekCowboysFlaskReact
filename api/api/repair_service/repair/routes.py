from api import app, db
from flask import request, Response, redirect, url_for
import json
from sqlalchemy import exc
from api.jwt_token.__token_required__ import token_required
import datetime
from .models import Repair

# 
# Repairs - All routes related to repairs
# 

@app.route('/api/repair', methods=['GET', 'POST'])
@token_required
def repair():

    if request.method == 'POST':
        data = request.get_json()

        return Response(json.dumps(data), mimetype='application/json')

@app.route('/api/repair/get_all_current_repairs', methods=['GET'])
@token_required
def get_all_current_repairs():
    if request.method == 'POST':
        data = request.get_json()

        return Response(json.dumps(data), mimetype='application/json')

@app.route('/api/repair/get_all_finished_repairs_not_shipped', methods=['GET'])
@token_required
def get_all_current_repairs():
    if request.method == 'POST':
        data = request.get_json()

        return Response(json.dumps(data), mimetype='application/json')

@app.route('/api/repair/get_all_repairs', methods=['GET'])
@token_required
def get_all_current_repairs():
    if request.method == 'POST':
        data = request.get_json()

        return Response(json.dumps(data), mimetype='application/json')

@app.route('/api/repair/get_all_reworks', methods=['GET'])
@token_required
def get_all_current_repairs():
    if request.method == 'POST':
        data = request.get_json()

        return Response(json.dumps(data), mimetype='application/json')

@app.route('/api/repair/get_one_repair', methods=['GET'])
@token_required
def get_all_current_repairs():
    if request.method == 'POST':
        data = request.get_json()

        return Response(json.dumps(data), mimetype='application/json')

@app.route('/api/repair/get_all_current_repairs', methods=['GET'])
@token_required
def get_all_current_repairs():
    if request.method == 'POST':
        data = request.get_json()

        return Response(json.dumps(data), mimetype='application/json')