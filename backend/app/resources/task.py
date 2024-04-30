from typing import List, Dict, Any
from uuid import uuid4 as UUID4
from flask import jsonify, Response
from flask.views import MethodView
from flask_smorest import Blueprint

from backend.app import db
from backend.app.schemas.task import TaskSchema

blp = Blueprint('Task', 'task', url_prefix='/task', description='Task operations')


@blp.route('/', defaults={'task_id': None}, methods=['GET', 'POST'])
@blp.route('/<string:task_id>', methods=['GET', 'POST'])
class TaskView(MethodView):
    @blp.response(200, TaskSchema(many=True))
    def get(self, task_id: str) -> List[Dict[str, Any]]:
        return filter(lambda task: task['id'] == task_id, db.tasks)

    @blp.arguments(TaskSchema, location="json")
    @blp.response(201, TaskSchema(many=True))
    def post(self, task_data: Dict[str, Any], task_id: str) -> tuple[Response, int] | Any:
        if not any(str(task_data['list_id']) == str(l['id']) for l in db.lists):
            return jsonify('List not found'), 404

        task_data['id'] = str(UUID4())
        db.tasks.append(task_data)
        return db.tasks
