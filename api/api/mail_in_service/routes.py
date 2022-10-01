from api import app, db
from flask import request, Response
import json
from .models import Mail_In_Repair, Mail_In_Web
from api.site_user.models import SiteUser
import datetime
from sqlalchemy import exc

def dateSerializer(o):
    if isinstance(o, datetime.datetime):
        return o.__str__()

@app.route('/api/mail_in_repair', methods=['GET', 'POST'])
def mail_in_repair():

    if request.method == "GET":

        #repairs = db.session.query(Mail_In_Repair).all()
        repairs = db.session.query(Mail_In_Repair, SiteUser).join(SiteUser).all()

        repair_list = {}

        for repair in repairs:
            repair_list[repair["Mail_In_Repair"].id] = {}
            repair_list[repair["Mail_In_Repair"].id]["id"] = repair["Mail_In_Repair"].id
            repair_list[repair["Mail_In_Repair"].id]["repair_first_name"] = repair["Mail_In_Repair"].repair_first_name
            repair_list[repair["Mail_In_Repair"].id]["repair_last_name"] = repair["Mail_In_Repair"].repair_last_name
            repair_list[repair["Mail_In_Repair"].id]["repair_email"] = repair["Mail_In_Repair"].repair_email
            repair_list[repair["Mail_In_Repair"].id]["repair_phone"] = repair["Mail_In_Repair"].repair_phone
            repair_list[repair["Mail_In_Repair"].id]["repair_address_line_one"] = repair["Mail_In_Repair"].repair_address_line_one
            repair_list[repair["Mail_In_Repair"].id]["repair_address_line_two"] = repair["Mail_In_Repair"].repair_address_line_two
            repair_list[repair["Mail_In_Repair"].id]["repair_address_city"] = repair["Mail_In_Repair"].repair_address_city
            repair_list[repair["Mail_In_Repair"].id]["repair_address_state"] = repair["Mail_In_Repair"].repair_address_state
            repair_list[repair["Mail_In_Repair"].id]["repair_address_postal_code"] = repair["Mail_In_Repair"].repair_address_postal_code
            repair_list[repair["Mail_In_Repair"].id]["repair_address_country"] = repair["Mail_In_Repair"].repair_address_country
            repair_list[repair["Mail_In_Repair"].id]["repair_brand"] = repair["Mail_In_Repair"].repair_brand
            repair_list[repair["Mail_In_Repair"].id]["repair_model"] = repair["Mail_In_Repair"].repair_model
            repair_list[repair["Mail_In_Repair"].id]["repair_serial"] = repair["Mail_In_Repair"].repair_serial
            repair_list[repair["Mail_In_Repair"].id]["repair_issue"] = repair["Mail_In_Repair"].repair_issue
            repair_list[repair["Mail_In_Repair"].id]["repair_date_submitted"] = dateSerializer(repair["Mail_In_Repair"].repair_date_submitted)
            repair_list[repair["Mail_In_Repair"].id]["repair_user_id"] = repair["Mail_In_Repair"].repair_user_id
            repair_list[repair["Mail_In_Repair"].id]["repair_user_public_id"] = repair["User"].public_id
            repair_list[repair["Mail_In_Repair"].id]["repair_username"] = repair["User"].username

        return Response(json.dumps(repair_list), mimetype='application/json')
    
    if request.method == "POST":

        data = request.get_json(force=True)
        if data['repair_user_public_id']:
            user_id = db.session.query(SiteUser).filter_by(public_id=data['repair_user_public_id']).first().id 
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
                repair_user_id = user_id
            )

            db.session.add(new_repair)
            db.session.commit()

            # Get updated query for all general ledger items
            #repairs = db.session.query(Mail_In_Repair).all()
            repairs = db.session.query(Mail_In_Repair, SiteUser).join(SiteUser).all()

            for repair in repairs:
                print(repair["Mail_In_Repair"].id)

            repair_list = {}

            for repair in repairs:
                repair_list[repair["Mail_In_Repair"].id] = {}
                repair_list[repair["Mail_In_Repair"].id]["id"] = repair["Mail_In_Repair"].id
                repair_list[repair["Mail_In_Repair"].id]["repair_first_name"] = repair["Mail_In_Repair"].repair_first_name
                repair_list[repair["Mail_In_Repair"].id]["repair_last_name"] = repair["Mail_In_Repair"].repair_last_name
                repair_list[repair["Mail_In_Repair"].id]["repair_email"] = repair["Mail_In_Repair"].repair_email
                repair_list[repair["Mail_In_Repair"].id]["repair_phone"] = repair["Mail_In_Repair"].repair_phone
                repair_list[repair["Mail_In_Repair"].id]["repair_address_line_one"] = repair["Mail_In_Repair"].repair_address_line_one
                repair_list[repair["Mail_In_Repair"].id]["repair_address_line_two"] = repair["Mail_In_Repair"].repair_address_line_two
                repair_list[repair["Mail_In_Repair"].id]["repair_address_city"] = repair["Mail_In_Repair"].repair_address_city
                repair_list[repair["Mail_In_Repair"].id]["repair_address_state"] = repair["Mail_In_Repair"].repair_address_state
                repair_list[repair["Mail_In_Repair"].id]["repair_address_postal_code"] = repair["Mail_In_Repair"].repair_address_postal_code
                repair_list[repair["Mail_In_Repair"].id]["repair_address_country"] = repair["Mail_In_Repair"].repair_address_country
                repair_list[repair["Mail_In_Repair"].id]["repair_brand"] = repair["Mail_In_Repair"].repair_brand
                repair_list[repair["Mail_In_Repair"].id]["repair_model"] = repair["Mail_In_Repair"].repair_model
                repair_list[repair["Mail_In_Repair"].id]["repair_serial"] = repair["Mail_In_Repair"].repair_serial
                repair_list[repair["Mail_In_Repair"].id]["repair_issue"] = repair["Mail_In_Repair"].repair_issue
                repair_list[repair["Mail_In_Repair"].id]["repair_date_submitted"] = dateSerializer(repair["Mail_In_Repair"].repair_date_submitted)
                repair_list[repair["Mail_In_Repair"].id]["repair_user_id"] = repair["Mail_In_Repair"].repair_user_id
                repair_list[repair["Mail_In_Repair"].id]["repair_user_public_id"] = repair["User"].public_id
                repair_list[repair["Mail_In_Repair"].id]["repair_username"] = repair["User"].username

            return Response(json.dumps(repair_list), mimetype='application/json')
        except exc.IntegrityError as e:
            db.session.rollback()
            return Response(json.dumps({'message' : f'ERROR: Cannot create new repair. Due to ERROR: {e}'}), mimetype='application/json')



@app.route('/api/mail_in_web', methods=['GET', 'POST'])
def mail_in_web():

    if request.method == "GET":

        #web_services= db.session.query(Mail_In_Web).all()
        web_services = db.session.query(Mail_In_Web, SiteUser).join(SiteUser).all()

        web_service_list = {}

        for web_service in web_services:
            web_service_list[web_service["Mail_In_Web"].id] = {}
            web_service_list[web_service["Mail_In_Web"].id]["id"] = web_service["Mail_In_Web"].id
            web_service_list[web_service["Mail_In_Web"].id]["web_service_first_name"] = web_service["Mail_In_Web"].web_service_first_name
            web_service_list[web_service["Mail_In_Web"].id]["web_service_last_name"] = web_service["Mail_In_Web"].web_service_last_name
            web_service_list[web_service["Mail_In_Web"].id]["web_service_email"] = web_service["Mail_In_Web"].web_service_email
            web_service_list[web_service["Mail_In_Web"].id]["web_service_phone"] = web_service["Mail_In_Web"].web_service_phone
            web_service_list[web_service["Mail_In_Web"].id]["web_service_project_explanation"] = web_service["Mail_In_Web"].web_service_project_explanation
            web_service_list[web_service["Mail_In_Web"].id]["web_service_extra_details"] = web_service["Mail_In_Web"].web_service_extra_details
            web_service_list[web_service["Mail_In_Web"].id]["web_service_user_id "] = web_service["Mail_In_Web"].web_service_user_id
            web_service_list[web_service["Mail_In_Web"].id]["web_service_user_public_id"] = web_service["User"].public_id
            web_service_list[web_service["Mail_In_Web"].id]["web_service_username"] = web_service["User"].username

        return Response(json.dumps(web_service_list), mimetype='application/json')
    
    if request.method == "POST":

        data = request.get_json(force=True)
        if data['web_service_user_public_id']:
            user_id = db.session.query(SiteUser).filter_by(public_id=data['web_service_user_public_id']).first().id 
        else:
            user_id = 0

        try:
            new_web_service = Mail_In_Web(
                web_service_first_name = data['web_service_first_name'],
                web_service_last_name = data['web_service_last_name'],
                web_service_email = data['web_service_email'],
                web_service_phone = data['web_service_phone'],
                web_service_project_explanation = data['web_service_project_explanation'],
                web_service_extra_details = data['web_service_extra_details'],
                web_service_user_id = user_id
            )

            db.session.add(new_web_service)
            db.session.commit()

            # Get updated query for all web service items
            #web_services= db.session.query(Mail_In_Web).all()
            web_services = db.session.query(Mail_In_Web, SiteUser).join(SiteUser).all()

            web_service_list = {}

            for web_service in web_services:
                web_service_list[web_service["Mail_In_Web"].id] = {}
                web_service_list[web_service["Mail_In_Web"].id]["id"] = web_service["Mail_In_Web"].id
                web_service_list[web_service["Mail_In_Web"].id]["web_service_first_name"] = web_service["Mail_In_Web"].web_service_first_name
                web_service_list[web_service["Mail_In_Web"].id]["web_service_last_name"] = web_service["Mail_In_Web"].web_service_last_name
                web_service_list[web_service["Mail_In_Web"].id]["web_service_email"] = web_service["Mail_In_Web"].web_service_email
                web_service_list[web_service["Mail_In_Web"].id]["web_service_phone"] = web_service["Mail_In_Web"].web_service_phone
                web_service_list[web_service["Mail_In_Web"].id]["web_service_project_explanation"] = web_service["Mail_In_Web"].web_service_project_explanation
                web_service_list[web_service["Mail_In_Web"].id]["web_service_extra_details"] = web_service["Mail_In_Web"].web_service_extra_details
                web_service_list[web_service["Mail_In_Web"].id]["web_service_user_id "] = web_service["Mail_In_Web"].web_service_user_id
                web_service_list[web_service["Mail_In_Web"].id]["web_service_user_public_id"] = web_service["User"].public_id
                web_service_list[web_service["Mail_In_Web"].id]["web_service_username"] = web_service["User"].username

            return Response(json.dumps(web_service_list), mimetype='application/json')
        except exc.IntegrityError as e:
            db.session.rollback()
            return Response(json.dumps({'message' : f'ERROR: Cannot create new repair. Due to ERROR: {e}'}), mimetype='application/json')



