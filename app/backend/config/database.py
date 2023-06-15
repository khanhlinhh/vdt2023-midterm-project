from pymongo import MongoClient
import os
    
MONGODB_HOST = os.environ.get("MONGODB_HOST")
MONGODB_USERNAME = os.environ.get("MONGODB_USERNAME")
MONGODB_PASSWORD = os.environ.get("MONGODB_PASSWORD")
MONGODB_DATABASE = os.environ.get("MONGODB_DATABASE")

# CONNECTION_STRING = "mongodb://" + MONGODB_USERNAME + ":" + MONGODB_PASSWORD + "@mongo:27017/"

def get_database(name):
    client = MongoClient(host=MONGODB_HOST, port=27017, username=MONGODB_USERNAME, password=MONGODB_PASSWORD, authSource='admin')
    return client[name]

dbname = get_database(MONGODB_DATABASE)
collection_name = dbname['attendees']