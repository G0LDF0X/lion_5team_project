from elasticsearch import Elasticsearch
import os

# Ensure the environment variable is set
elastic_password = '1bwSAqBSSorcm3ZyagqJ'
if not elastic_password:
    raise ValueError("ELASTICSEARCH_PASSWORD environment variable not set")

# Path to the http_ca.crt file
ca_cert_path = os.path.join(os.path.dirname(__file__), 'http_ca.crt')

# Initialize Elasticsearch with authentication and CA certificate
es = Elasticsearch(
    ['https://localhost:9200'],
    basic_auth=('elastic', elastic_password),
    ca_certs=ca_cert_path,
    verify_certs=True
)

# Define the index name to delete
index_name = 'items'

# Delete the specific index
if es.indices.exists(index=index_name):
    es.indices.delete(index=index_name)
    print(f"Deleted index {index_name}")
else:
    print(f"Index {index_name} does not exist.")
