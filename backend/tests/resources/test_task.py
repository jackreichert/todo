import re
from uuid import uuid4 as UUID4


class TestTaskOperations:
    UUID_REGEX = r"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"

    def test_create_task_no_list(self, client):
        title = "Test Task"
        response = client.post(
            f"/list/{UUID4()}/task/",
            json={"title": title},
        )
        assert response.status_code == 422
        assert response.data.decode("utf-8") == '"List not found"\n'

    def test_create_task(self, client):
        response = client.post(
            "/list/",
            json={"title": "Test List"},
        )
        list_id = response.json[0]["id"]

        title = "Test Task"
        response = client.post(
            f"/list/{list_id}/task/",
            json={"title": title},
        )
        assert response.status_code == 201
        assert isinstance(response.json, list)
        assert "id" in response.json[0] and re.match(
            self.UUID_REGEX, response.json[0]["id"]
        )
        assert response.json[0]["title"] == title
        assert response.json[0]["list_id"] == list_id

    def test_get_tasks(self, client):
        list_id = self.get_list_id(client)

        title = "Another Task"
        client.post(
            f"/list/{list_id}/task/",
            json={"title": title},
        )
        response = client.get(f"/list/{list_id}/task/")

        assert response.status_code == 200
        assert isinstance(response.json, list)
        assert len(response.json) == 2
        assert "id" in response.json[1] and re.match(
            self.UUID_REGEX, response.json[1]["id"]
        )
        assert response.json[1]["title"] == title
        assert response.json[1]["list_id"] == list_id

    def test_get_task(self, client):
        list_id = self.get_list_id(client)

        first_task = self.get_first_task(client, list_id)
        response = client.get(f"/list/{list_id}/task/{first_task['id']}")

        assert response.status_code == 200
        assert isinstance(response.json, list)
        assert len(response.json) == 1
        assert isinstance(response.json[0], dict)
        assert "id" in response.json[0] and re.match(
            self.UUID_REGEX, response.json[0]["id"]
        )
        assert response.json[0]["title"] == "Test Task"
        assert response.json[0]["list_id"] == list_id

    def test_update_task(self, client):
        list_id = self.get_list_id(client)

        first_task = self.get_first_task(client, list_id)
        title = "Updated Task"
        response = client.put(
            f"/list/{list_id}/task/{first_task['id']}",
            json={"title": title},
        )

        assert response.status_code == 200
        assert response.json["title"] == title
        assert response.json["list_id"] == list_id

    def test_delete_task(self, client):
        list_id = self.get_list_id(client)

        deleted_task = self.get_first_task(client, list_id)
        response = client.delete(f"/list/{list_id}/task/{deleted_task['id']}")
        assert response.status_code == 204

        response = client.get(f"/list/{list_id}/task/")
        assert response.status_code == 200
        assert deleted_task not in response.json

    @staticmethod
    def get_list_id(client):
        response = client.get("/list/")
        list_id = response.json[0]["id"]
        return list_id

    @staticmethod
    def get_first_task(client, list_id):
        response = client.get(f"/list/{list_id}/task/")
        first_task = response.json[0]
        return first_task
