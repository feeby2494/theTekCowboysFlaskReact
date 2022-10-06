from api.api import app
from flask import Response
import json
from .__token_required__ import token_required

@app.route('/api/checktoken', methods=['GET'])
@token_required
def checktoken(currentUser):

    return Response(json.dumps(currentUser), mimetype='application/json'), 200