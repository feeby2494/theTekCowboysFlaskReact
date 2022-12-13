from test.unit.mail_in_service import client
import json

def post_json(client, url, json_dict):
    """Send dictionary json_dict as a json to the specified url """
    mimetype = 'application/json'
    headers = {
        'Content-Type': mimetype,
        'Accept': mimetype
    }

    return client.post(url, data=json_dict, headers=headers) # Do not know if this is passing json or not?

def json_of_response(response):
    """Decode json from response"""
    return json.loads(response.data.decode('utf8'))

test_with_two_repairs_no_user_obj = {
    "delivery_method": "local",
    "collection_date": "2023-02-24",
    "repairs": [
        {
            "brand": "Apple",
            "model": "A1466",
            "serial": "C1MPV0VNG941",
            "issue": "Screen Broke"
        },
        {
            "brand": "Apple",
            "model": "A2179",
            "serial": "C1MPE0VFG941",
            "issue": "Screen Broke"
        }
    ],
    "customer_address": {
        "street_line_one": "513 Grace Ln",
        "street_line_two": "",
        "city": "Coppell",
        "state": "Texas",
        "postal_code": "75019",
        "country": "USA"
    },
    "cutomer_contact": {
        "first_name": "Jamie",
        "last_name": "Lynn",
        "email": "toby2494@hotmail.com",
        "phone": "972-440-9156"
    },
    "public_id": None
}

def test_with_two_repairs_no_user(client):
    # landing = client.get("/api/mail_in_repair")
    # html = landing.data.decode()

    

    response = post_json(client, '/api/work_order', json.dumps(test_with_two_repairs_no_user_obj))
    assert response.status_code == 200
    assert json_of_response(response) == {
        "message": "success",
        "detrack_items": [
                {
                    "sku": "C1MPV0VNG941",
                    "description": "Apple-A1466\nIssue: Screen Broke",
                    "quantity": 1 
                },
                {
                    "sku": "C1MPE0VFG941",
                    "description": "Apple-A2179\nIssue: Screen Broke",
                    "quantity": 1 
                }
            ]
        }

    # # Check that links to `about` and `login` pages exist
    # assert "<a href=\"/about/\">About</a>" in html
    # assert " <a href=\"/home/\">Login</a>" in html

    #             "sku": f"{new_repair.serial}",
    #             "description": f"{new_repair.brand}-{new_repair.model}\nIssue: {new_repair.issue}",
    #             "quantity": 1       


########### Data Structure Flask route should need ###############

        # data["delivery_method"],
        # data["collection_date"],


        # data["repairs"]
        #     repair['brand'],
        #     repair['model'],
        #     repair['serial'],
        #     repair['issue'],
        #     user_id = user_id,
        #     work_order_id = work_order_id
        
        # data['customer_address']
        # data['customer_address']['street_line_one'],
        # data['customer_address']['street_line_two'],
        # data['customer_address']['city'],
        # data['customer_address']['state'],
        # data['customer_address']['postal_code'],
        # data['customer_address']['country'],

        # data['cutomer_contact']['first_name'],
        # data['cutomer_contact']['last_name'],
        # data['cutomer_contact']['email'],
        # data['cutomer_contact']['phone'],
        


################### From Vue front-end on Django version of project ##########

        #         repairs: [{
        #             brand: '',
        #             model: '',
        #             serial: ''
        #         }],
        #         contact: {
        #             firstName: '',
        #             lastName: '',
        #             email: '',
        #             phone: ''
        #         },
        #         address: {
        #             streetOne: '',
        #             streetTwo: '',
        #             city: '',
        #             state: '',
        #             zip: ''
        #         },
        #         deliveryMethodOptions: [
        #             {text: "Local Dallas, Tx Pick-up and Delivery", value:"local"},
        #             {text:"Mail-in: Fedex", value:"fedex"},
        #             {text:"Mail-in: USPS", value:"usps"}
        #         ],
        #         deliveryMethod: "",
        #         collectionDate: "",     