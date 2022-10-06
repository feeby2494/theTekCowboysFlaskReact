from api.api import app, db
from flask import request, Response, redirect, url_for
import json
from .models import Element, Point
from sqlalchemy import exc
from api.api.jwt_token.__token_required__ import token_required
import datetime


@app.route('/api/points', methods=['GET', 'POST'])
def get_all_points():

    # Have to get all categories First
    points_for_lang = db.session.query(Point).all()
    categories = []
    for point in points_for_lang:
        # add to our list of chapters/categories for each point
        categories.append(point.chapter)

    # Trying to convert categories list to set, to get rid of duplicates, then convert back to list
    categories = set([x for x in categories])
    categories = list(categories)

    if request.method == 'POST':
        data = request.get_json()
        filter_category = data['filter_category']
        filter_language = data['filter_language']

        # Basically same as the GET method, no filtering
        if filter_category == 'all' and filter_language == 'all':
            # Already have the query for points_for_lang
            pass

        # only filter by language
        if filter_category == 'all' and filter_language != 'all':
            points_for_lang = db.session.query(Point).filter_by(language=filter_language).all()

        # only filter by category
        if filter_language == 'all' and filter_category != 'all':
            points_for_lang = db.session.query(Point).filter_by(chapter=filter_category).all()

        # if both are not set to 'all', then query with both filters
        if filter_language != 'all' and filter_category != 'all':
            points_for_lang = db.session.query(Point).filter_by(chapter=filter_category, language=filter_language).all()

    # Remember we already defined points_for_lang inorder to get all the categories, so we just reuse it here
    # This will pass on to the rest of the code to make a request object and takes care of the 'GET' and 'POST'
    # with both filters set to 'all'
    if request.method == 'GET':
        """
            This route will get all the points for a certain language.
        """

        # Already have the query for points_for_lang
        pass

    # What I want is to get a string with ";" as the delimiter and use python to
    # split up into multiple elements, so we can store multiple elements in one column inside one SQL Table
    # point_elements_array = points_for_lang.elements.split(';')


    points_object = {}
    for point in points_for_lang:
        points_object[point.title] = {}
        points_object[point.title]["id"] = point.id
        points_object[point.title]["explanation"] = point.explanation
        points_object[point.title]["title"] = point.title
        points_object[point.title]["elements"] = []
        # There's some way to access the element_list for each point, but forgot how to do it
        # for element in point['element_list']:
        #     points_object[point.title]["elements"].append({
        #         id: element.id,
        #         text: element.text,
        #         type: element.type
        #     })
        elements_for_this = db.session.query(Element).filter_by(point_id=point.id).all()
        for element in elements_for_this:
            points_object[point.title]["elements"].append({
                "id": element.id,
                "text": element.text,
                "type": element.type
            })
        points_object[point.title]["language"] = point.language
        points_object[point.title]["chapter"] = point.chapter


    languages = ["japanese", "Korean"]

    return Response(json.dumps([points_object, categories, languages]), mimetype='application/json')


@app.route('/api/points_by_language', methods=['GET'])
def get_all_points_by_language(language):

    """
        This route will get all the points for a certain language.
    """

    points_for_lang = db.session.query(Point).filter_by(language=language).all()

    # What I want is to get a string with ";" as the delimiter and use python to
    # split up into multiple elements, so we can store multiple elements in one column inside one SQL Table
    # point_elements_array = points_for_lang.elements.split(';')



    points_object = {}
    for point in points_for_lang:
        points_object[point.title] = {}
        points_object[point.title]["id"] = point.id
        points_object[point.title]["explanation"] = point.explanation
        points_object[point.title]["title"] = point.title
        points_object[point.title]["elements"] = []
        for element in point['element_list']:
            points_object[point.title]["elements"].append({
                "id": element.id,
                "text": element.text,
                "type": element.type
            })
        points_object[point.title]["language"] = point.language
        points_object[point.title]["chapter"] = point.chapter

    return Response(json.dumps(points_object), mimetype='application/json')

@app.route('/api/points_by_chapter', methods=['GET'])
def get_all_points_by_chapter(language, chapter):

    """
        This route will get all the points for a certain language and chapter.
    """

    points_for_lang = db.session.query(Point).filter_by(language=language, chapter=chapter).all()

    # What I want is to get a string with ";" as the delimiter and use python to
    # split up into multiple elements, so we can store multiple elements in one column inside one SQL Table
    # point_elements_array = points_for_lang.elements.split(';')

    points_object = {}
    for point in points_for_lang:
        points_object[point.title] = {}
        points_object[point.title]["id"] = point.id
        points_object[point.title]["explanation"] = point.explanation
        points_object[point.title]["title"] = point.title
        points_object[point.title]["elements"] = []
        for element in point['element_list']:
            points_object[point.title]["elements"].append({
                "id": element.id,
                "text": element.text,
                "type": element.type
            })
        points_object[point.title]["language"] = point.language
        points_object[point.title]["chapter"] = point.chapter

    return Response(json.dumps(points_object), mimetype='application/json')

@app.route('/api/points/<point_id>', methods=['GET'])
def get_one_point(point_id):

    """
        This route will get only one specific point by point_id.
    """

    point = db.session.query(Point).filter_by(id=point_id).first()

    # What I want is to get a string with ";" as the delimiter and use python to
    # split up into multiple elements, so we can store multiple elements in one column inside one SQL Table
    # point_elements_array = points_for_lang.elements.split(';')


    # no loop here since we only get the first point from DB
    points_object = {}

    points_object[point.title] = {}
    points_object[point.title]["id"] = point.id
    points_object[point.title]["explanation"] = point.explanation
    points_object[point.title]["title"] = point.title
    points_object[point.title]["element_list"] = []
    for element in point['element_list']:
        points_object[point.title]["elements"].append({
            "id": element.id,
            "text": element.text,
            "type": element.type
        })
    points_object[point.title]["language"] = point.language
    points_object[point.title]["chapter"] = point.chapter

    return Response(json.dumps(points_object), mimetype='application/json')

@app.route('/api/post_points', methods=['POST'])
@token_required
def create_point(current_user):

    """
        Create a new point, must be logged in as Admin user
    """

    # Check if user is Admin first:
    # if not current_user.admin:
    #     return Response(json.dumps({'message' : 'Cannot perform this action. You are not an Admin'}), mimetype='application/json')
    #
    # print(current_user)

    data = request.get_json()
    # elements_array = ";".join(data["elements"])
    date_created = datetime.date.today()

    try:
        new_point = Point(explanation=data['explanation'], title=data['title'], language=data['language'], chapter=data['chapter'], created_by=current_user.id, date_created=date_created)
        # , author=user_id, date_created=date_created)
        db.session.add(new_point)
        # Maybe better to do this after in another try, so I can make sure the point
        # is made first and to catch errors relating to either point creation or element creation
        db.session.commit()

    except exc.IntegrityError as e:
        db.session.rollback()
        return Response(json.dumps({'message' : f"ERROR: Cannot create point: {data['title']}. Due to ERROR: {e}"}), mimetype='application/json')
    try:
        for element in data['elements'].split(";"):
            new_element = Element(point_id=new_point.id, text=element, type="p")
            db.session.add(new_element)
            db.session.commit()
        print(f"New point, {data['title']}, created by: {current_user.username} at {date_created}")
        return redirect(url_for('get_all_points'))
        #return Response(json.dumps({'message' : f"New point, {data['title']}, created by: {current_user.username} at {date_created}"}), mimetype='application/json')
    except exc.IntegrityError as e:
        db.session.rollback()
        return Response(json.dumps({'message' : f"ERROR: Cannot create elements for: {data['title']}. Due to ERROR: {e}"}), mimetype='application/json')

@app.route('/api/points/<point_id>', methods=['PATCH'])
@token_required
def complete_point(current_user, point_id):

    """
        Edit specific Point.
    """

    # Check is user is Admin first:
    # if not current_user.admin:
    #     return Response(json.dumps({'message' : 'Cannot perform this action. You are not an Admin'}), mimetype='application/json')

    specific_point = db.session.query(Point).filter_by(id=point_id).first()

    # user_object = User.query.filter_by(public_id=current_user.public_id).first()
    # last_edited_by = user_object.id
    data = request.get_json()
    date_modified = datetime.date.today()



    try:
        # Actual update of point:
        specific_point.explanation = data['explanation']
        specific_point.title = data['title']
        specific_point.language = data['language']
        specific_point.chapter = data['chapter']
        # point_to_mod.last_edited_by = last_edited_by
        # point_to_mod.last_modified = date_modified
        db.session.commit()

    except exc.IntegrityError as e:
        db.session.rollback()
        return Response(json.dumps({'message' : f"ERROR: Cannot modify: {data['title']}. Due to ERROR: {e}"}), mimetype='application/json')

    # Need to take care of the new elements:
    elements_for_point = db.session.query(Element).filter_by(point_id=point_id).all()

    old_elements = []

    for element in elements_for_point:

        old_elements.append({"id": element.id, "type": element.type, "text": element.text})

    try:
        elements_for_point.clear()
        elements_for_point = data['element_list']
        #First add new stuff
        # for element in data['element_list']:
        #     elements_for_point.append(element)
        # #remove the old stuff
        # for item in elements_for_point:
        #     if item not in data['element_list']:
        #         elements_for_point.remove(item)

        db.session.commit()

    except exc.IntegrityError as e:
        db.session.rollback()
        return Response(json.dumps({'message' : f"ERROR: Cannot modify new Elements for: {data['title']}. Due to ERROR: {e}"}), mimetype='application/json')


    """
        Preform an updated GET after modifing Point:
        (Will make this into a function later on)
    """

    updated_point = db.session.query(Point).filter_by(id=point_id).first()
    updated_elements = db.session.query(Element).filter_by(point_id=point_id).all()

    # What I want is to get a string with ";" as the delimiter and use python to
    # split up into multiple elements, so we can store multiple elements in one column inside one SQL Table
    # point_elements_array = points_for_lang.elements.split(';')


    # no loop here since we only get the first point from DB
    points_object = {}

    points_object[updated_point.title] = {}
    points_object[updated_point.title]["id"] = updated_point.id
    points_object[updated_point.title]["explanation"] = updated_point.explanation
    points_object[updated_point.title]["title"] = updated_point.title
    points_object[updated_point.title]["element_list"] = []
    for element in updated_elements:
        points_object[updated_point.title]["element_list"].append({
            "id": element.id,
            "text": element.text,
            "type": element.type
        })
    points_object[updated_point.title]["language"] = updated_point.language
    points_object[updated_point.title]["chapter"] = updated_point.chapter

    return Response(json.dumps(points_object), mimetype='application/json')

@app.route('/api/points/<point_id>', methods=['DELETE'])
@token_required
def delete_point(current_user, point_id):

    """
        Delete specific Point.
    """

    # Check is user is Admin first:
    # if not current_user.admin:
    #     return Response(json.dumps({'message' : 'Cannot perform this action. You are not an Admin'}), mimetype='application/json')

    # Delete all elements first:
    element_for_this_point = db.session.query(Element).filter_by(point_id=point_id).all()
    if element_for_this_point is not None:
        for el in element_for_this_point:
            db.session.delete(el)
        # db.session.commit()

    specific_point = db.session.query(Point).filter_by(id=point_id).first()

    try:
        db.session.delete(specific_point)
        db.session.commit()
    except exc.IntegrityError as e:
        db.session.rollback()
        return Response(json.dumps({'message' : f"ERROR: Cannot modify new Elements for: {specific_point['title']}. Due to ERROR: {e}"}), mimetype='application/json')


    # update list of elements
    print(f'{specific_point.title} is deleted.')
    # return redirect(url_for('get_all_points'))

    # Could not get redirect to work, resulted in HTTP Method not Allowed Error, so just copy and pasted from this route to get update list of points.

    points_for_lang = db.session.query(Point).all()

    # What I want is to get a string with ";" as the delimiter and use python to
    # split up into multiple elements, so we can store multiple elements in one column inside one SQL Table
    # point_elements_array = points_for_lang.elements.split(';')



    points_object = {}
    for point in points_for_lang:
        points_object[point.title] = {}
        points_object[point.title]["id"] = point.id
        points_object[point.title]["explanation"] = point.explanation
        points_object[point.title]["title"] = point.title
        points_object[point.title]["elements"] = []
        # There's some way to access the element_list for each point, but forgot how to do it
        # for element in point['element_list']:
        #     points_object[point.title]["elements"].append({
        #         id: element.id,
        #         text: element.text,
        #         type: element.type
        #     })
        elements_for_this = db.session.query(Element).filter_by(point_id=point.id).all()
        for element in elements_for_this:
            points_object[point.title]["elements"].append({
                "id": element.id,
                "text": element.text,
                "type": element.type
            })
        points_object[point.title]["language"] = point.language
        points_object[point.title]["chapter"] = point.chapter

    return Response(json.dumps(points_object), mimetype='application/json')

    #return Response(json.dumps({'message' : f'{specific_point.title} is deleted.'}), mimetype='application/json')
