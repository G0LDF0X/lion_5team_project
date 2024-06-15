# import numpy as np
# from transformers import AutoModel, AutoTokenizer
# import torch
# import sys
# import os
# import django
# import logging

# # Setup logging
# logging.basicConfig(level=logging.DEBUG)
# logger = logging.getLogger(__name__)

# sys.path.append(os.path.join(os.path.dirname(__file__), 'be'))
# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

# # Load your data (items)
# django.setup()
# from app.models import Item

# try:
#     items = Item.objects.all()
#     logger.info(f"Loaded {len(items)} items from the database.")
# except Exception as e:
#     logger.error(f"Error loading items from the database: {e}")
#     sys.exit(1)

# # Load a pre-trained model and tokenizer that support Korean
# model_name = "jhgan/ko-sroberta-multitask"
# try:
#     tokenizer = AutoTokenizer.from_pretrained(model_name)
#     model = AutoModel.from_pretrained(model_name)
#     logger.info(f"Loaded model and tokenizer: {model_name}")
# except Exception as e:
#     logger.error(f"Error loading model and tokenizer: {e}")
#     sys.exit(1)

# # Create embeddings for item names and descriptions
# item_texts = [item.name + " " + item.description for item in items]

# def embed_texts(texts):
#     try:
#         logger.debug(f"Tokenizing {len(texts)} texts")
#         inputs = tokenizer(texts, return_tensors='pt', padding=True, truncation=True)
#         logger.debug(f"Tokenization complete, inputs: {inputs.keys()}")
#         with torch.no_grad():
#             embeddings = model(**inputs).last_hidden_state.mean(dim=1)
#         logger.debug(f"Generated embeddings of shape: {embeddings.shape}")
#         return embeddings.numpy()
#     except Exception as e:
#         logger.error(f"Error generating embeddings: {e}")
#         return None

# embeddings = embed_texts(item_texts)
# if embeddings is None:
#     logger.error("Embeddings generation failed.")
#     sys.exit(1)

# # Save embeddings and item IDs to files
# try:
#     np.save('embeddings.npy', embeddings)
#     item_ids = [item.id for item in items]
#     with open('item_ids.npy', 'wb') as f:
#         np.save(f, np.array(item_ids))
#     logger.info("Saved embeddings and item IDs.")
# except Exception as e:
#     logger.error(f"Error saving embeddings and item IDs: {e}")
#     sys.exit(1)
import faiss
import numpy as np
import logging

# Setup logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Load embeddings and item IDs
try:
    embeddings = np.load('embeddings.npy')
    item_ids = np.load('item_ids.npy')
    logger.info(f"Loaded embeddings of shape: {embeddings.shape}")
    logger.info(f"Loaded {len(item_ids)} item IDs.")
except Exception as e:
    logger.error(f"Error loading embeddings or item IDs: {e}")
    sys.exit(1)

# Create FAISS index
try:
    index = faiss.IndexFlatL2(embeddings.shape[1])
    index.add(embeddings)
    logger.info("Created and populated FAISS index.")
    
    # Save the FAISS index
    faiss.write_index(index, 'item_index.faiss')
    logger.info("Saved FAISS index.")
except Exception as e:
    logger.error(f"Error creating FAISS index: {e}")
    sys.exit(1)
