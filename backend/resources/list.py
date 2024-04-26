from flask import request
from flask.views import MethodView
from flask_smorest import Blueprint

from app import db
from schemas.list import ListSchema

blp = Blueprint('List', 'list', url_prefix='/list', description='List operations')

@blp.route('/', methods=['GET', 'POST'])
class ListView(MethodView):
    def get(self):
        return db.lists

    @blp.arguments(ListSchema)
    def post(self, list_data):
        db.lists.append(list_data)
        return db.lists
