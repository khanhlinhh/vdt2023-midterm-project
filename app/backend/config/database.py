from pymongo import MongoClient
from pymongo.server_api import ServerApi
from dotenv import find_dotenv, load_dotenv

import os

dotenv_path = find_dotenv()
load_dotenv(dotenv_path)

MONGODB_USERNAME = os.getenv("MONGODB_USERNAME")
MONGODB_PASSWORD = os.getenv("MONGODB_PASSWORD")
MONGODB_DATABASE_NAME = os.getenv("MONGODB_DATABASE_NAME")
MONGODB_COLLECTION_NAME = os.getenv("MONGODB_COLLECTION_NAME")

CONNECTION_STRING = "mongodb+srv://" + MONGODB_USERNAME + ":" + MONGODB_PASSWORD + "@vdt-infodata.rop26e4.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(CONNECTION_STRING, server_api=ServerApi('1'))

dbname = client[MONGODB_DATABASE_NAME]
collection_name = dbname[MONGODB_COLLECTION_NAME]