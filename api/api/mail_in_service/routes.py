from api import app, db
from flask import request, Response
import json
from .models import Mail_In_Repair, Mail_In_Web
from api.user.models import User
import datetime

@app.route('/api/mail_in_repair', methods=['GET', 'POST'])
def mail_in_repair():

    if request.method == "GET":

        #repairs = db.session.query(Mail_In_Repair).all()
        repairs = db.session.query(Mail_In_Repair, User).join(User).all()

        repairs_list = {}

        for repair in repairs:
            repair_list[repair.id] = {}
            repair_list[repair.id]["id"] = repair.id
            repair_list[repair.id]["repair_first_name"] = repair.repair_first_name
            repair_list[repair.id]["repair_last_name"] = repair.repair_last_name
            repair_list[repair.id]["repair_email"] = repair.repair_email
            repair_list[repair.id]["repair_phone"] = repair.repair_phone
            repair_list[repair.id]["repair_address_line_one"] = repair.repair_address_line_one
            repair_list[repair.id]["repair_address_line_two"] = repair.repair_address_line_two
            repair_list[repair.id]["repair_address_city"] = repair.repair_address_city
            repair_list[repair.id]["repair_address_state"] = repair.repair_address_state
            repair_list[repair.id]["repair_address_postal_code"] = repair.repair_address_postal_code
            repair_list[repair.id]["repair_address_country"] = repair.repair_address_country
            repair_list[repair.id]["repair_brand"] = repair.repair_brand
            repair_list[repair.id]["repair_model"] = repair.repair_model
            repair_list[repair.id]["repair_serial"] = repair.repair_serial
            repair_list[repair.id]["repair_issue"] = repair.repair_issue
            repair_list[repair.id]["repair_date_submitted"] = repair.repair_date_submitted
            repair_list[repair.id]["repair_user_id"] = repair.repair_user_id
            repair_list[repair.id]["repair_user_public_id"] = repair.public_id
            repair_list[repair.id]["repair_username"] = repair.username


        print(repairs_list)

        return Response(json.dumps(repairs_list), mimetype='application/json')
    
    if request.method == "POST":

        data = request.get_json(force=True)
        if data['repairUser']:
            user_id = db.session.query(User).filter_by(public_id=data['repairUser']).first().id 
        else:
            user_id = 0

        try:
            new_repair = Mail_In_Repair(
                repair_first_name = data['repair_first_name'],
                repair_last_name = data['repair_last_name'],
                repair_email = data['repair_email'],
                repair_phone = data['repair_phone'],
                repair_address_line_one = data['repair_address_line_one'],
                repair_address_line_two = data['repair_address_line_two'],
                repair_address_city = data['repair_address_city'],
                repair_address_state = data['repair_address_state'],
                repair_address_postal_code = data['repair_address_postal_code'],
                repair_address_country = data['repair_address_country'],
                repair_brand = data['repair_brand'],
                repair_model = data['repair_model'],
                repair_serial = data['repair_serial'],
                repair_issue = data['repair_issue'],
                repair_date_submitted = datetime.datetime.now,
                repair_user_id = user_id
            )

            db.session.add(new_repair)
            db.session.commit()

            # Get updated query for all general ledger items
            #repairs = db.session.query(Mail_In_Repair).all()
            repairs = db.session.query(Mail_In_Repair, User).join(User).all()

            repairs_list = {}

            for repair in repairs:
                repair_list[repair.id] = {}
                repair_list[repair.id]["id"] = repair.id
                repair_list[repair.id]["repair_first_name"] = repair.repair_first_name
                repair_list[repair.id]["repair_last_name"] = repair.repair_last_name
                repair_list[repair.id]["repair_email"] = repair.repair_email
                repair_list[repair.id]["repair_phone"] = repair.repair_phone
                repair_list[repair.id]["repair_address_line_one"] = repair.repair_address_line_one
                repair_list[repair.id]["repair_address_line_two"] = repair.repair_address_line_two
                repair_list[repair.id]["repair_address_city"] = repair.repair_address_city
                repair_list[repair.id]["repair_address_state"] = repair.repair_address_state
                repair_list[repair.id]["repair_address_postal_code"] = repair.repair_address_postal_code
                repair_list[repair.id]["repair_address_country"] = repair.repair_address_country
                repair_list[repair.id]["repair_brand"] = repair.repair_brand
                repair_list[repair.id]["repair_model"] = repair.repair_model
                repair_list[repair.id]["repair_serial"] = repair.repair_serial
                repair_list[repair.id]["repair_issue"] = repair.repair_issue
                repair_list[repair.id]["repair_date_submitted"] = repair.repair_date_submitted
                repair_list[repair.id]["repair_user_id"] = repair.repair_user_id
                repair_list[repair.id]["repair_user_public_id"] = repair.public_id
                repair_list[repair.id]["repair_username"] = repair.username


            print(repairs_list)

            return Response(json.dumps(repairs_list), mimetype='application/json')
        except exc.IntegrityError as e:
            db.session.rollback()
            return Response(json.dumps({'message' : f'ERROR: Cannot create new repair. Due to ERROR: {e}'}), mimetype='application/json')



