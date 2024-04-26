from flask import request
from flask.views import MethodView
from flask_smorest import Blueprint

from app import db

blp = Blueprint('List', 'list', url_prefix='/list', description='List operations')

@blp.route('/', methods=['GET', 'POST'])
class ListView(MethodView):
    def get(self):
        return db.lists

    def post(self):
        list_data = request.get_json()
        db.lists.append(list_data)
        return db.lists
