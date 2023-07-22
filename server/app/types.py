type_defs = """
     type Query {
         tasks: [Task]
     }
     type Task {
         title: String!
         status: Boolean!
     }
 """

tasks = [
    {"title": "go to the store", "status": False},
    {"title": "buy some cheese", "status": False},
    {"title": "buy some fish", "status": False},
]
