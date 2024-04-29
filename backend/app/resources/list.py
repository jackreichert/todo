from typing import List, Dict, Any
from uuid import uuid4 as UUID4
from flask.views import MethodView
from flask_smorest import Blueprint

from backend.app import db
from backend.app.schemas.list import ListSchema

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
