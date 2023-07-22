from ariadne import QueryType, graphql_sync, make_executable_schema
from ariadne.explorer import ExplorerGraphiQL
from flask import Flask, jsonify, request
from flask_cors import CORS
import json


from .types import *

query = QueryType()


@query.field("tasks")
def resolve_hello(_, info):
    return tasks


schema = make_executable_schema(type_defs, query)

app = Flask(__name__)
CORS(app)
explorer_html = ExplorerGraphiQL().html(None)


@app.route("/graphql", methods=["GET"])
def graphql_explorer():
    return explorer_html, 200


@app.route("/graphql", methods=["POST"])
def graphql_server():
    data = request.get_json()

    success, result = graphql_sync(
        schema,
        data,
        context_value={"request": request},
    )

    status_code = 200 if success else 400
    return jsonify(result), status_code


application = app
