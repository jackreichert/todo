import pytest


def test_create_list(client):
    title = "Test List"
    response = client.post(
        "/list/",
        json={"title": title},
    )
    assert response.status_code == 201
    assert isinstance(response.json, list)
    assert "id" in response.json[0]
    assert response.json[0]["title"] == title

    response = client.get(
        "/list/"
    )

    assert response.status_code == 200
    assert isinstance(response.json, list)
    assert len(response.json) == 1
    assert "id" in response.json[0]
    assert response.json[0]["title"] == title
