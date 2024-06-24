# from elasticsearch import Elasticsearch
# import os
# import django
# import numpy as np
# import sys
# from transformers import BertTokenizer, BertModel
# import torch
# from dotenv import load_dotenv
# from django.conf import settings
# load_dotenv()


# # Ensure correct Django setup
# sys.path.append(os.path.join(os.path.dirname(__file__), 'be'))
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
# django.setup()

# from app.models import Item, Category

# # Ensure the environment variable is set
# elastic_password = 'elastic'    

# # Path to the http_ca.crt file
# ca_cert_path = os.path.join(settings.BASE_DIR,'certs','ca.crt')
# print (ca_cert_path)    
# # ELASTIC_PASSWORD = os.getenv('ELASTIC_PASSWORD')    
# es = Elasticsearch(
#     ['https://192.168.64.3:9200'], 
#     basic_auth=('elastic', 'elastic'),
#     verify_certs=True,
#     ca_certs=ca_cert_path,
# )
# # Define the index name
# index_name = 'items'
# from elasticsearch import Elasticsearch
import os
import django
import sys
from dotenv import load_dotenv
from django.conf import settings
from transformers import BertTokenizer, BertModel
import torch

from elasticsearch import Elasticsearch
# from requests_aws4auth import AWS4Auth
# import urllib3
# Load environment variables
load_dotenv('./be/.env')

# Ensure correct Django setup
sys.path.append(os.path.join(os.path.dirname(__file__), 'be'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from app.models import Item, Category

# Ensure the environment variable is set
elastic_password = os.getenv('ELASTIC_PASSWORD', 'petpals')
# urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# Path to the http_ca.crt file
ca_cert_path = os.path.join(settings.BASE_DIR, 'certs', 'elasticsearch.crt')
print (ca_cert_path)

# Debugging information
print(f"CA Certificate Path: {ca_cert_path}")
if not os.path.exists(ca_cert_path):
    print("CA certificate file not found!")
else:
    print("CA certificate file found.")

# Elasticsearch connection setup
try:
    es = Elasticsearch(
        # ['https://192.168.64.3:9200'],
        ['https://127.0.0.1:9200', 'https://localhost:9200'],  # Replace with actual IP address
        basic_auth=('elastic', elastic_password),

        verify_certs=True,
        
        ca_certs=ca_cert_path,
    )
    # Test the connection
    res = es.info()
    print(f"Elasticsearch Info: {res}")
except Exception as e:
    print(f"Error connecting to Elasticsearch: {e}")

# Define the index name
index_name = 'items'


# Define the mapping with a dense_vector field
mapping = {
    "mappings": {
        "properties": {
            "name": {"type": "text"},
            "description": {"type": "text"},
            "category": {"type": "text"},
            "embedding": {"type": "dense_vector", "dims": 768}  # Set the dimensions according to your embedding size
        }
    }
}

# Create the index with the specified mapping if it doesn't exist
if not es.indices.exists(index=index_name):
    es.indices.create(index=index_name, body=mapping)
    print(f"Index {index_name} created.")
else:
    print(f"Index {index_name} already exists.")

# Load the pre-trained model and tokenizer
tokenizer = BertTokenizer.from_pretrained('monologg/kobert')
model = BertModel.from_pretrained('monologg/kobert')

def embed_text(text):
    inputs = tokenizer(text, return_tensors='pt', padding=True, truncation=True)
    with torch.no_grad():
        outputs = model(**inputs)
    embedding = outputs.last_hidden_state.mean(dim=1).cpu().numpy().tolist()[0]
    return embedding

# Function to index item data
def index_items():
    items = Item.objects.all().select_related('category_id')  # Use select_related to optimize category fetching
    for item in items:
        # Generate embedding using the combined name and description
        text_to_embed = item.name + " " + item.description
        embedding = embed_text(text_to_embed)
        document = {
            "name": item.name,
            "description": item.description,
            "category": item.category_id.name,  # Include category name
            "embedding": embedding
        }
        es.index(index=index_name, id=item.id, body=document)
        print(f"Indexed item {item.id}")

# Run the indexing function
index_items()