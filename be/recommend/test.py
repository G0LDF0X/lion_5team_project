# # import pandas as pd
# # import os
# # import django
# # import torch
# # from torch import nn
# # import torch.nn.functional as F
# # import torch.optim as optim
# # from surprise import Dataset, Reader, SVD
# # from surprise.model_selection import train_test_split
# # from surprise import accuracy

# # # Setup Django environment
# # os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
# # django.setup()
# # from app.models import Interaction, Recommendation, User

# # # Extract interactions data
# # interactions = Interaction.objects.filter(content_type='item').values('user_id_id', 'content_id', 'interaction_type', 'stay_time')

# # # Convert to DataFrame
# # df = pd.DataFrame(list(interactions))

# # # Convert stay_time to seconds
# # df['stay_time_seconds'] = df['stay_time'].apply(lambda x: x.total_seconds() if pd.notnull(x) else 0)

# # # Normalize stay_time_seconds
# # df['stay_time_normalized'] = (df['stay_time_seconds'] - df['stay_time_seconds'].min()) / (df['stay_time_seconds'].max() - df['stay_time_seconds'].min())

# # # Assign weights to interactions
# # average_stay_time = df['stay_time_seconds'].mean()
# # if average_stay_time > 30:
# #     interaction_weights = {
# #         'view': 3 if average_stay_time > 60 else (2 if average_stay_time > 30 else 1),
# #         'like': 2,
# #         'bookmark': 3,
# #         'purchase': 5,
# #         'comment': 2,
# #         'review': 4
# #     }
# # # if df['timestamp']- datetime.now() > 30:
# # #     interaction_weights *= 0.5
# # df['interaction_weight'] = df['interaction_type'].apply(lambda x: interaction_weights.get(x, 1))

# # # Combine interaction weight and normalized stay time to form a rating
# # df['rating'] = df['interaction_weight'] * (1 + df['stay_time_normalized'])

# # # Aggregate ratings for each (user_id, content_id) pair
# # df_agg = df.groupby(['user_id_id', 'content_id']).agg({'rating': 'mean'}).reset_index()

# # # Train the SVD algorithm
# # reader = Reader(rating_scale=(0, 10))
# # data = Dataset.load_from_df(df_agg[['user_id_id', 'content_id', 'rating']], reader)
# # trainset, testset = train_test_split(data, test_size=0.01)
# # svd = SVD()
# # print (pd.DataFrame(trainset.all_ratings()))
# # svd.fit(trainset)
# # predictions = svd.test(testset)
# # print(f"RMSE for SVD: {accuracy.rmse(predictions)}")

# # # Check for GPU availability with Metal support
# # device = torch.device("mps" if torch.backends.mps.is_available() else "cpu")
# # print(f"Using device: {device}")

# # # Train the RBM model
# # class RBM(nn.Module):
# #     def __init__(self, n_vis, n_hid):
# #         super(RBM, self).__init__()
# #         self.W = nn.Parameter(torch.randn(n_hid, n_vis) * 0.1)
# #         self.h_bias = nn.Parameter(torch.zeros(n_hid))
# #         self.v_bias = nn.Parameter(torch.zeros(n_vis))

# #     def forward(self, v):
# #         p_h_given_v = torch.sigmoid(F.linear(v, self.W, self.h_bias))
# #         return p_h_given_v

# #     def sample_from_p(self, p):
# #         return F.relu(torch.sign(p - torch.rand_like(p)))

# #     def v_to_h(self, v):
# #         p_h_given_v = torch.sigmoid(F.linear(v, self.W, self.h_bias))
# #         return self.sample_from_p(p_h_given_v), p_h_given_v

# #     def h_to_v(self, h):
# #         p_v_given_h = torch.sigmoid(F.linear(h, self.W.t(), self.v_bias))
# #         return self.sample_from_p(p_v_given_h), p_v_given_h

# # user_item_matrix = df_agg.pivot(index='user_id_id', columns='content_id', values='rating').fillna(0).values
# # train_data = torch.FloatTensor(user_item_matrix).to(device)  # Move data to device
# # n_vis = train_data.shape[1]
# # n_hid = 100
# # rbm = RBM(n_vis, n_hid).to(device)  # Move model to device
# # optimizer = optim.SGD(rbm.parameters(), lr=0.1)
# # epochs = 10

# # for epoch in range(epochs):
# #     epoch_loss = 0
# #     for user in train_data:
# #         v0 = user.unsqueeze(0)
# #         vk = v0
# #         ph0, _ = rbm.v_to_h(v0)
# #         for k in range(10):
# #             hk, _ = rbm.v_to_h(vk)
# #             vk, _ = rbm.h_to_v(hk)
# #         phk, _ = rbm.v_to_h(vk)
# #         loss = torch.mean((v0 - vk) ** 2)
# #         epoch_loss += loss.item()
# #         optimizer.zero_grad()
# #         loss.backward()
# #         optimizer.step()
# #     print(f'Epoch {epoch + 1}/{epochs}, Loss: {epoch_loss / len(train_data)}')

# # def recommend_items(user_id_id, svd_model, rbm_model=None, num_recommendations=10):
# #     user_interactions = df_agg[df_agg['user_id_id'] == user_id_id]
# #     items = df_agg['content_id'].unique()
# #     recommendations = []

# #     for item in items:
# #         # if item not in user_interactions['content_id'].values:
# #         if svd_model:
# #             score = svd_model.predict(user_id_id, item).est
# #         if rbm_model:
# #             user_vector = torch.FloatTensor(user_interactions.pivot(index='user_id_id', columns='content_id', values='rating').fillna(0).values).to(device)
# #             score = rbm_model(user_vector).item()
# #         recommendations.append((item, score))

# #     recommendations.sort(key=lambda x: x[1], reverse=True)
# #     return recommendations[:num_recommendations]

# # # Example usage with SVD
# # user_id_id = 49
# # recommendations = recommend_items(user_id_id, svd)
# # print(recommendations)

# # # Store recommendations
# # for item_id, score in recommendations:
# #     user = User.objects.get(id=user_id_id)
# #     Recommendation.objects.create(
# #         user_id_id=user.id,
# #         recommended_content_type='item',
# #         recommended_content_id=item_id,
# #         score=score
# #     )
# # import pandas as pd
# # import os
# # import django
# # import torch
# # from torch import nn
# # import torch.nn.functional as F
# # import torch.optim as optim
# # from surprise import Dataset, Reader, SVD
# # from surprise.model_selection import train_test_split
# # from surprise import accuracy
# # from datetime import datetime

# # # Setup Django environment
# # os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
# # django.setup()
# # from app.models import Interaction, Recommendation, User

# # # Define the half-life for the decay function
# # T = 7  # days

# # def apply_time_decay(df, T):
# #     t_now = datetime.now()
# #     df['decayed_weight'] = df.apply(lambda row: row['interaction_weight'] * 0.5 ** ((t_now - row['timestamp']).days / T), axis=1)
# #     return df

# # # Extract interactions data
# # interactions = Interaction.objects.filter(content_type='item').values('user_id_id', 'content_id', 'interaction_type', 'stay_time', 'timestamp')

# # # Convert to DataFrame
# # df = pd.DataFrame(list(interactions))

# # # Convert stay_time to seconds
# # df['stay_time_seconds'] = df['stay_time'].apply(lambda x: x.total_seconds() if pd.notnull(x) else 0)

# # # Normalize stay_time_seconds
# # df['stay_time_normalized'] = (df['stay_time_seconds'] - df['stay_time_seconds'].min()) / (df['stay_time_seconds'].max() - df['stay_time_seconds'].min())

# # # Assign weights to interactions
# # average_stay_time = df['stay_time_seconds'].mean()
# # if average_stay_time > 30:
# #     interaction_weights = {
# #         'view': 3,
# #         'like': 2,
# #         'bookmark': 3,
# #         'purchase': 5,
# #         'comment': 2,
# #         'review': 4
# #     }
# # else:
# #     interaction_weights = {
# #         'view': 1,
# #         'like': 2,
# #         'bookmark': 3,
# #         'purchase': 5,
# #         'comment': 2,
# #         'review': 4
# #     }

# # df['interaction_weight'] = df['interaction_type'].apply(lambda x: interaction_weights.get(x, 1))

# # # Apply time decay to interaction weights
# # df['timestamp'] = pd.to_datetime(df['timestamp'])
# # df = apply_time_decay(df, T)

# # # Combine decayed weight and normalized stay time to form a rating
# # df['rating'] = df['decayed_weight'] * (1 + df['stay_time_normalized'])

# # # Aggregate ratings for each (user_id, content_id) pair
# # df_agg = df.groupby(['user_id_id', 'content_id']).agg({'rating': 'mean'}).reset_index()

# # # Train the SVD algorithm
# # reader = Reader(rating_scale=(0, 10))
# # data = Dataset.load_from_df(df_agg[['user_id_id', 'content_id', 'rating']], reader)
# # trainset, testset = train_test_split(data, test_size=0.01)
# # svd = SVD()
# # print(pd.DataFrame(trainset.all_ratings()))
# # svd.fit(trainset)
# # predictions = svd.test(testset)
# # print(f"RMSE for SVD: {accuracy.rmse(predictions)}")

# # # Check for GPU availability with Metal support
# # device = torch.device("mps" if torch.backends.mps.is_available() else "cpu")
# # print(f"Using device: {device}")

# # # Train the RBM model
# # class RBM(nn.Module):
# #     def __init__(self, n_vis, n_hid):
# #         super(RBM, self).__init__()
# #         self.W = nn.Parameter(torch.randn(n_hid, n_vis) * 0.1)
# #         self.h_bias = nn.Parameter(torch.zeros(n_hid))
# #         self.v_bias = nn.Parameter(torch.zeros(n_vis))

# #     def forward(self, v):
# #         p_h_given_v = torch.sigmoid(F.linear(v, self.W, self.h_bias))
# #         return p_h_given_v

# #     def sample_from_p(self, p):
# #         return F.relu(torch.sign(p - torch.rand_like(p)))

# #     def v_to_h(self, v):
# #         p_h_given_v = torch.sigmoid(F.linear(v, self.W, self.h_bias))
# #         return self.sample_from_p(p_h_given_v), p_h_given_v

# #     def h_to_v(self, h):
# #         p_v_given_h = torch.sigmoid(F.linear(h, self.W.t(), self.v_bias))
# #         return self.sample_from_p(p_v_given_h), p_v_given_h

# # user_item_matrix = df_agg.pivot(index='user_id_id', columns='content_id', values='rating').fillna(0).values
# # train_data = torch.FloatTensor(user_item_matrix).to(device)  # Move data to device
# # n_vis = train_data.shape[1]
# # n_hid = 100
# # rbm = RBM(n_vis, n_hid).to(device)  # Move model to device
# # optimizer = optim.SGD(rbm.parameters(), lr=0.1)
# # epochs = 10

# # for epoch in range(epochs):
# #     epoch_loss = 0
# #     for user in train_data:
# #         v0 = user.unsqueeze(0)
# #         vk = v0
# #         ph0, _ = rbm.v_to_h(v0)
# #         for k in range(10):
# #             hk, _ = rbm.v_to_h(vk)
# #             vk, _ = rbm.h_to_v(hk)
# #         phk, _ = rbm.v_to_h(vk)
# #         loss = torch.mean((v0 - vk) ** 2)
# #         epoch_loss += loss.item()
# #         optimizer.zero_grad()
# #         loss.backward()
# #         optimizer.step()
# #     print(f'Epoch {epoch + 1}/{epochs}, Loss: {epoch_loss / len(train_data)}')

# # def recommend_items(user_id_id, svd_model, rbm_model=None, num_recommendations=10):
# #     user_interactions = df_agg[df_agg['user_id_id'] == user_id_id]
# #     items = df_agg['content_id'].unique()
# #     recommendations = []

# #     for item in items:
# #         if svd_model:
# #             score = svd_model.predict(user_id_id, item).est
# #         if rbm_model:
# #             user_vector = torch.FloatTensor(user_interactions.pivot(index='user_id_id', columns='content_id', values='rating').fillna(0).values).to(device)
# #             score = rbm_model(user_vector).item()
# #         recommendations.append((item, score))

# #     recommendations.sort(key=lambda x: x[1], reverse=True)
# #     return recommendations[:num_recommendations]

# # # Example usage with SVD
# # user_id_id = 49
# # recommendations = recommend_items(user_id_id, svd)
# # print(recommendations)

# # # Store recommendations
# # for item_id, score in recommendations:
# #     user = User.objects.get(id=user_id_id)
# #     Recommendation.objects.create(
# #         user_id=user,
# #         recommended_content_type='item',
# #         recommended_content_id=item_id,
# #         score=score
# #     )
# import pandas as pd
# import os
# import django
# from surprise import Dataset, Reader, SVD
# from surprise.model_selection import train_test_split
# import pickle
# from datetime import datetime
# import torch
# from torch import nn
# import torch.optim as optim

# # Setup Django environment
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
# django.setup()
# from app.models import Interaction

# # Define the half-life for the decay function
# T = 7  # days

# def apply_time_decay(df, T):
#     t_now = datetime.now()
#     df['decayed_weight'] = df.apply(lambda row: row['interaction_weight'] * 0.5 ** ((t_now - row['timestamp']).days / T), axis=1)
#     return df

# def load_and_preprocess_data():
#     interactions = Interaction.objects.filter(content_type='item').values('user_id_id', 'content_id', 'interaction_type', 'stay_time', 'timestamp')
#     df = pd.DataFrame(list(interactions))

#     # Convert stay_time to seconds
#     df['stay_time_seconds'] = df['stay_time'].apply(lambda x: x.total_seconds() if pd.notnull(x) else 0)
#     # Normalize stay_time_seconds
#     df['stay_time_normalized'] = (df['stay_time_seconds'] - df['stay_time_seconds'].min()) / (df['stay_time_seconds'].max() - df['stay_time_seconds'].min())

#     # Assign weights to interactions
#     average_stay_time = df['stay_time_seconds'].mean()
#     interaction_weights = {
#         'view': 3 if average_stay_time > 30 else 1,
#         'like': 2,
#         'bookmark': 3,
#         'purchase': 5,
#         'comment': 2,
#         'review': 4
#     }
#     df['interaction_weight'] = df['interaction_type'].apply(lambda x: interaction_weights.get(x, 1))

#     # Apply time decay
#     df['timestamp'] = pd.to_datetime(df['timestamp'])
#     df = apply_time_decay(df, T)

#     # Combine decayed weight and normalized stay time to form a rating
#     df['rating'] = df['decayed_weight'] * (1 + df['stay_time_normalized'])

#     # Aggregate ratings for each (user_id, content_id) pair
#     df_agg = df.groupby(['user_id_id', 'content_id']).agg({'rating': 'mean'}).reset_index()

#     return df_agg

# def train_svd_model():
#     df_agg = load_and_preprocess_data()
#     reader = Reader(rating_scale=(0, 10))
#     data = Dataset.load_from_df(df_agg[['user_id_id', 'content_id', 'rating']], reader)
#     trainset, testset = train_test_split(data, test_size=0.01)
#     svd = SVD()
#     svd.fit(trainset)
    
#     # Save the trained model
#     with open('svd_model.pkl', 'wb') as f:
#         pickle.dump(svd, f)

#     # Evaluate the model
#     predictions = svd.test(testset)
#     print(f"RMSE for SVD: {accuracy.rmse(predictions)}")

# class RBM(nn.Module):
#     def __init__(self, n_vis, n_hid):
#         super(RBM, self).__init__()
#         self.W = nn.Parameter(torch.randn(n_hid, n_vis) * 0.1)
#         self.h_bias = nn.Parameter(torch.zeros(n_hid))
#         self.v_bias = nn.Parameter(torch.zeros(n_vis))

#     def forward(self, v):
#         p_h_given_v = torch.sigmoid(nn.functional.linear(v, self.W, self.h_bias))
#         return p_h_given_v

#     def sample_from_p(self, p):
#         return nn.functional.relu(torch.sign(p - torch.rand_like(p)))

#     def v_to_h(self, v):
#         p_h_given_v = torch.sigmoid(nn.functional.linear(v, self.W, self.h_bias))
#         return self.sample_from_p(p_h_given_v), p_h_given_v

#     def h_to_v(self, h):
#         p_v_given_h = torch.sigmoid(nn.functional.linear(h, self.W.t(), self.v_bias))
#         return self.sample_from_p(p_v_given_h), p_v_given_h

# def train_rbm_model():
#     df_agg = load_and_preprocess_data()
#     user_item_matrix = df_agg.pivot(index='user_id_id', columns='content_id', values='rating').fillna(0).values
#     device = torch.device("mps" if torch.backends.mps.is_available() else "cpu")
#     train_data = torch.FloatTensor(user_item_matrix).to(device)
#     n_vis = train_data.shape[1]
#     n_hid = 100
#     rbm = RBM(n_vis, n_hid).to(device)
#     optimizer = optim.SGD(rbm.parameters(), lr=0.1)
#     epochs = 10

#     for epoch in range(epochs):
#         epoch_loss = 0
#         for user in train_data:
#             v0 = user.unsqueeze(0)
#             vk = v0
#             ph0, _ = rbm.v_to_h(v0)
#             for k in range(10):
#                 hk, _ = rbm.v_to_h(vk)
#                 vk, _ = rbm.h_to_v(hk)
#             phk, _ = rbm.v_to_h(vk)
#             loss = torch.mean((v0 - vk) ** 2)
#             epoch_loss += loss.item()
#             optimizer.zero_grad()
#             loss.backward()
#             optimizer.step()
#         print(f'Epoch {epoch + 1}/{epochs}, Loss: {epoch_loss / len(train_data)}')

#     # Save the trained model
#     with open('rbm_model.pkl', 'wb') as f:
#         pickle.dump(rbm, f)

# # Schedule tasks to run daily
# from django_q.tasks import schedule

# schedule(
#     'app.tasks.train_svd_model',
#     schedule_type='D',
#     repeats=-1
# )

# schedule(
#     'app.tasks.train_rbm_model',
#     schedule_type='D',
#     repeats=-1
# )
