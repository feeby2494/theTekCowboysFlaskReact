from api.api import app, db
from flask import request, Response, redirect, url_for
import json
from sqlalchemy import exc
from api.api.jwt_token.__token_required__ import token_required
import datetime


@app.route('/api/web_service', methods=['GET', 'POST'])
def web_service():

    if request.method == 'POST':
        data = request.get_json()

        return Response(json.dumps(data), mimetype='application/json')
