from functools import wraps
from flask import jsonify, request
from backend.app import db


def check_list_exists(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        lid = kwargs.get('list_id')
        if not any(str(lid) == str(l['id']) for l in db.lists):
            return jsonify('List not found'), 422

        if 'task_data' not in kwargs and len(args) > 1:
            kwargs['task_data'] = args[1]
            args = args[:1]
        return f(*args, **kwargs)
    return decorated_function
