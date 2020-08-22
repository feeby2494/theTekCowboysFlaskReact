from flask import Flask


app = Flask(__name__)

@app.route('/api/japanese/jlptn5/01')
def get_jlpt_n5_01():
    return {'name': 'JLPT N5 first one'}

    
