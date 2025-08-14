import os
import numpy as np
import cv2
from tensorflow.keras import layers, models
from sklearn.model_selection import train_test_split

# 1. Generate Synthetic Dataset
def generate_dataset(samples=1000, img_size=(256, 256)):
    os.makedirs('../../../trained_models', exist_ok=True)
    
    # Create realistic synthetic data
    X = []
    y = []
    
    for i in range(samples):
        # Real images (smooth gradients)
        if i % 2 == 0:
            img = np.zeros((*img_size, 3), dtype=np.float32)
            cv2.circle(img, (img_size[0]//2, img_size[1]//2), 
                      np.random.randint(30, 100), 
                      (np.random.random(), np.random.random(), np.random.random()), -1)
            y.append(0)  # Real label
        # Fake images (noisy patterns) 
        else:
            img = np.random.rand(*img_size, 3).astype(np.float32)
            img = cv2.GaussianBlur(img, (23, 23), 0)
            y.append(1)  # Fake label
        
        X.append(img)
    
    return np.array(X), np.array(y)

# 2. Build and Train Model
def train_model():
    # Generate data
    X, y = generate_dataset(2000)
    X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2)
    
    # Enhanced CNN Model
    model = models.Sequential([
        layers.Conv2D(64, (3,3), activation='relu', input_shape=(256, 256, 3)),
        layers.MaxPooling2D((2,2)),
        layers.Conv2D(128, (3,3), activation='relu'),
        layers.MaxPooling2D((2,2)),
        layers.Conv2D(256, (3,3), activation='relu'),
        layers.GlobalAveragePooling2D(),
        layers.Dense(1, activation='sigmoid')
    ])
    
    model.compile(optimizer='adam',
                 loss='binary_crossentropy',
                 metrics=['accuracy'])
    
    # Train
    model.fit(X_train, y_train, 
              epochs=10, 
              validation_data=(X_val, y_val),
              batch_size=32)
    
    # Save model
    model.save('../../../trained_models/deepfake_model.keras')
    print("Model saved to trained_models/deepfake_model.keras")

if __name__ == "__main__":
    train_model()