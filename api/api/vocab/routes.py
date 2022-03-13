from api import app
from flask import Response
import json
import os

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