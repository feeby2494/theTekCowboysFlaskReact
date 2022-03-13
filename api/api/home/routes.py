from api import app
from flask import Response
import json

@app.route('/api/home', methods=['GET'])
def home():

    home = {'message' : "Welcome to Seolynn!" }

    return Response(json.dumps(home), mimetype='application/json')