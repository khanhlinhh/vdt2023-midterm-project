import pytest
import mongomock
import sys

CONNECTION_STRING = "mongodb://localhost:27017/"

@pytest.fixture()
def mongo_mock():
    client = mongomock.MongoClient(CONNECTION_STRING)
    db = client.get_database("vdt-test")
    col = db.get_collection("attendees-test")
    emp_data = {
        "name": "Somebody's Name",
        "username": "namesb",
        "yearOfBirth": 2002,
        "sex": "Male",
        "university": "Any university",
        "major": "Not Information Technology"
    }

    col.insert_one(emp_data)
