import datetime

def get_or_create(session, model, **kwargs):
    instance = session.query(model).filter_by(**kwargs).first()
    if instance:
        return instance
    else:
        instance = model(**kwargs)
        session.add(instance)
        session.commit()
        return instance
    
def dateSerializer(o):
    if isinstance(o, datetime.datetime):
        return o.__str__()
    
def makeTempDevice(device):
    temp_device = {}
    temp_device["id"] = device.id
    temp_device["brand"] = device.brand
    temp_device["model"] = device.model
    temp_device["issue"] = device.issue

    return temp_device

def makeTempOrder(order):
    temp_order = {}
    temp_order["id"] = order.id
    temp_order["submitted_date"] = dateSerializer(order.submitted_date)

    return temp_order

def makeTempDevice(device):
    temp_device = {}
    temp_device["id"] = device.id
    temp_device["brand"] = device.brand
    temp_device["model"] = device.model
    temp_device["issue"] = device.issue
    temp_device["serial_number"] = device.serial_number
    temp_device["completed"] = device.completed
    temp_device["finished_by"] = device.finished_by

    return temp_device