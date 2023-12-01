from flask import Flask, request
from flask_restful import Api, Resource

app = Flask(__name__)
api = Api(app)

# Dummy data for demonstration
menu_items = {
    1: {'name': 'Spaghetti Bolognese', 'price': 12.99},
    2: {'name': 'Caesar Salad', 'price': 8.99},
}

class Menu(Resource):
    def get(self):
        return menu_items

    def post(self):
        data = request.get_json()
        item_id = max(menu_items.keys()) + 1
        menu_items[item_id] = {'name': data['name'], 'price': data['price']}
        return menu_items[item_id], 201

class MenuItems(Resource):
    def get(self, item_id):
        if item_id in menu_items:
            return menu_items[item_id]
        else:
            return {'error': 'Item not found'}, 404

    def put(self, item_id):
        if item_id in menu_items:
            data = request.get_json()
            menu_items[item_id] = {'name': data['name'], 'price': data['price']}
            return menu_items[item_id]
        else:
            return {'error': 'Item not found'}, 404

    def delete(self, item_id):
        if item_id in menu_items:
            del menu_items[item_id]
            return {'result': 'Item deleted'}
        else:
            return {'error': 'Item not found'}, 404

# Add resources to the API
api.add_resource(Menu, '/menu')
api.add_resource(MenuItems, '/item/<int:item_id>')

if __name__ == '__main__':
    app.run(debug=True)

