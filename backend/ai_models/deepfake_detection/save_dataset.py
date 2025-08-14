import os
from generate_and_train import generate_dataset
import cv2
import numpy as np

def save_dataset():
    # Build path relative to this script
    save_path = os.path.join(os.path.dirname(__file__), '../datasets/simulated')
    os.makedirs(save_path, exist_ok=True)
    
    X, y = generate_dataset(samples=2000)
    
    for i, img in enumerate(X):
        label = y[i]
        img_uint8 = (np.clip(img, 0, 1) * 255).astype(np.uint8)
        cv2.imwrite(os.path.join(save_path, f'img_{i}_{label}.png'), img_uint8)
    
    np.save(os.path.join(save_path, "X.npy"), X)
    np.save(os.path.join(save_path, "y.npy"), y)
    
    print(f"Dataset saved to {save_path}")

if __name__ == "__main__":
    save_dataset()
