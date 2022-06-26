# -*- coding: utf-8 -*-

# Sample Python code for youtube.playlists.list
# See instructions for running these code samples locally:
# https://developers.google.com/explorer-help/code-samples#python

from api import app
from flask import Response
import json
import os
import requests



# # -*- coding: utf-8 -*-

# import os
# import flask
# import requests

# import google.oauth2.credentials
# import google_auth_oauthlib.flow
# import googleapiclient.discovery

# # This variable specifies the name of a file that contains the OAuth 2.0
# # information for this application, including its client_id and client_secret.
# CLIENT_SECRETS_FILE = os.path.join(os.getcwd(), "api/videos", "client_secret.json")

# # This OAuth 2.0 access scope allows for full read/write access to the
# # authenticated user's account and requires requests to use an SSL connection.
# SCOPES = ['https://www.googleapis.com/auth/youtube.force-ssl']
# API_SERVICE_NAME = 'youtube'
# API_VERSION = 'v3'

# @app.route('/test')
# def test_api_request():
#   if 'credentials' not in flask.session:
#     return flask.redirect('authorize')

#   # Load credentials from the session.
#   credentials = google.oauth2.credentials.Credentials(
#       **flask.session['credentials'])

#   youtube = googleapiclient.discovery.build(
#       API_SERVICE_NAME, API_VERSION, credentials=credentials)

#   channel = youtube.channels().list(mine=True, part='snippet').execute()

#   # Save credentials back to session in case access token was refreshed.
#   # ACTION ITEM: In a production app, you likely want to save these
#   #              credentials in a persistent database instead.
#   flask.session['credentials'] = credentials_to_dict(credentials)

#   return flask.jsonify(**channel)


# @app.route('/authorize')
# def authorize():
#   # Create flow instance to manage the OAuth 2.0 Authorization Grant Flow steps.
#   flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(
#       CLIENT_SECRETS_FILE, scopes=SCOPES)

#   # The URI created here must exactly match one of the authorized redirect URIs
#   # for the OAuth 2.0 client, which you configured in the API Console. If this
#   # value doesn't match an authorized URI, you will get a 'redirect_uri_mismatch'
#   # error.
#   flow.redirect_uri = flask.url_for('oauth2callback', _external=True)

#   authorization_url, state = flow.authorization_url(
#       # Enable offline access so that you can refresh an access token without
#       # re-prompting the user for permission. Recommended for web server apps.
#       access_type='offline',
#       # Enable incremental authorization. Recommended as a best practice.
#       include_granted_scopes='true')

#   # Store the state so the callback can verify the auth server response.
#   flask.session['state'] = state

#   return flask.redirect(authorization_url)


# @app.route('/oauth2callback')
# def oauth2callback():
#   # Specify the state when creating the flow in the callback so that it can
#   # verified in the authorization server response.
#   state = flask.session['state']

#   # Disable OAuthlib's HTTPS verification when running locally.
#   # *DO NOT* leave this option enabled in production.
#   os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

#   flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(
#       CLIENT_SECRETS_FILE, scopes=SCOPES, state=state)
#   flow.redirect_uri = flask.url_for('oauth2callback', _external=True)

#   # Use the authorization server's response to fetch the OAuth 2.0 tokens.
#   authorization_response = flask.request.url
#   flow.fetch_token(authorization_response=authorization_response)

#   # Store credentials in the session.
#   # ACTION ITEM: In a production app, you likely want to save these
#   #              credentials in a persistent database instead.
#   credentials = flow.credentials
#   flask.session['credentials'] = credentials_to_dict(credentials)

#   return flask.redirect(flask.url_for('test_api_request'))


# @app.route('/revoke')
# def revoke():
#   if 'credentials' not in flask.session:
#     return ('You need to <a href="/authorize">authorize</a> before ' +
#             'testing the code to revoke credentials.')

#   credentials = google.oauth2.credentials.Credentials(
#     **flask.session['credentials'])

#   revoke = requests.post('https://oauth2.googleapis.com/revoke',
#       params={'token': credentials.token},
#       headers = {'content-type': 'application/x-www-form-urlencoded'})

#   status_code = getattr(revoke, 'status_code')
#   if status_code == 200:
#     return('Credentials successfully revoked.' + print_index_table())
#   else:
#     return('An error occurred.' + print_index_table())


# @app.route('/clear')
# def clear_credentials():
#   if 'credentials' in flask.session:
#     del flask.session['credentials']
#   return ('Credentials have been cleared.<br><br>' +
#           print_index_table())


# def credentials_to_dict(credentials):
#   return {'token': credentials.token,
#           'refresh_token': credentials.refresh_token,
#           'token_uri': credentials.token_uri,
#           'client_id': credentials.client_id,
#           'client_secret': credentials.client_secret,
#           'scopes': credentials.scopes}

# def print_index_table():
#   return ('<table>' +
#           '<tr><td><a href="/test">Test an API request</a></td>' +
#           '<td>Submit an API request and see a formatted JSON response. ' +
#           '    Go through the authorization flow if there are no stored ' +
#           '    credentials for the user.</td></tr>' +
#           '<tr><td><a href="/authorize">Test the auth flow directly</a></td>' +
#           '<td>Go directly to the authorization flow. If there are stored ' +
#           '    credentials, you still might not be prompted to reauthorize ' +
#           '    the application.</td></tr>' +
#           '<tr><td><a href="/revoke">Revoke current credentials</a></td>' +
#           '<td>Revoke the access token associated with the current user ' +
#           '    session. After revoking credentials, if you go to the test ' +
#           '    page, you should see an <code>invalid_grant</code> error.' +
#           '</td></tr>' +
#           '<tr><td><a href="/clear">Clear Flask session credentials</a></td>' +
#           '<td>Clear the access token currently stored in the user session. ' +
#           '    After clearing the token, if you <a href="/test">test the ' +
#           '    API request</a> again, you should go back to the auth flow.' +
#           '</td></tr></table>')



































import google.oauth2.credentials
import google_auth_oauthlib.flow

scopes = ["https://www.googleapis.com/auth/youtube.readonly"]





@app.route('/api/videos/corolla_2001_playlist', methods=['GET'])
def old_corolla_playlist():


    get_url = f"https://youtube.googleapis.com/youtube/v3/playlists"
    
    response = requests.get(
        get_url,
        params={
            'id': 'PLq3f8HX2eMEOKTcBfY37BfTixHiLi9K1e',
            'key': os.environ.get('YT_API_KEY')
        },
        headers={
            'Accept': 'application/json'
        }
    )

    print(response.url)

    return Response(json.dumps(response.json()), mimetype='application/json')

