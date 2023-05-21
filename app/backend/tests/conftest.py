import pytest
import mongomock
import sys
import os, sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import config.database
    # caution: path[0] is reserved for script path (or '' in REPL)

sys.path.insert(1, '/config')

@pytest.fixture()
def mongo_mock(monkeypatch):
    client = mongomock.MongoClient()
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

    # def fake_db():
    #     return db

    # monkeypatch.setattr(config.database, "get_database", fake_db)
