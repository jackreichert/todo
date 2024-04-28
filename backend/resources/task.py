from uuid import uuid4 as UUID4
from flask import jsonify
from flask.views import MethodView
from flask_smorest import Blueprint

from app import db
from schemas.task import TaskSchema

blp = Blueprint('Task', 'task', url_prefix='/task', description='Task operations')

@blp.route('/<string:list_id>', methods=['GET', 'POST'])
class TaskView(MethodView):
    def get(self, list_id):
        return [task['list_id'] == list_id for task in db.tasks]

    @blp.arguments(TaskSchema)
    def post(self, task_data, list_id):
        if not any(str(list_id) == str(l['id']) for l in db.lists):
            return jsonify('List not found'), 404

        task_data['id'] = str(UUID4())
        task_data['list_id'] = list_id
        db.tasks.append(task_data)
        return db.tasks
