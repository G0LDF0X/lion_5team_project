from datasets import load_dataset
from transformers import BertTokenizer
from transformers import BertForMaskedLM, Trainer, TrainingArguments

dataset = load_dataset('text', data_files={'train': '.txt', 'validation': '.txt'})

tokenizer = BertTokenizer.from_pretrained('bert-base-multilingual-cased')
def tokenize_function(examples):
    return tokenizer(examples['text'], padding='max_length', truncation=True)

tokenized_datasets = dataset.map(tokenize_function, batched=True)

model = BertForMaskedLM.from_pretrained('bert-base-multilingual-cased')

training_args = TrainingArguments(
    output_dir='./results',
    evaluation_strategy='epoch',
    learning_rate=2e-5,
    per_device_train_batch_size=16,
    per_device_eval_batch_size=16,
    num_train_epochs=3,
    weight_decay=0.01,
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_datasets['train'],
    eval_dataset=tokenized_datasets['validation'],
)

trainer.train()


