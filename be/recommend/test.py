import pandas as pd
import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from app.models import Interaction

# Extract interactions data
interactions = Interaction.objects.all().values('user_id', 'content_id', 'interaction_type', 'stay_time')

# Convert to DataFrame
df = pd.DataFrame(list(interactions))

# Convert stay_time to seconds
df['stay_time_seconds'] = df['stay_time'].apply(lambda x: x.total_seconds() if pd.notnull(x) else 0)

# Normalize stay_time_seconds
df['stay_time_normalized'] = (df['stay_time_seconds'] - df['stay_time_seconds'].min()) / (df['stay_time_seconds'].max() - df['stay_time_seconds'].min())

# Assign weights to interactions
if 'stay_time' in df.columns and 'stay_time_seconds' > 30:
    interaction_weights = {
        'view': 3,
        'like': 2,
        'bookmark': 3,
        'purchase': 5,
        'comment': 2,
        'review': 4
    }
else:
    interaction_weights = {
        'view': 1,
        'like': 2,
        'bookmark': 3,
        'purchase': 5,
        'comment': 2,
        'review': 4
    }
df['interaction_weight'] = df['interaction_type'].apply(lambda x: interaction_weights.get(x, 1))

# Combine interaction weight and normalized stay time to form a rating
df['rating'] = df['interaction_weight'] * (1 + df['stay_time_normalized'])
from surprise import Dataset, Reader, SVD
from surprise.model_selection import train_test_split
from surprise import accuracy

# Convert DataFrame to Surprise dataset
reader = Reader(rating_scale=(0, 10))
data = Dataset.load_from_df(df[['user_id', 'content_id', 'rating']], reader)

# Split data into training and test sets
trainset, testset = train_test_split(data, test_size=0.25)

# Train the SVD algorithm
svd = SVD()
svd.fit(trainset)

# Evaluate the model
predictions = svd.test(testset)
accuracy.rmse(predictions)
import torch
from torch import nn
import torch.nn.functional as F
import torch.optim as optim

class RBM(nn.Module):
    def __init__(self, n_vis, n_hid):
        super(RBM, self).__init__()
        self.W = nn.Parameter(torch.randn(n_hid, n_vis) * 0.1)
        self.h_bias = nn.Parameter(torch.zeros(n_hid))
        self.v_bias = nn.Parameter(torch.zeros(n_vis))

    def forward(self, v):
        p_h_given_v = torch.sigmoid(F.linear(v, self.W, self.h_bias))
        return p_h_given_v

    def sample_from_p(self, p):
        return F.relu(torch.sign(p - torch.rand_like(p)))

    def v_to_h(self, v):
        p_h_given_v = torch.sigmoid(F.linear(v, self.W, self.h_bias))
        return self.sample_from_p(p_h_given_v), p_h_given_v

    def h_to_v(self, h):
        p_v_given_h = torch.sigmoid(F.linear(h, self.W.t(), self.v_bias))
        return self.sample_from_p(p_v_given_h), p_v_given_h

# Prepare training data
user_item_matrix = df.pivot(index='user_id', columns='content_id', values='rating').fillna(0).values
train_data = torch.FloatTensor(user_item_matrix)

# Define RBM parameters
n_vis = train_data.shape[1]
n_hid = 100
rbm = RBM(n_vis, n_hid)

# Training the RBM
optimizer = optim.SGD(rbm.parameters(), lr=0.1)
epochs = 10

for epoch in range(epochs):
    epoch_loss = 0
    for user in train_data:
        v0 = user.unsqueeze(0)
        vk = v0
        ph0, _ = rbm.v_to_h(v0)
        for k in range(10):
            hk, _ = rbm.v_to_h(vk)
            vk, _ = rbm.h_to_v(hk)
        phk, _ = rbm.v_to_h(vk)
        loss = torch.mean((v0 - vk) ** 2)
        epoch_loss += loss.item()
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
    print(f'Epoch {epoch + 1}/{epochs}, Loss: {epoch_loss/len(train_data)}')
def recommend_items(user_id, model, num_recommendations=10):
    user_interactions = df[df['user_id'] == user_id]
    items = df['content_id'].unique()
    recommendations = []

    for item in items:
        if item not in user_interactions['content_id'].values:
            score = model.predict(user_id, item).est
            recommendations.append((item, score))

    recommendations.sort(key=lambda x: x[1], reverse=True)
    return recommendations[:num_recommendations]

recommendations = recommend_items(1, svd)
print(recommendations)
# Example usage with SVD
# user_id = 1
# recommendations = recommend_items(user_id, svd)
# from app.models import Recommendation

# # Store recommendations
# for item_id, score in recommendations:
#     Recommendation.objects.create(
#         user_id=user_id,
#         recommended_content_type='item',
#         recommended_content_id=item_id,
#         score=score
#     )


