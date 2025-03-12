from fastapi import FastAPI
from pydantic import BaseModel
from elasticsearch import Elasticsearch

#  Elasticsearch config
host = ''
port = ''
index_name = 'code'

# init a fastapi service
app = FastAPI()

#  init a es service
es = Elasticsearch([{'host':host,'port':port}])

#  define post struct
class SearchData(BaseModel):
    query:str

@app.post("/search/")
def read_root(data:SearchData)->str:
    # TODO:
    return {
        "query": data.query,
        "search_res": "",
    }

