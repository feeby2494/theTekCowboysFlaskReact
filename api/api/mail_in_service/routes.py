from crypt import methods
from api import app, db
from flask import request, Response
import json
from .models import Mail_In_Repair, Mail_In_Web, Work_Order, Repair, Customer_Contact, Customer_Address
from api.site_user.models import SiteUser
import datetime
from sqlalchemy import exc
from api.automation.send_email import send, generate_then_send
from api.jwt_token.__token_required__ import token_required

# Helper Methods
def dateSerializer(o):
    if isinstance(o, datetime.datetime):
        return o.__str__()

def get_user_id(data):
    user_id = 1 # if user is not logged in; make them a generic user in DB
    if data['repair_user_public_id']: # if user is logged in
        user_id = db.session.query(SiteUser).filter_by(public_id=data['repair_user_public_id']).first().id 
    return user_id

def get_updated_mail_in_repairs(repairs):
    repair_list = {}

    # repair["Mail_In_Repair"].id refers to a joined sql query; this is where the "Mail_In_Repair" vs "Site_User" comes from (name of joined tables)
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
        repair_list[repair["Mail_In_Repair"].id]["repair_completed"] = repair["Mail_In_Repair"].repair_completed
        repair_list[repair["Mail_In_Repair"].id]["repair_user_id"] = repair["Mail_In_Repair"].repair_user_id
        repair_list[repair["Mail_In_Repair"].id]["repair_user_public_id"] = repair["SiteUser"].public_id
        repair_list[repair["Mail_In_Repair"].id]["repair_username"] = repair["SiteUser"].username
    return repair_list

def build_one_repair(repair, work_order_id, user_id):
    try:
        new_repair = Repair(
            brand = repair['brand'],
            model = repair['model'],
            serial = repair['serial'],
            issue = repair['issue'],
            user_id = user_id,
            work_order_id = work_order_id
        )
    except Exception as err:
        print(f'Cannot build Repair for device serial: {repair["repair_serial"]} due to: {err}')
    return new_repair

def build_repairs(data, work_order_id, user_id):
    
    ### ONLY FOR DETRACT APP'S ITEMS ###
    itemList = []
    
    # many repairs
    if len(data["repairs"]) > 1:
        try:
            for repair in data['repairs']:
                new_repair = build_one_repair(repair, work_order_id, user_id)
                db.session.add(new_repair)
                db.session.commit()

                itemList.append({
                    "sku": f"{new_repair.serial}",
                    "description": f"{new_repair.brand}-{new_repair.model}\nIssue: {new_repair.issue}",
                    "quantity": 1
                })
        except Exception as err:
            print(f'Cannot build Repairs due to: {err}')
    # one repair
    if len(data["repairs"]) == 1:
        try:
            new_repair = build_one_repair(data['repairs'][0], work_order_id, user_id)
            db.session.add(new_repair)
            db.session.commit()

            itemList.append({
                "sku": f"{new_repair.serial}",
                "description": f"{new_repair.brand}-{new_repair.model}\nIssue: {new_repair.issue}",
                "quantity": 1
            })
        except Exception as err:
            print(f'Cannot build Repair due to: {err}')
    # zero repair
    if len(data["repairs"]) < 1:
        try:
            empty_repair = {
                'brand': 'none',
                'model': 'none',
                'serial': 'none',
                'issue': 'none',
            }
            for repair in data['repairs']:
                new_repair = build_one_repair(empty_repair, work_order_id, user_id)
                db.session.add(new_repair)
                db.session.commit()

                itemList.append({
                    "sku": f"{new_repair.serial}",
                    "description": f"{new_repair.brand}-{new_repair.model}\nIssue: {new_repair.issue}",
                    "quantity": 1
                })
        except Exception as err:
            print(f'Cannot build Repairs due to: {err}')
    return itemList # Need to return a list of repairs to use in Detract app to populate the 'Items'
    

def get_updated_work_orders(work_orders):
    work_order_list = {}
    
    # repair["Mail_In_Repair"].id refers to a joined sql query; this is where the "Mail_In_Repair" vs "Site_User" comes from (name of joined tables)
    for order in work_orders:
        work_order_list[order["Work_Order"].id] = {}
        work_order_list[order["Work_Order"].id]["id"] = order["Work_order"].id
        work_order_list[order["Work_Order"].id]["completed"] = order["Work_order"].completed
        work_order_list[order["Work_Order"].id]["submitted_date"] = dateSerializer(order["Work_order"].submitted_date)
        work_order_list[order["Work_Order"].id]["delivery_method"] = order["Work_order"].delivery_method
        work_order_list[order["Work_Order"].id]["collection_date"] = dateSerializer(order["Work_order"].collection_date)
        work_order_list[order["Work_Order"].id]["user_id"] = order["Work_order"].user_id
        work_order_list[order["Work_Order"].id]["repair_list"] = order["Work_order"].repair_list 
    return work_order_list

def build_wo(wo_data, user_id):
    try:
        new_wo = Work_Order(
            delivery_method = wo_data["delivery_method"],
            collection_date = dateSerializer(wo_data["collection_date"]),
            user_id = user_id
        )
        db.session.add(new_wo)
        db.session.commit()
    except Exception as err:
        print(f'Cannot build Work Order due to: {err}')
    
    return new_wo # should be able to access id column by: new_wo.id after commiting

def create_cust_contact(data, user_id, work_order_id):
    try:
        cust_contact = Customer_Contact(
            first_name = data['first_name'],
            last_name = data['last_name'],
            email = data['email'],
            phone = data['phone'],
            user_id = user_id,
            work_order_id = work_order_id
        )
        db.session.add(cust_contact)
        db.session.commit()
    except Exception as err:
        print(f'Cannot build Customer Contact due to: {err}')
    return cust_contact

def create_cust_address(data, user_id, work_order_id):
    try:
        cust_address = Customer_Address(
            street_line_one = data['street_line_one'],
            street_line_two = data['street_line_two'],
            city = data['city'],
            state = data['state'],
            postal_code = data['postal_code'],
            country = data['country'],
            user_id = user_id,
            work_order_id = work_order_id
        )
        db.session.add(cust_address)
        db.session.commit()
    except Exception as err:
        print(f'Cannot build Customer Address due to: {err}')
    return cust_address

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
        user_id = get_user_id(data) # get user id
        new_wo = build_wo(data, user_id) # build work order

        # build each repair or repairs tied to work_order and user; Also returns 'items' list for DETRACT APP
        itemList = build_repairs(data, new_wo.id, user_id) 

        # need to create the Customer Address and Customer Constact
        cust_contact = create_cust_contact(data['cutomer_contact'])
        cust_address = create_cust_address(data['customer_address'])

        # if date['delivery_method'] is local, then start post request to DETRACT APP with work_order and itemList

        
        
        
        
         
        
    

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

            # Send email notifing of new order:
            sender = "toby2494.development@gmail.com"
            recipient = "toby2494@gmail.com"
            email_body = ""
            for item in data:
                email_body += f"{item}: {data[item]}\n"
            generate_then_send(app, sender, recipient,f"Received new Repair Order From: {data['repair_email']}", email_body, None)

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



