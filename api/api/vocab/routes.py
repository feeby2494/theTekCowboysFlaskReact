from random import randint
from api import app
from flask import Response
import json
import os

@app.route('/api/<lang>/<level>/all')
def get_all_json( lang, level):
    if lang == 'japanese':
        json_for_all = open(os.path.join( app.static_folder, f'json/jlpt_n{level}', f"jlpt_n{level}_all.json"), "r")
    if lang == 'korean':
        json_for_all = open(os.path.join( app.static_folder, f'json/topik_{level}', f"topik_{level}_all.json"), "r")
    data = json.load(json_for_all)
    return Response(json.dumps(data), mimetype='application/json')

@app.route('/api/<lang>/<level>/<how_many>')
def get_some_json( lang, level, how_many):
    if lang == 'japanese':
        json_for_all = open(os.path.join( app.static_folder, 'json', f'jlpt_n{level}', f"jlpt_n{level}_all.json"), "r")
    if lang == 'korean':
        json_for_all = open(os.path.join( app.static_folder, f'json/topik_{level}', f"topik_{level}_all.json"), "r")
    data = json.load(json_for_all)

    # Figure out array of indexes to grab from data
    indexes = []
    for i in range(int(how_many)):
        random_index = randint(0, len(data) - 1)
        if random_index not in indexes:
            indexes.append(random_index)
        else:
            # Start this loop over again
            i -= 1

    # Use array of indexes to get objects from data for return json
    return_words = []
    for index in indexes:
        return_words.append(data[index])

    return Response(json.dumps(return_words), mimetype='application/json')

@app.route('/api/<lang>/<level>/info')

def get_json_info( lang, level):
    data = [
                'all',
                5,
                10,
                15,
                20,
                50
            ]
    # After selection level, we need to get the "how many words"
    # We must use this to limit the results from the sql query
    # query(Model).filter(something).limit(5).all()
    # Oh!!! We don't have a DB yet!!!


    return Response(json.dumps(data), mimetype='application/json')

# @app.route('/api/japanese/<level>/<id>')

# def get_json_one_lesson( level, id):
#     json_one_lesson = open(os.path.join( app.static_folder, f'json/{level}', f"{level}_" + id + ".json"), "r")
#     data = json.load(json_one_lesson)
#     return Response(json.dumps(data), mimetype='application/json')