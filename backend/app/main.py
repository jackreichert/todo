import logging
import os

from flask import Flask, jsonify
from flask_cors import CORS
from flask_smorest import Api
from backend.app.resources.list import blp as ListBlueprint
from backend.app.resources.task import blp as TaskBlueprint

def create_app(db_url=None):
    app = Flask(__name__)
    CORS(app)
    logging.basicConfig(filename='app.log', level=logging.DEBUG)

    app.debug = os.getenv('FLASK_DEBUG', "False").lower() == "true"
    app.config["API_TITLE"] = "Permits REST API"
    app.config["API_VERSION"] = "v1"
    app.config["OPENAPI_VERSION"] = "3.0.3"
    app.config["OPENAPI_URL_PREFIX"] = "/"
    app.config["OPENAPI_SWAGGER_UI_PATH"] = "/swagger-ui"
    app.config["OPENAPI_SWAGGER_UI_URL"] = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"

    api = Api(app)
    api.register_blueprint(ListBlueprint)
    api.register_blueprint(TaskBlueprint)

    @app.route('/ping', methods=['GET'])
    def ping():
        return jsonify('pong'), 200

    return app


application = create_app()
