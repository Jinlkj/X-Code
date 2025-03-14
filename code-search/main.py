import json
import os
import requests
from fastapi import FastAPI
from pydantic import BaseModel
from elasticsearch import Elasticsearch

#  Elasticsearch config
host = "http://9.134.118.234"
port = "9200"
index_name = 'code'

# init a fastapi service
app = FastAPI()

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


@app.get("/test")
def test():
    url = f'{host}:{9200}'
    headers = {'Content-Type': 'application/json'}
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error: {response.text}")
        return None


@app.post("/search")
def search_content(search_request: SearchData):
    url = f'{host}:{port}/code/_search'
    headers = {'Content-Type': 'application/json'}
    search_query = {
        "query": {
            "match": {
                "content": search_request.query
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
        return [{
            "content": item['_source']['content'],
            "file_path": item['_source']['file_name'],
            "license": item['_source']['lic'],
            "stars": item['_source']['stars'],
            "highlight": item['highlight']['content'][0]
        } for item in response.json()['hits']["hits"]]
    else:
        return response.json()
