from api import app, db
from flask import request, Response, redirect, url_for
import json
from sqlalchemy import exc
from api.jwt_token.__token_required__ import token_required
import datetime




@app.route('/api/web_service', methods=['GET', 'POST'])
def web_service():

    if request.method == "GET":

        #web_services= db.session.query(Mail_In_Web).all()
        web_services = db.session.query(Mail_In_Web, SiteUser).join(SiteUser).all()

        web_service_list = {}

        for web_service in web_services:
            service_obj = web_service_list[web_service["Mail_In_Web"].id]
            service_obj = {key: web_service["Mail_In_Web"][key] for key in service_obj}
            # for key inside of service, value from web_service using that key to look up
            # web_service_list[web_service["Mail_In_Web"].id]["id"] = web_service["Mail_In_Web"].id
            # web_service_list[web_service["Mail_In_Web"].id]["web_service_first_name"] = web_service["Mail_In_Web"].web_service_first_name
            # web_service_list[web_service["Mail_In_Web"].id]["web_service_last_name"] = web_service["Mail_In_Web"].web_service_last_name
            # web_service_list[web_service["Mail_In_Web"].id]["web_service_email"] = web_service["Mail_In_Web"].web_service_email
            # web_service_list[web_service["Mail_In_Web"].id]["web_service_phone"] = web_service["Mail_In_Web"].web_service_phone
            # web_service_list[web_service["Mail_In_Web"].id]["web_service_project_explanation"] = web_service["Mail_In_Web"].web_service_project_explanation
            # web_service_list[web_service["Mail_In_Web"].id]["web_service_extra_details"] = web_service["Mail_In_Web"].web_service_extra_details
            # web_service_list[web_service["Mail_In_Web"].id]["web_service_user_id "] = web_service["Mail_In_Web"].web_service_user_id
            # web_service_list[web_service["Mail_In_Web"].id]["web_service_user_public_id"] = web_service["SiteUser"].public_id
            # web_service_list[web_service["Mail_In_Web"].id]["web_service_username"] = web_service["SiteUser"].username

        return Response(json.dumps(web_service_list), mimetype='application/json')
    
    if request.method == "POST":

        data = request.get_json(force=True)
        if data['web_service_user_public_id']:
            user_id = db.session.query(SiteUser).filter_by(public_id=data['web_service_user_public_id']).first().id 
        else:
            user_id = 1

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
                web_service_list[web_service["Mail_In_Web"].id]["web_service_user_public_id"] = web_service["SiteUser"].public_id
                web_service_list[web_service["Mail_In_Web"].id]["web_service_username"] = web_service["SiteUser"].username

            # Send email notifing of new order:
            sender = "toby2494.development@gmail.com"
            recipient = "toby2494@gmail.com"
            email_body = ""
            for item in data:
                email_body += f"{item}: {data[item]}\n"
            generate_then_send(app, sender, recipient,f"Received new Web Service Order From: {data['web_service_email']}", email_body, None)

            return Response(json.dumps(web_service_list), mimetype='application/json')
        except exc.IntegrityError as e:
            db.session.rollback()
            return Response(json.dumps({'message' : f'ERROR: Cannot create new repair. Due to ERROR: {e}'}), mimetype='application/json')



