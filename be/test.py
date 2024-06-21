from elasticsearch import Elasticsearch
import os
certs_path = os.path.join(os.path.dirname(__file__), 'certs')   
es = Elasticsearch(
    ['https://192.168.64.3:9200'],  # Replace with actual IP address
    basic_auth=('elastic', 'elastic'),
    verify_certs=True,
    ca_certs=certs_path + '/http_ca.crt',
)

res = es.info()
print(res)