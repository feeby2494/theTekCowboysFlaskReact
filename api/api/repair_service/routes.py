from api import app, db

from flask import Response, request
import json
from .models import Order, Device, OrderAddress, OrderContact
from sqlalchemy import exc

from api.helpers import get_or_create


@app.route('/api/repair-mulit', methods=['POST'])
def multi_repair():

    """
        Accept order with multiple devices for non-users
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
        new_order = Order(contact=contact.id, address=address.id)
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