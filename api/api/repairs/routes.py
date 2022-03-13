################################################## BRANDS ######################################################

#Get all brands
@app.route('/api/brands', methods=['GET'])
def get_all_brands():
    brands = Brand.query.all()
    object = {}
    for brand in brands:
        object[brand.name] = {}
        object[brand.name]["id"] = brand.id
        object[brand.name]["name"] = brand.name
        object[brand.name]["models"] = brand.models

    return Response(json.dumps(object), mimetype='application/json'), 200

#Get one brand
@app.route('/api/brands/<brand_id>', methods=['GET'])
def get_one_brand(brand_id):
    one_brand = Brand.query.filter_by(id=brand_id).first()
    object = {}
    object[one_brand.name] = {}
    object[one_brand.name]["id"] = one_brand.id
    object[one_brand.name]["name"] = one_brand.name
    object[one_brand.name]["models"] = one_brand.models

    return Response(json.dumps(object), mimetype='application/json'), 200

#Create a new brand
@app.route('/api/brands', methods=['POST'])
def create_brand():
    data = request.get_json()
    new_brand = Brand(name=data["name"])
    db.session.add(new_brand)
    db.session.commit()

    """
        Preform an updated GET after adding new brand
    """

    brands = Brand.query.all()
    object = {}
    for brand in brands:
        object[brand.name] = {}
        object[brand.name]["id"] = brand.id
        object[brand.name]["name"] = brand.name
        object[brand.name]["models"] = brand.models

    return Response(json.dumps(object), mimetype='application/json'), 200

#Modify a brand
@app.route('/api/brands/<brand_id>', methods=['PATCH'])
def modify_brand(brand_id):
    data = request.get_json()
    new_name = data["name"]
    one_brand = Brand.query.filter_by(id=brand_id).first()
    one_brand.name = new_name
    db.session.commit()

    """
        Preform an updated GET after changing brand name
    """

    updated_brand = Brand.query.filter_by(id=brand_id).first()
    object = {}
    object[updated_brand.name] = {}
    object[updated_brand.name]["id"] = updated_brand.id
    object[updated_brand.name]["name"] = updated_brand.name
    object[updated_brand.name]["models"] = updated_brand.models

    return Response(json.dumps(object), mimetype='application/json'), 200

#Delete a brand; WARNING: will not work in SQL DB if it has objects related to it
@app.route('/api/brands/<brand_id>', methods=['DELETE'])
def delete_brand(brand_id):
    data = request.get_json()
    new_name = data["name"]
    one_brand = Brand.query.filter_by(id=brand_id).first()
    db.session.delete(one_brand)
    db.session.commit()

    """
        Preform an updated GET for all remaining brands after deleting pervious one
    """

    brands = Brand.query.all()
    object = {}
    for brand in brands:
        object[brand.name] = {}
        object[brand.name]["id"] = brand.id
        object[brand.name]["name"] = brand.name
        object[brand.name]["models"] = brand.models

    return Response(json.dumps(object), mimetype='application/json'), 200

################################################## MODELS ######################################################

#Get all models for a brand_id
@app.route('/api/models/<brand_id>', methods=['GET'])
def get_all_models(brand_id):
    return ''

#Get one model for a model_id
@app.route('/api/models/<model_id>', methods=['GET'])
def get_one_model(model_id):
    return ''

#Create a new model
@app.route('/api/models', methods=['POST'])
def create_model():
    return ''

#Modify a model
@app.route('/api/models/<model_id>', methods=['PATCH'])
def modify_model(model_id):
    return ''

#Delete a model; WARNING: will not work in SQL DB if it has objects related to it
@app.route('/api/models/<model_id>', methods=['DELETE'])
def delete_model(model_id):
    return ''

################################################## REPAIR AREA #################################################

#Get all repairs for a model_id
@app.route('/api/repairs/<model_id>', methods=['GET'])
def get_all_repairs(model_id):
    return ''

#Get one repair for a repair_id
@app.route('/api/repairs/<repair_id>', methods=['GET'])
def get_one_repair(repair_id):
    return ''

#Create a new repair
@app.route('/api/repairs', methods=['POST'])
def create_repair():
    return ''

#Modify a repair
@app.route('/api/repairs/<repair_id>', methods=['PATCH'])
def modify_repair(repair_id):
    return ''

#Delete a repair; WARNING: will not work in SQL DB if it has objects related to it
@app.route('/api/repairs/<repair_id>', methods=['DELETE'])
def delete_repair(repair_id):
    return ''

################################################## PARTS #######################################################

#Get all parts for a repair_id
@app.route('/api/parts/<repair_id>', methods=['GET'])
def get_all_parts(repair_id):
    return ''

#Get one part for a part_id
@app.route('/api/parts/<part_id>', methods=['GET'])
def get_one_part(part_id):
    return ''

#Create a new part
@app.route('/api/parts', methods=['POST'])
def create_part():
    return ''

#Modify a part
@app.route('/api/parts/<part_id>', methods=['PATCH'])
def modify_part(part_id):
    return ''

#Delete a part; WARNING: will not work in SQL DB if it has objects related to it
@app.route('/api/parts/<part_id>', methods=['DELETE'])
def delete_part(part_id):
    return ''

################################################## LOCATIONS ###################################################

#Get all locations
@app.route('/api/locations', methods=['GET'])
def get_all_locations():
    return ''

#Get one part for a part_id
@app.route('/api/locations/<location_id>', methods=['GET'])
def get_one_location(location_id):
    return ''

#Create a new part
@app.route('/api/locations', methods=['POST'])
def create_location():
    return ''

#Modify a part
@app.route('/api/locations/<location_id>', methods=['PATCH'])
def modify_location(location_id):
    return ''

#Delete a part; WARNING: will not work in SQL DB if it has objects related to it
@app.route('/api/locations/<location_id>', methods=['DELETE'])
def delete_location(location_id):
    return ''

################################################## INVENTORY #####################################################

#Get all inventory
@app.route('/api/inventory', methods=['GET'])
def get_all_stock():
    return ''

#Get all stock for a location
@app.route('/api/inventory/<location_id>', methods=['GET'])
def get_stock_for_one_location(location_id):
    return ''

#Get all stock for a part
@app.route('/api/inventory/<part_id>', methods=['GET'])
def get_stock_for_one_part(part_id):
    return ''

#Get all stock for a repair
@app.route('/api/inventory/<repair_id>', methods=['GET'])
def get_stock_for_one_repair(repair_id):
    return ''

#Create a new stock in a location
@app.route('/api/inventory', methods=['POST'])
def create_stock():
    return ''

#Modify a stock or add if not found; Using PUT instead of PATCH
@app.route('/api/inventory/<inventory_id>', methods=['PUT'])
def modify_stock(inventory_id):
    return ''

#Delete a part; WARNING: will not work in SQL DB if it has objects related to it
@app.route('/api/inventory/<inventory_id>', methods=['DELETE'])
def delete_stock(inventory_id):
    return ''