from typing import List, Dict, Any
from uuid import uuid4 as UUID4
from flask import jsonify, Response
from flask.views import MethodView
from flask_smorest import Blueprint

from backend.app import db
from backend.app.schemas.task import TaskSchema

blp = Blueprint('Task', 'task', url_prefix='/task', description='Task operations')

@blp.route('/<string:list_id>', methods=['GET', 'POST'])
class TaskView(MethodView):
    @blp.response(200, TaskSchema(many=True))
    def get(self, list_id: str) -> List[Dict[str, Any]]:
        return [task for task in db.tasks if task['list_id'] == list_id]

    @blp.arguments(TaskSchema, location="json")
    @blp.response(201, TaskSchema(many=True))
    def post(self, task_data: Dict[str, Any], list_id: str) -> tuple[Response, int] | Any:
        if not any(str(list_id) == str(l['id']) for l in db.lists):
            return jsonify('List not found'), 404

        task_data['id'] = str(UUID4())
        task_data['list_id'] = list_id
        db.tasks.append(task_data)
        return db.tasks
