from fastapi import APIRouter
from models.attendee_model import Attendee
from config.database import collection_name
from schemas.attendee_schema import serializeList, serializeDict
from bson import ObjectId

attendee_API = APIRouter()

# Get attendees list
@attendee_API.get("/")
async def get_attendee_list():
    attendee = serializeList(collection_name.find({},{'_id': False}))
    return attendee

# Get attendee info with username
@attendee_API.get("/{id}")
async def get_attendee(username: str):
    return serializeDict(collection_name.find_one({"username": username}, {'_id': False}))


# Add attendee
@attendee_API.post("/")
async def add_attendee(attendee: Attendee):
    _id = collection_name.insert_one(dict(attendee))
    return serializeList(collection_name.find({"_id": _id.inserted_id}, {'_id': False}))


# Edit attendee's info
@attendee_API.put("/{id}")
async def update_attendee(id: str, attendee: Attendee):
    collection_name.find_one_and_update({"_id": ObjectId(id)}, {
        "$set": dict(attendee)
    })
    return serializeDict(collection_name.find({"_id": ObjectId(id)}))

# Delete attendee
@attendee_API.delete("/{id}")
async def delete_attendee(id: str):
    collection_name.find_one_and_delete({"_id": ObjectId(id)})
    return {"status": "ok"}