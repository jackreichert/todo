import re


class TestListCreation:
    UUID_REGEX = r'^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'

    def test_create_list(self, client):
        title = "Test List"
        response = client.post(
            "/list/",
            json={"title": title},
        )
        assert response.status_code == 201
        assert isinstance(response.json, list)
        assert "id" in response.json[0] and re.match(self.UUID_REGEX, response.json[0]["id"])
        assert response.json[0]["title"] == title

    def test_get_list(self, client):
        title = "Another List"
        client.post(
            "/list/",
            json={"title": title},
        )
        response = client.get(
            "/list/"
        )

        assert response.status_code == 200
        assert isinstance(response.json, list)
        assert len(response.json) == 2
        assert "id" in response.json[1] and re.match(self.UUID_REGEX, response.json[1]["id"])
        assert response.json[1]["title"] == title
