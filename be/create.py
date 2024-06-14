import numpy as np
import scann

# Load embeddings
embeddings = np.load('embeddings.npy')

# Create ScaNN index
searcher = scann.scann_ops_pybind.builder(embeddings, 10, "dot_product").tree(
    num_leaves=200, num_leaves_to_search=100, training_sample_size=250000).score_ah(
    2, anisotropic_quantization_threshold=0.2).reorder(100).build()

# Save the ScaNN index
searcher.serialize("scann_index")
