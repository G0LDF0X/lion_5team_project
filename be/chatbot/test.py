# # # import requests
# # # import json

# # # url = "http://localhost:8001/api/chat/"
# # # payload = {
# # #     "message": "해당 홈페이지에서 판매자로 활동하고 싶다면 어떻게 해야해?"
# # # }
# # # headers = {
# # #     "Content-Type": "application/json; charset=utf-8"
# # # }

# # # response = requests.post(url, data=json.dumps(payload, ensure_ascii=False).encode('utf-8'), headers=headers)

# # # if response.status_code == 200:
# # #     print("Response:", response.json())
# # # else:
# # #     print("Failed to get a response:", response.status_code)
# # # import logging
# # # from transformers import GPT2Tokenizer
# # # import torch

# # # def test_encoding_decoding():
# # #     test_sentence = "해당 홈페이지에서 판매자로 활동하고 싶다면 어떻게 해야해?"
# # #     encoded = tokenizer.encode(test_sentence, return_tensors="pt")
# # #     logger.info(f"Encoded: {encoded}")

# # #     decoded = tokenizer.decode(encoded[0], skip_special_tokens=True)
# # #     logger.info(f"Decoded: {decoded}")

# # #     assert test_sentence == decoded, "Encoding and decoding do not match!"

# # # # Run the test
# # # test_encoding_decoding()
# # import torch
# # import os
# # from transformers import GPT2LMHeadModel, GPT2Tokenizer
# # import logging
# # logger = logging.getLogger(__name__)    
# # current_dir = os.path.dirname(__file__) 
# # model_name = os.path.join('/Users/jung-yechan/code/lion_5team_project/be', "kogpt2_chatbot_model")

# # # Load tokenizer and model
# # tokenizer = GPT2Tokenizer.from_pretrained(model_name)
# # model = GPT2LMHeadModel.from_pretrained(model_name)

# # def generate_response(prompt):
# #     inputs = tokenizer.encode(prompt, return_tensors="pt")
# #     attention_mask = inputs.ne(tokenizer.pad_token_id).long()
    
# #     outputs = model.generate(inputs, attention_mask=attention_mask, max_length=500, num_return_sequences=1, pad_token_id=tokenizer.eos_token_id)
# #     response = tokenizer.decode(outputs[0], skip_special_tokens=True)
# #     return response

# # # Test the model with a Korean sentence
# # test_prompt = "User: 해당 홈페이지에서 판매자로 활동하고 싶다면 어떻게 해야해?\nAI:"
# # response = generate_response(test_prompt)
# # print(f"Response: {response}")

# # def test_encoding_decoding():
# #     test_sentence = "해당 홈페이지에서 판매자로 활동하고 싶다면 어떻게 해야해?"
# #     encoded = tokenizer.encode(test_sentence, return_tensors="pt")
# #     logger.info(f"Encoded: {encoded}")

# #     decoded = tokenizer.decode(encoded[0], skip_special_tokens=True)
# #     logger.info(f"Decoded: {decoded}")

# #     assert test_sentence == decoded, "Encoding and decoding do not match!"

# # # Run the test
# # test_encoding_decoding()
# from transformers import GPT2Tokenizer

# model_name = "skt/kogpt2-base-v2"  # Example of a model trained on Korean text

# # Load tokenizer
# tokenizer = GPT2Tokenizer.from_pretrained(model_name)

# # Check special tokens
# print("Special tokens:", tokenizer.all_special_tokens)
# def test_encoding_decoding():
#     test_sentence = "해당 홈페이지에서 판매자로 활동하고 싶다면 어떻게 해야해?"
#     encoded = tokenizer.encode(test_sentence, return_tensors="pt")
#     print(f"Encoded: {encoded}")

#     decoded = tokenizer.decode(encoded[0], skip_special_tokens=True)
#     print(f"Decoded: {decoded}")

#     assert test_sentence == decoded, "Encoding and decoding do not match!"

# # Run the test
# test_encoding_decoding()
import torch
from transformers import GPT2LMHeadModel, GPT2Tokenizer, GPT2Config
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Specify the model name for a Korean GPT-2 model
model_name = "skt/kogpt2-base-v2"

try:
    # Load tokenizer and model
    tokenizer = GPT2Tokenizer.from_pretrained(model_name)
    model = GPT2LMHeadModel.from_pretrained(model_name)
    logger.info("Model and tokenizer loaded successfully")
except Exception as e:
    logger.error(f"Error loading model: {str(e)}")
    raise

def generate_response(prompt):
    inputs = tokenizer.encode(prompt, return_tensors="pt")
    logger.info(f"Encoded inputs: {inputs}")
    
    attention_mask = inputs.ne(tokenizer.pad_token_id).long()
    outputs = model.generate(inputs, attention_mask=attention_mask, max_length=500, num_return_sequences=1, pad_token_id=tokenizer.eos_token_id)
    logger.info(f"Model outputs: {outputs}")
    
    response = tokenizer.decode(outputs[0], skip_special_tokens=True)
    logger.info(f"Decoded response: {response}")
    return response

def test_encoding_decoding():
    test_sentence = "해당 홈페이지에서 판매자로 활동하고 싶다면 어떻게 해야해?"
    encoded = tokenizer.encode(test_sentence, return_tensors="pt")
    logger.info(f"Encoded: {encoded}")

    decoded = tokenizer.decode(encoded[0], skip_special_tokens=True)
    logger.info(f"Decoded: {decoded}")

    assert test_sentence == decoded, "Encoding and decoding do not match!"

# Run the test
test_encoding_decoding()

# Test the model with a Korean sentence
test_prompt = "User: 해당 홈페이지에서 판매자로 활동하고 싶다면 어떻게 해야해?\nAI:"
response = generate_response(test_prompt)
print(f"Response: {response}")