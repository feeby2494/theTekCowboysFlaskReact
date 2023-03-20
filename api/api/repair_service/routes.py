from api import app, db

from flask import Response, request
import json
from .models import Order, Device, OrderAddress, OrderContact
from sqlalchemy import exc
from api.jwt_token.__token_required__ import token_required
from api.site_user.models import SiteUser
from api.decorators import asyncThread

from api.helpers import get_or_create, dateSerializer, makeTempDevice, makeTempOrder, makeTempDevice

# I want the user to log in first!
@app.route('/api/repair-multi', methods=['POST'])
@token_required
def multi_repair_submit(current_user):

    """
        Accept order with multiple devices for users logged in
    """
    try:
        # Get data from request
        data = request.get_json()

        # check email
        contact = get_or_create(
            db.session,
            OrderContact,
            name=data['name'], 
            email=data['email']
        )
        db.session.add(contact)
        db.session.commit()
        

        # check address
        address = get_or_create(
            db.session,
            OrderAddress,
            line_one=data['lineOne'], 
            line_two=data['lineTwo'],
            city=data['city'],
            state=data['state'],
            postal_code=data['postalCode'],
            country=data['country']
            )
        db.session.add(address)
        db.session.commit()
        
        # Build Order, then save
        new_order = Order(contact=contact.id, address=address.id, user_id=current_user.id,)
        db.session.add(new_order)
        db.session.commit()

        # For each repair in repairs, 

        def deviceSubmit(device):
            if len(device['brand']) > 0 or len(device['model']) > 0 or len(device['issue']) > 0:
                new_device = Device(brand=device['brand'], model=device['model'], issue=device['issue'], work_order_id=new_order.id)
                db.session.add(new_device)
                db.session.commit()
        
        # map deosn't do side effects! so using old fasshion for loop
        # map(deviceSubmit, data['repairs'])
        for device in data['repairs']:
            deviceSubmit(device)

        #test to see all devices:
        devicesSubmitted = Device.query.all()
        print(devicesSubmitted)

        # email me an alert of new customer

        # email customer shipping instructions


        return Response(json.dumps({'message' : f'Submission was a success!'}), mimetype='application/json')
    except exc.IntegrityError as e:
        db.session.rollback()
        return Response(json.dumps({'message' : f'ERROR: Cannot create new repair. Due to ERROR: {e}'}), mimetype='application/json')
    
@app.route('/api/repair-multi', methods=['GET'])
@token_required
def multi_repair_order_list(current_user):
    """
        Accept order with multiple devices for non-users
    """

    try:
        orders = []


        userOrders = db.session.query(Order, SiteUser, OrderContact, OrderAddress, Device).filter(SiteUser.id == current_user.id).join(SiteUser).filter(OrderContact.id == Order.contact).join(OrderContact).filter(OrderAddress.id == Order.address).join(OrderAddress).filter(Device.work_order_id == Order.id).join(Device).all()

        for order in list(userOrders):
            # temp_device_list = []

            # for device in list(order["Device"]):
            #     temp_device = {}
            #     temp_device["id"] = device.id
            #     temp_device["brand"] = device.brand
            #     temp_device["model"] = device.model
            #     temp_device["issue"] = device.issue
                
            #     temp_device_list.append(temp_device)

            temp_order = {}
            temp_order["id"] = order["Order"].id
            temp_order["submitted_date"] = dateSerializer(order["Order"].submitted_date)
            temp_order["contact"] = {"name" : order["OrderContact"].name,
                                     "email" : order["OrderContact"].email}
            temp_order["address"] = {"line_one" : order["OrderAddress"].line_one, 
                                     "line_two" : order["OrderAddress"].line_two, 
                                     "city" : order["OrderAddress"].city,
                                     "state" : order["OrderAddress"].state,
                                     "postal_code" : order["OrderAddress"].postal_code,
                                     "country" : order["OrderAddress"].country}
            temp_order["user_id"] = order["Order"].user_id
            temp_order["username"] = order["SiteUser"].username
            orders.append(temp_order)
            print(order["Device"])

        return Response(json.dumps(orders), mimetype='application/json')
    except exc.IntegrityError as e:
        db.session.rollback()
        return Response(json.dumps({'message' : f'ERROR: Cannot get all orders from user. Logged in? Due to ERROR: {e}'}), mimetype='application/json')


@app.route('/api/repair-multi/<current_order_id>', methods=['GET'])
@token_required
def multi_repair_single_order(current_user, current_order_id):
    """
        Accept order with multiple devices for non-users
    """

    try:
        current_order = db.session.query(Order).filter(Order.id == current_order_id).all()
        devices_from_order = db.session.query(Device).filter(Device.work_order_id == current_order_id).all()

        order_info = list(map(makeTempOrder, list(current_order)))

        device_list = list(map(makeTempDevice, list(devices_from_order)))
        
        print(device_list)
        return Response(json.dumps({"devices" : device_list, "order" : order_info}), mimetype='application/json')

    except exc.IntegrityError as e:
        db.session.rollback()
        return Response(json.dumps({'message' : f'ERROR: Cannot get info for this one order from user. Logged in? Due to ERROR: {e}'}), mimetype='application/json')

@app.route('/api/repair-multi/<current_order_id>/<current_repair_id>', methods=['GET'])
@token_required
def multi_repair_single_device(current_user, current_order_id, current_repair_id):
    """
        Accept order with multiple devices for non-users
    """

    try:
        device = db.session.query(Device).filter(Device.id == current_repair_id, Device.work_order_id == current_order_id).all()

        device_info = list(map(makeTempDevice, list(device)))
        
        return Response(json.dumps({"device" : device_info}), mimetype='application/json')

    except exc.IntegrityError as e:
        db.session.rollback()
        return Response(json.dumps({'message' : f'ERROR: Cannot get info for this one order from user. Logged in? Due to ERROR: {e}'}), mimetype='application/json')
