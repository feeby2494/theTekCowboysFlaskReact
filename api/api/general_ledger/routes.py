from api import app, db
from api.jwt_token.__token_required__ import token_required
from flask import request, Response, redirect, url_for
import json
from .models import Ledger_line_item
from api.user.models import User
from sqlalchemy import exc
from api.jwt_token.__token_required__ import token_required
import datetime

def dateSerializer(o):
    if isinstance(o, datetime.datetime):
        return o.__str__()


@app.route('/api/general_ledger_all', methods=['GET'])
@token_required
def general_ledger():

    if request.method == "GET":

        ledger_lines = db.session.query(Ledger_line_item).all()

        for line in ledger_lines:
            print(line.id)

        ledger_line_obj = {}

        for line in ledger_lines:
            ledger_line_obj[line.id] = {}
            ledger_line_obj[line.id]["desc"] = line.desc
            ledger_line_obj[line.id]["part_number"] = line.part_number
            ledger_line_obj[line.id]["type"] = line.type
            ledger_line_obj[line.id]["expense"] = line.expense
            ledger_line_obj[line.id]["revenue"] = line.revenue
            ledger_line_obj[line.id]["profit"] = line.profit
            ledger_line_obj[line.id]["price"] = line.price
            ledger_line_obj[line.id]["qty_sold_per_listing"] = line.qty_sold_per_listing
            ledger_line_obj[line.id]["ebay_order_number"] = line.ebay_order_number
            ledger_line_obj[line.id]["amazon_order_number"] = line.amazon_order_number
            ledger_line_obj[line.id]["ebay_fees"] = line.ebay_fees
            ledger_line_obj[line.id]["shipping"] = line.shipping
            ledger_line_obj[line.id]["taxes"] = line.taxes
            ledger_line_obj[line.id]["extra_fees"] = line.extra_fees
            ledger_line_obj[line.id]["part_expenses"] = line.part_expenses
            ledger_line_obj[line.id]["seller"] = line.seller
            ledger_line_obj[line.id]["created_by"] = line.created_by
            ledger_line_obj[line.id]["date"] = dateSerializer(line.date)
            

        print(ledger_line_obj)

        return Response(json.dumps(ledger_line_obj), mimetype='application/json')
    
 
@app.route('/api/general_ledger_one', methods=['GET', 'POST', 'PUT', 'DELETE'])
@token_required
def general_ledger_crud(current_user):

    if request.method == "GET":

        # ledger_items = ledger_line_item.get_all_items( ledger_line_item)

        ledger_lines = db.session.query(Ledger_line_item).all()

        for line in ledger_lines:
            print(line.id)

        ledger_line_obj = {}

        for line in ledger_lines:
            ledger_line_obj[line.id] = {}
            ledger_line_obj[line.id]["desc"] = line.desc
            ledger_line_obj[line.id]["part_number"] = line.part_number
            ledger_line_obj[line.id]["type"] = line.type
            ledger_line_obj[line.id]["expense"] = line.expense
            ledger_line_obj[line.id]["revenue"] = line.revenue
            ledger_line_obj[line.id]["profit"] = line.profit
            ledger_line_obj[line.id]["price"] = line.price
            ledger_line_obj[line.id]["qty_sold_per_listing"] = line.qty_sold_per_listing
            ledger_line_obj[line.id]["ebay_order_number"] = line.ebay_order_number
            ledger_line_obj[line.id]["amazon_order_number"] = line.amazon_order_number
            ledger_line_obj[line.id]["ebay_fees"] = line.ebay_fees
            ledger_line_obj[line.id]["shipping"] = line.shipping
            ledger_line_obj[line.id]["taxes"] = line.taxes
            ledger_line_obj[line.id]["extra_fees"] = line.extra_fees
            ledger_line_obj[line.id]["part_expenses"] = line.part_expenses
            ledger_line_obj[line.id]["seller"] = line.seller
            ledger_line_obj[line.id]["created_by"] = line.created_by
            ledger_line_obj[line.id]["date"] = dateSerializer(line.date)
            

        print(ledger_line_obj)

        return Response(json.dumps(ledger_line_obj), mimetype='application/json')

    if request.method == "POST":

        user_id = User.query.filter_by(public_id=current_user.public_id).first().id 
        data = request.get_json(force=True)
        print(data)
        new_desc = data['desc']

        try:
            new_line_item = Ledger_line_item(
                desc=data['desc'], 
                part_number=data['part_number'], 
                type=data['type'], 
                expense=data['expense'], 
                revenue=data['revenue'], 
                profit=data['profit'], 
                price=data['price'],
                qty_sold_per_listing=data['qty_sold_per_listing'],
                ebay_order_number=data['ebay_order_number'],
                amazon_order_number=data['amazon_order_number'],
                ebay_fees=data['ebay_fees'],
                shipping=data['shipping'],
                taxes=data['taxes'],
                extra_fees=data['extra_fees'],
                part_expenses=data['part_expenses'],
                seller=data['seller'],
                created_by=user_id)
            db.session.add(new_line_item)
            db.session.commit()

            # Get updated query for all general ledger items
            ledger_lines = db.session.query(Ledger_line_item).all()

            ledger_line_obj = {}

            for line in ledger_lines:
                ledger_line_obj[line.id] = {}
                ledger_line_obj[line.id]["desc"] = line.desc
                ledger_line_obj[line.id]["part_number"] = line.part_number
                ledger_line_obj[line.id]["type"] = line.type
                ledger_line_obj[line.id]["expense"] = line.expense
                ledger_line_obj[line.id]["revenue"] = line.revenue
                ledger_line_obj[line.id]["profit"] = line.profit
                ledger_line_obj[line.id]["price"] = line.price
                ledger_line_obj[line.id]["qty_sold_per_listing"] = line.qty_sold_per_listing
                ledger_line_obj[line.id]["ebay_order_number"] = line.ebay_order_number
                ledger_line_obj[line.id]["amazon_order_number"] = line.amazon_order_number
                ledger_line_obj[line.id]["ebay_fees"] = line.ebay_fees
                ledger_line_obj[line.id]["shipping"] = line.shipping
                ledger_line_obj[line.id]["taxes"] = line.taxes
                ledger_line_obj[line.id]["extra_fees"] = line.extra_fees
                ledger_line_obj[line.id]["part_expenses"] = line.part_expenses
                ledger_line_obj[line.id]["seller"] = line.seller
                ledger_line_obj[line.id]["created_by"] = line.created_by
                ledger_line_obj[line.id]["date"] = dateSerializer(line.date)
                

            print(ledger_line_obj)

            return Response(json.dumps(ledger_line_obj), mimetype='application/json')
        except exc.IntegrityError as e:
            db.session.rollback()
            return Response(json.dumps({'message' : f'ERROR: Cannot create new line: {new_desc}. Due to ERROR: {e}'}), mimetype='application/json')

        

    if request.method == "PUT":

        return Response(json.dumps({"message": "hi"}), mimetype='application/json')

    if request.method == "DELETE":

        return Response(json.dumps({"message": "hi"}), mimetype='application/json')
 