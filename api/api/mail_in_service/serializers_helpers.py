from api import app, db
from .models import Mail_In_Repair, Mail_In_Web, Work_Order, Repair, Customer_Contact, Customer_Address
from api.site_user.models import SiteUser
import datetime

from api.automation.send_email import send, generate_then_send

# Helper Methods
def dateSerializer(o):
    if isinstance(o, datetime.datetime):
        return o.__str__()


def get_user_id(data):
   
    try:
        if data['public_id'] is None:
            user_id = 1 # if user is not logged in; make them a generic user in DB
            q = db.session.query(SiteUser).filter_by(public_id=data['repair_user_public_id']).first()
            user_id = q.id
        elif data['public_id'] is not None: # if user is logged in
            q = db.session.query(SiteUser).filter_by(public_id=data['repair_user_public_id']).first()
            user_id = q.id
        elif data['repair_user_public_id'] is not None: # if user is logged in
            print("running user_id ")
            q = db.session.query(SiteUser).filter_by(public_id=data['repair_user_public_id']).first()
            user_id = q.id
        else:
            user_id = 1
            
    except Exception as err:
        print(f"user_id is type: {type(user_id)}\n")
    return int(user_id)

def get_updated_mail_in_repairs(repairs):
    repair_list = {}
    
    # repair["Mail_In_Repair"].id refers to a joined sql query; this is where the "Mail_In_Repair" vs "Site_User" comes from (name of joined tables)
    for repair in repairs:
        repair_list[repair["Mail_In_Repair"].id] = {}
        repair_object = repair_list[repair["Mail_In_Repair"].id]

        # print(list(repair["Mail_In_Repair"]))

        # repair_object = {key: repair["Mail_In_Repair"][key] for key in repair["Mail_In_Repair"]}
        repair_object["id"] = repair["Mail_In_Repair"].id
        repair_object["repair_first_name"] = repair["Mail_In_Repair"].repair_first_name
        repair_object["repair_last_name"] = repair["Mail_In_Repair"].repair_last_name
        repair_object["repair_email"] = repair["Mail_In_Repair"].repair_email
        repair_object["repair_phone"] = repair["Mail_In_Repair"].repair_phone
        repair_object["repair_address_line_one"] = repair["Mail_In_Repair"].repair_address_line_one
        repair_object["repair_address_line_two"] = repair["Mail_In_Repair"].repair_address_line_two
        repair_object["repair_address_city"] = repair["Mail_In_Repair"].repair_address_city
        repair_object["repair_address_state"] = repair["Mail_In_Repair"].repair_address_state
        repair_object["repair_address_postal_code"] = repair["Mail_In_Repair"].repair_address_postal_code
        repair_object["repair_address_country"] = repair["Mail_In_Repair"].repair_address_country
        repair_object["repair_brand"] = repair["Mail_In_Repair"].repair_brand
        repair_object["repair_model"] = repair["Mail_In_Repair"].repair_model
        repair_object["repair_serial"] = repair["Mail_In_Repair"].repair_serial
        repair_object["repair_issue"] = repair["Mail_In_Repair"].repair_issue
        repair_object["repair_date_submitted"] = dateSerializer(repair["Mail_In_Repair"].repair_date_submitted)
        repair_object["repair_completed"] = repair["Mail_In_Repair"].repair_completed
        repair_object["repair_user_id"] = repair["Mail_In_Repair"].repair_user_id
        repair_object["repair_user_public_id"] = repair["SiteUser"].public_id
        repair_object["repair_username"] = repair["SiteUser"].username
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
        db.session.flush()
        new_wo_id = new_wo.id
        db.session.commit()
        return new_wo_id # should be able to access id column by: new_wo.id after commiting
    except Exception as err:
        print(f'Cannot build Work Order due to: {err}\nuser_id: {user_id}')
    
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