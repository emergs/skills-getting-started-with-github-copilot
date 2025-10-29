from fastapi.testclient import TestClient
from main import app  # Ajuste o import conforme a estrutura do seu projeto

client = TestClient(app)

def test_add_participant():
    response = client.post("/participants", json={"name": "Test Participant", "activity_id": 1})
    assert response.status_code == 200
    assert response.json() == {"message": "Participante registrado com sucesso!"}  # Ajuste conforme a resposta esperada

def test_update_participants_list():
    response = client.get("/activities/1/participants")
    assert response.status_code == 200
    assert isinstance(response.json(), list)  # Verifica se a resposta é uma lista
