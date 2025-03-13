import json
import os
from pprint import pprint

import requests
from fastapi import FastAPI
from pydantic import BaseModel
from elasticsearch import Elasticsearch

#  Elasticsearch config
host = os.getenv('ES_HOST')
port = os.getenv('ES_PORT')
index_name = 'code'

# init a fastapi service
# app = FastAPI()

#  init a es service
es_client = Elasticsearch(f"{host}:{port}")


#  define post struct
class SearchData(BaseModel):
    query: str

# @app.post("/search/")
# def read_root(data: SearchData) -> json:
#     # TODO:
#     es_client.search(index=index_name, data=data.json())
#     return {
#         "query": data.query,
#         "search_res": "",
#     }


def search_content(index, query):
    url = f'{os.getenv("ES_HOST")}:{os.getenv("ES_PORT")}/{index}/_search'
    headers = {'Content-Type': 'application/json'}
    search_query = {
        "query": {
            "match": {
                "content": query
            }
        },
        "highlight": {
            "fields": {
                "content": {}
            }
        }
    }
    response = requests.get(url, headers=headers, data=json.dumps(search_query))
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error: {response.text}")
        return None

if __name__ == '__main__':
    res = search_content(index_name, 'for i:= range()')
    print(res["hits"]["hits"][0]["_source"]["content"])
