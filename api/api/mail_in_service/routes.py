from crypt import methods
from api import app, db
from flask import request, Response
import json
from .models import Mail_In_Repair, Mail_In_Web, Work_Order, Repair, Customer_Contact, Customer_Address
from api.site_user.models import SiteUser
import datetime
from sqlalchemy import exc
# from api.automation.send_email import send, generate_then_send
from api.jwt_token.__token_required__ import token_required

from .serializers_helpers import *

# This will be the new "repair submission" that makes a work order and all the repairs in one batch
@app.route('/api/work_order', methods=['GET', 'POST'])
def work_order():
    if request.method == "GET":
        work_orders = db.session.query(Work_Order, SiteUser).join(SiteUser).all()
        work_order_list = get_updated_work_orders(work_orders)
        
        return Response(json.dumps(work_order_list), mimetype='application/json')
    
    if request.method == "POST":
        # Don't remember why I had to pass force=True as an argument
        data = request.get_json(force=True)
        print(type(data))
        user_id = get_user_id(data) # get user id
        new_wo_id = build_wo(data, user_id) # build work order
        print(f"new wo id: {new_wo_id}")
        # build each repair or repairs tied to work_order and user; Also returns 'items' list for DETRACT APP
        itemList = build_repairs(data, new_wo_id, user_id) 

        # need to create the Customer Address and Customer Constact
        cust_contact = create_cust_contact(data['cutomer_contact'], user_id , new_wo_id )
        cust_address = create_cust_address(data['customer_address'], user_id , new_wo_id )

        # if date['delivery_method'] is local, then start post request to DETRACT APP with work_order and itemList


        return Response(json.dumps({"message": "success", "detrack_items": itemList}), mimetype='application/json')
        
@app.route('/api/mail_in_repair', methods=['GET', 'POST'])
def mail_in_repair():

    if request.method == "GET":

        #repairs = db.session.query(Mail_In_Repair).all()
        repairs = db.session.query(Mail_In_Repair, SiteUser).join(SiteUser).all()

        repair_list = get_updated_mail_in_repairs(repairs)
        
        return Response(json.dumps(repair_list), mimetype='application/json')
    
    if request.method == "POST":

        data = request.get_json(force=True)
        if data['repair_user_public_id']:
            user_id = db.session.query(SiteUser).filter_by(public_id=data['repair_user_public_id']).first().id 

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
        else:
            user_id = 1

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

        try:

            db.session.add(new_repair)
            db.session.commit()

            # Get updated query for all general ledger items
            #repairs = db.session.query(Mail_In_Repair).all()
            repairs = db.session.query(Mail_In_Repair, SiteUser).join(SiteUser).all()

            # for repair in repairs:
            #     print(repair["Mail_In_Repair"].id)

            repair_list = get_updated_mail_in_repairs(repairs)

### Fuck Google for changing the app password setup and for fucking with their settings menu
            # # Send email notifing of new order:
            # sender = "toby2494.development@gmail.com"
            # recipient = "toby2494@gmail.com"
            # email_body = ""
            # for item in data:
            #     email_body += f"{item}: {data[item]}\n"
            # generate_then_send(app, sender, recipient,f"Received new Repair Order From: {data['repair_email']}", email_body, None)

            return Response(json.dumps(repair_list), mimetype='application/json')
        except exc.IntegrityError as e:
            db.session.rollback()
            return Response(json.dumps({'message' : f'ERROR: Cannot create new repair. Due to ERROR: {e}'}), mimetype='application/json')

@app.route('/api/mail_in_repair_by_user', methods=['GET'])
@token_required
def mail_in_repair_in_progress_by_user(current_user):

    if current_user.id == 1:
        return Response(json.dumps({"message" : "You have no orders, Were you logged in when making an order?"}), mimetype='application/json')
    #repairs = db.session.query(Mail_In_Repair).all()
    repairs = db.session.query(Mail_In_Repair, SiteUser).filter(SiteUser.id == current_user.id).join(SiteUser).all()

    repair_list = get_updated_mail_in_repairs(repairs)

    print(repair_list)
    return Response(json.dumps(repair_list), mimetype='application/json')


@app.route('/api/mail_in_repair_in_progress', methods=['GET'])
def mail_in_repair_in_progress():


    #repairs = db.session.query(Mail_In_Repair).all()
    repairs = db.session.query(Mail_In_Repair, SiteUser).join(SiteUser).filter(Mail_In_Repair.repair_completed == False).all()

    repair_list = get_updated_mail_in_repairs(repairs)

    print(repair_list)
    return Response(json.dumps(repair_list), mimetype='application/json')

@app.route('/api/mail_in_repair_completed', methods=['GET'])
def mail_in_repair_completed():

    #repairs = db.session.query(Mail_In_Repair).all()
    repairs = db.session.query(Mail_In_Repair, SiteUser).join(SiteUser).filter(Mail_In_Repair.repair_completed == True).all()

    repair_list = get_updated_mail_in_repairs(repairs)

    return Response(json.dumps(repair_list), mimetype='application/json')

@app.route('/api/mail_in_repair/<id>/complete', methods=['PATCH'])
def mail_in_repair_complete(id):
        
    current_repair = db.session.query(Mail_In_Repair).filter_by(id=id).first()
    print(current_repair.repair_completed)

    try:
        current_repair.repair_completed = not current_repair.repair_completed
        current_repair.repair_date_completed = dateSerializer(datetime.datetime.now)
        db.session.commit()

        # Get updated query for all general ledger items
        #repairs = db.session.query(Mail_In_Repair).all()
        repairs = db.session.query(Mail_In_Repair, SiteUser).join(SiteUser).all()

        for repair in repairs:
            print(repair["Mail_In_Repair"].id)

        repair_list = get_updated_mail_in_repairs(repairs)



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
            web_service_list[web_service["Mail_In_Web"].id]["web_service_user_public_id"] = web_service["SiteUser"].public_id
            web_service_list[web_service["Mail_In_Web"].id]["web_service_username"] = web_service["SiteUser"].username

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

            # # Send email notifing of new order:
            # sender = "toby2494.development@gmail.com"
            # recipient = "toby2494@gmail.com"
            # email_body = ""
            # for item in data:
            #     email_body += f"{item}: {data[item]}\n"
            # generate_then_send(app, sender, recipient,f"Received new Web Service Order From: {data['web_service_email']}", email_body, None)

            return Response(json.dumps(web_service_list), mimetype='application/json')
        except exc.IntegrityError as e:
            db.session.rollback()
            return Response(json.dumps({'message' : f'ERROR: Cannot create new repair. Due to ERROR: {e}'}), mimetype='application/json')



