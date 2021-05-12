import json, os
from flask import Flask, Response, jsonify



app = Flask(__name__)

#
# ------------------- JLPT N5 Level -------------------
#

@app.route('/api/japanese/jlptn5')
def get_jlpt_n5():
    json_jlpt_n5_all = open(os.path.join( app.static_folder, 'json/jlpt_n5', "jlpt_n5_all.json"), "r")
    data = json.load(json_jlpt_n5_all)
    print(data)
    return Response(json.dumps(data), mimetype='application/json')

@app.route('/api/japanese/jlptn5/info')
def get_jlpt_n5_info():
    data = [
                '01',
                '02',
                '03',
                '04',
                '05',
                '06',
                '07',
                '08',
                '09',
                '10',
                '11',
                '12',
                '13',
                '14',
                '15',
                '16',
                '17',
                '18',
                '19',
                '20',
                '21'
            ]
    return Response(json.dumps(data), mimetype='application/json')

@app.route('/api/japanese/jlptn5/<id>')
def get_jlpt_n5_one_lesson(id):
    json_jlpt_n5_one = open(os.path.join( app.static_folder, 'json/jlpt_n5', "jlpt_n5_" + id + ".json"), "r")
    data = json.load(json_jlpt_n5_one)
    return Response(json.dumps(data), mimetype='application/json')

#
# ------------------- JLPT N4 Level -------------------
#

@app.route('/api/japanese/jlptn4')
def get_jlpt_n4():
    data = [
                {
                    'id': 0,
                    'kana': "This is not jlpt n4 at all!",
                    'eng': "This is not jlpt n4 at all!",
                    'kanji': ''
                },
                {
                    'id': 1,
                    'kana': "ぜんぶ",
                    'eng': "all",
                    'kanji': "全部"
                },
                {
                    'id': 2,
                    'kana': "ズボン",
                    'eng': "pants",
                    'kanji': ''
                },
                {
                    'id': 3,
                    'kana': "ゼロ",
                    'eng': "zero",
                    'kanji': ''
                }

            ]
    print(data)
    return Response(json.dumps(data), mimetype='application/json')

@app.route('/api/japanese/jlptn4/info')
def get_jlpt_n4_info():
    data = [
                '01',
                '02',
                '03',
                '04',
                '05',
                '06',
                '07',
                '08',
                '09',
                '10',
                '11',
                '12',
                '13',
                '14',
                '15',
                '16',
                '17',
                '18',
                '19',
                '20',
                '21',
                '22'
            ]
    return Response(json.dumps(data), mimetype='application/json')

@app.route('/api/japanese/jlptn5/test')
def get_jlpt_n5_02():
    list = [
                {
                    'id': 0,
                    'kana': "ぜんぶ",
                    'eng': "all",
                    'kanji': "全部"
                },
                {
                    'id': 1,
                    'kana': "ズボン",
                    'eng': "pants",
                    'kanji': ''
                },
                {
                    'id': 2,
                    'kana': "ゼロ",
                    'eng': "zero",
                    'kanji': ''
                }

            ]
    return jsonify(results = list)
