from typing import List, Dict, Any
from uuid import uuid4 as UUID4
from flask import jsonify, Response
from flask.views import MethodView
from flask_smorest import Blueprint

from backend.app import db
from backend.app.schemas.task import TaskSchema
from backend.app.utils.decorators import check_list_exists

blp = Blueprint('Task', 'task', url_prefix='/list/<string:list_id>/task', description='Task operations')


@blp.route('/', defaults={'task_id': None}, methods=['GET', 'POST'])
@blp.route('/<string:task_id>', methods=['GET', 'POST', 'PUT', 'DELETE'])
class TaskView(MethodView):
    @blp.response(200, TaskSchema(many=True))
    @check_list_exists
    def get(self,  list_id: str, task_id: str) -> List[Dict[str, Any]]:
        if task_id is None:
            return [task for task in db.tasks if task['list_id'] == list_id]
        return filter(lambda task: task['id'] == task_id, db.tasks)

    @blp.arguments(TaskSchema, location="json")
    @blp.response(201, TaskSchema(many=True))
    @check_list_exists
    def post(self, list_id: str, task_data: Dict[str, Any], task_id: str) -> tuple[Response, int] | Any:
        task_data['id'] = str(UUID4())
        task_data['list_id'] = list_id
        db.tasks.append(task_data)
        return db.tasks

    @blp.arguments(TaskSchema, location="json")
    @blp.response(200, TaskSchema)
    @check_list_exists
    def put(self, list_id: str, task_data: Dict[str, Any], task_id: str) -> Dict[str, Any]|None:
        for task in db.tasks:
            if task['id'] == task_id:
                task.update(task_data)  # update only the fields present in task_data
                return task
        return None

    @blp.response(204)
    @check_list_exists
    def delete(self, list_id: str, task_id: str) -> None:
        db.tasks = [task for task in db.tasks if task['id'] != task_id]
        return None
