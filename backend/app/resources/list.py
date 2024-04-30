from typing import List, Dict, Any
from uuid import uuid4 as UUID4
from flask import jsonify, Response
from flask.views import MethodView
from flask_smorest import Blueprint

from backend.app import db
from backend.app.schemas.list import ListSchema
from backend.app.schemas.task import TaskSchema

blp = Blueprint('List', 'list', url_prefix='/list', description='List operations')


@blp.route('/', methods=['GET', 'POST'])
class ListView(MethodView):
    @blp.response(200, ListSchema(many=True))
    def get(self) -> List[Dict[str, Any]]:
        return db.lists

    @blp.arguments(ListSchema)
    @blp.response(201, ListSchema(many=True))
    def post(self, list_data: Dict[str, Any]) -> List[Dict[str, Any]]:
        list_data['id'] = str(UUID4())
        db.lists.append(list_data)
        return db.lists


@blp.route('/<string:list_id>', methods=['GET', 'PUT', 'DELETE'])
class ListDetailView(MethodView):
    @blp.response(200, ListSchema)
    def get(self, list_id: str) -> Dict[str, Any]:
        return next(filter(lambda l: l['id'] == list_id, db.lists))

    @blp.arguments(ListSchema, location="json")
    @blp.response(200, ListSchema)
    def put(self, list_data: Dict[str, Any], list_id: str) -> Dict[str, Any]:
        list_data['id'] = list_id
        db.lists = [list_data if l['id'] == list_id else l for l in db.lists]
        return list_data

    @blp.response(204)
    def delete(self, list_id: str) -> None:
        db.lists = [l for l in db.lists if l['id'] != list_id]
        return None
