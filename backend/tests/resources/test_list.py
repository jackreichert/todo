import re


class TestListOperations:
    UUID_REGEX = r"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"

    def test_get_default_list(self, client):
        response = client.get("/list/")

        assert response.status_code == 200
        assert isinstance(response.json, list)
        assert response.json[0]["title"] == "default list"

    def test_create_list(self, client):
        title = "Test List"
        response = client.post(
            "/list/",
            json={"title": title},
        )
        assert response.status_code == 201
        assert isinstance(response.json, list)
        assert "id" in response.json[-1] and re.match(
            self.UUID_REGEX, response.json[-1]["id"]
        )
        assert response.json[-1]["title"] == title

    def test_get_lists(self, client):
        title = "Another List"
        client.post(
            "/list/",
            json={"title": title},
        )
        response = client.get("/list/")

        assert response.status_code == 200
        assert isinstance(response.json, list)
        assert len(response.json) > 1
        assert response.json[-1]["title"] == title

    def test_get_list(self, client):
        response = client.get("/list/")
        list_id = response.json[0]["id"]
        response = client.get(f"/list/{list_id}")

        assert response.status_code == 200
        assert isinstance(response.json, dict)
        assert "id" in response.json and re.match(self.UUID_REGEX, response.json["id"])
        assert response.json["title"] == "default list"

    def test_update_list(self, client):
        title = "Updated List"
        response = client.get("/list/")
        list_id = response.json[0]["id"]
        response = client.put(
            f"/list/{list_id}",
            json={"title": title},
        )

        assert response.status_code == 200
        assert isinstance(response.json, dict)
        assert "id" in response.json and re.match(self.UUID_REGEX, response.json["id"])
        assert response.json["title"] == title

    def test_delete_list(self, client):
        response = client.get("/list/")
        list_len = len(response.json)
        list_id = response.json[0]["id"]
        response = client.delete(f"/list/{list_id}")
        assert response.status_code == 204

        response = client.get("/list/")
        assert response.status_code == 200
        assert len(response.json) < list_len
