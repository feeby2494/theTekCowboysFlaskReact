from api import app
from flask import Response
import json
import os
import requests

@app.route('/api/videos/<video_playlist>', methods=['GET'])
def get_yt_playlist(video_playlist):

    playlist_json = open(os.path.join( app.static_folder, f'json/videos/', f"{video_playlist}.json"), "r")

    data = json.load(playlist_json)
    return Response(json.dumps(data), mimetype='application/json')

