import numpy as np

# Load data from a CSV file with longitude and latitude coordinates
data = np.genfromtxt('/Users/havardf/datasets/api.met.no/lonlat.csv', delimiter=',', skip_header=1, invalid_raise=False)
# Remove all rows with non-float values
data = data[np.all(np.isfinite(data), axis=1)]

# Define grid size
grid_size = 1  # Adjust based on desired granularity

# Compute grid indices
grid_indices = np.floor(data / grid_size)

# Use grid indices to cluster data
unique_grid_indices, counts = np.unique(grid_indices, axis=0, return_counts=True)

# Save the clustered data to a CSV file
output_data = np.hstack((unique_grid_indices * grid_size + grid_size / 2, counts[:, None]))

# Filter out invalid longitude and latitude values, and count should be greater than 1
valid_mask = (output_data[:, 0] > -180) & (output_data[:, 0] < 180) & (output_data[:, 1] > -90) & (output_data[:, 1] < 90) & (output_data[:, 2] > 1)
output_data = output_data[valid_mask]
np.savetxt('/Users/havardf/git/havardf/spatial/globegl/clustered_locations.csv', output_data, delimiter=',', header='lng,lat,count', comments='', fmt='%.2f')