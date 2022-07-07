#!/usr/bin/env python3

from fileinput import filename
import requests
import os
import json
from dotenv import load_dotenv

load_dotenv("../.env")

from requests.exceptions import HTTPError

def update_youtube_playlist_json(playlist_id, api_key):
    try:
        response = requests.get(
            f"https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&part=player",
            params={
                "id": f"{playlist_id}",
                "key": f"{api_key}",
                },
            headers={"Accept": "application/json"},
        )

        # If the response was successful, no Exception will be raised
        response.raise_for_status()
    except HTTPError as http_err:
        print(f'HTTP error occurred: {http_err}')  # Python 3.6
    except Exception as err:
        print(f'Other error occurred: {err}')  # Python 3.6
    else:
        print('Success!')
        return response.json()


def write_json(filename, json_obj):
    with open(os.path.join("..", "static/json", "videos", f"{filename}.json"), 'w') as file:
        file.write(json.dumps(json_obj))
    file.close()


# Have three jsons I need to work on
# Get api key

api_key = os.environ.get('YT_API_KEY')

e110_corolla_videos = update_youtube_playlist_json("PLq3f8HX2eMEOKTcBfY37BfTixHiLi9K1e", api_key)
e170_corolla_videos = update_youtube_playlist_json("PLq3f8HX2eMEPx3TTxOyJCCwlLRDPL-zTv", api_key)
fg1_civic_videos = update_youtube_playlist_json("PLq3f8HX2eMEMzZWjfwIS07nAQMLzrzcpJ", api_key)

playlists = [
    ("e110_corolla_videos", e110_corolla_videos),
    ("e170_corolla_videos", e170_corolla_videos),
    ("fg1_civic_videos", fg1_civic_videos),
]


for filename, data in playlists:
    write_json(f"{filename}", data)

# need to run daily cron job below on web server:

# 0 23 * * * python3 /home/jamie/Documents/webProjects/japaneseFlashCards/api/api/automation/update_youtube_json.py MAILTO="toby2494.development.com"