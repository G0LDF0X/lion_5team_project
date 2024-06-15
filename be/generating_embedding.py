import numpy as np
from transformers import BertModel, BertTokenizer
import torch
import django
import os
import sys

# Setup Django environment
sys.path.append(os.path.join(os.path.dirname(__file__), 'be'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()
from app.models import Item

# Initialize the model and tokenizer
tokenizer = BertTokenizer.from_pretrained('monologg/kobert')
model = BertModel.from_pretrained('monologg/kobert')

# Load items from the database
items = Item.objects.all()
item_texts = [item.name + " " + item.description for item in items]

# Generate embeddings
def embed_texts(texts):
    inputs = tokenizer(texts, return_tensors='pt', padding=True, truncation=True)
    with torch.no_grad():
        outputs = model(**inputs)
    embeddings = outputs.last_hidden_state.mean(dim=1).cpu().numpy()
    return embeddings

embeddings = embed_texts(item_texts)

# Save embeddings and item IDs
np.save('embeddings.npy', embeddings)
item_ids = [item.id for item in items]
np.save('item_ids.npy', np.array(item_ids))
