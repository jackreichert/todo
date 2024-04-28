from marshmallow import Schema, fields

class TaskSchema(Schema):
    id = fields.UUID(dump_only=True)
    title = fields.Str(required=True)
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)
    list_id = fields.UUID(dump_only=True)
    user_id = fields.Int(dump_only=True)
    completed = fields.Bool()
