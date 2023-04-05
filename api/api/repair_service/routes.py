from api import app, db

from flask import Response, request
import json
from .models import Order, Device, OrderAddress, OrderContact
from sqlalchemy import exc
from api.jwt_token.__token_required__ import token_required
from api.site_user.models import SiteUser
from api.decorators import asyncThread

from api.helpers import get_or_create, dateSerializer, makeTempDevice, makeTempOrder, makeTempDevice, makeTempAddress, makeTempContact

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


        # Test to see if data has empty variables
        if len(data["name"]) < 1 or len(data['email']) < 1:
            raise ValueError("Name or Email is blank")
        if len(data['lineOne']) < 1 or len(data['city']) < 1 or len(data['state']) < 1 or len(data['postalCode']) < 1:
            raise ValueError("Address is not completly filled out")


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
    except ValueError as e:
        return Response(json.dumps({'error' : f'Cannot create new repair. Due to: {e}'}), mimetype='application/json', status=400)
    except exc.IntegrityError as e:
        db.session.rollback()
        return Response(json.dumps({'error' : f'Cannot create new repair. Due to: {e}'}), mimetype='application/json', status=400)
    
@app.route('/api/repair-multi', methods=['GET'])
@token_required
def multi_repair_order_list(current_user):
    """
        Accept order with multiple devices for non-users
    """

    try:
        orders = []

        userOrders = db.session.query(Order).filter(Order.user_id == current_user.id).all()

        for order in list(userOrders):

            temp_order = {}
            temp_order["id"] = order.id
            temp_order["submitted_date"] = dateSerializer(order.submitted_date)
            orders.append(temp_order)

        return Response(json.dumps(orders), mimetype='application/json')
    except exc.IntegrityError as e:
        db.session.rollback()
        return Response(json.dumps({'error' : f'Cannot get all orders from user. Logged in? Due to: {e}'}), mimetype='application/json', status=400)


@app.route('/api/repair-multi/<current_order_id>', methods=['GET'])
@token_required
def multi_repair_single_order(current_user, current_order_id):
    """
        Accept order with multiple devices for non-users
    """

    try:
        # Check for user id to restrict wrong user getting this order
        current_order = db.session.query(Order).filter(Order.user_id == current_user.id, Order.id == current_order_id).all()
        order_info = list(map(makeTempOrder, list(current_order)))

        # This will keep the wrong user from seeing the devices from anther user
        if len(order_info) < 1:
            return Response(json.dumps({"devices" : [], "order" : order_info, "contact" : [], "address" : []}), mimetype='application/json')

        # Get device list on this order
        devices_from_order = db.session.query(Device).filter(Device.work_order_id == current_order_id).all()
        device_list = list(map(makeTempDevice, list(devices_from_order)))

        # Get Contact on this order
        current_contact = db.session.query(OrderContact).filter(
            OrderContact.id == order_info[0]["contact"]
        ).all()
        contact_info = list(map(makeTempContact, list(current_contact)))

        # Get Address on this order
        current_address = db.session.query(OrderAddress).filter(
            OrderAddress.id == order_info[0]["address"]
        ).all()
        address_info = list(map(makeTempAddress, list(current_address)))
        
        return Response(json.dumps({"devices" : device_list, "order" : order_info, "contact" : contact_info, "address" : address_info}), mimetype='application/json')

    except exc.IntegrityError as e:
        db.session.rollback()
        return Response(json.dumps({'error' : f'Cannot get info for this one order from user. Logged in? Due to: {e}'}), mimetype='application/json', status=400)

@app.route('/api/repair-multi/<current_order_id>/<current_repair_id>', methods=['GET'])
@token_required
def multi_repair_single_device(current_user, current_order_id, current_repair_id):
    """
        Accept order with multiple devices for non-users
    """

    try:
        # Checking if this current order belongs to current user first:
        # Check for user id to restrict wrong user getting this order
        current_order = db.session.query(Order).filter(Order.user_id == current_user.id, Order.id == current_order_id).all()
        order_info = list(map(makeTempOrder, list(current_order)))

        # This will keep the wrong user from seeing the devices from anther user
        if len(order_info) < 1:
            return Response(json.dumps({"device" : []}), mimetype='application/json')

        device = db.session.query(Device).filter(Device.id == current_repair_id, Device.work_order_id == current_order_id).all()

        device_info = list(map(makeTempDevice, list(device)))
        
        return Response(json.dumps({"device" : device_info}), mimetype='application/json')

    except exc.IntegrityError as e:
        db.session.rollback()
        return Response(json.dumps({'error' : f'Cannot get info for this one order from user. Logged in? Due to: {e}'}), mimetype='application/json', status=400)
