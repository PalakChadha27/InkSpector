import os
import json
import random
import numpy as np
from datetime import datetime, timedelta
from tensorflow.keras import layers, models
from sklearn.model_selection import train_test_split

def generate_metadata_samples(num_samples=1000):
    """Generate synthetic metadata with tampering indicators"""
    print(f"[1/4] Generating {num_samples} metadata samples...")
    samples = []
    labels = []
    
    for _ in range(num_samples):
        # Real metadata (consistent)
        if random.random() > 0.5:
            create_time = datetime.now() - timedelta(days=random.randint(1, 365))
            modify_time = create_time + timedelta(minutes=random.randint(0, 60))
            meta = {
                'create_date': create_time.strftime('%Y:%m:%d %H:%M:%S'),
                'modify_date': modify_time.strftime('%Y:%m:%d %H:%M:%S'),
                'software': 'Photoshop' if random.random() > 0.8 else 'Camera',
                'gps': f"{random.uniform(-90, 90):.6f}, {random.uniform(-180, 180):.6f}",
                'author': None if random.random() > 0.9 else 'Camera User'
            }
            labels.append(0)
        # Fake metadata (inconsistent)
        else:
            create_time = datetime.now() - timedelta(days=random.randint(1, 365))
            meta = {
                'create_date': (create_time + timedelta(days=10)).strftime('%Y:%m:%d %H:%M:%S'),
                'modify_date': create_time.strftime('%Y:%m:%d %H:%M:%S'),
                'software': 'DeepFake Generator v1.2',
                'gps': "0.000000, 0.000000",
                'author': 'Anonymous'
            }
            labels.append(1)
        
        samples.append(meta)
    
    print(f"   ✅ Metadata samples generated.")
    return samples, np.array(labels)

def preprocess_metadata(metadata_samples):
    """Convert metadata to numerical features"""
    print(f"[2/4] Preprocessing metadata into features...")
    features = []
    for meta in metadata_samples:
        sw_feat = 1 if 'DeepFake' in meta.get('software', '') or 'Generator' in meta.get('software', '') else 0
        create = datetime.strptime(meta['create_date'], '%Y:%m:%d %H:%M:%S')
        modify = datetime.strptime(meta['modify_date'], '%Y:%m:%d %H:%M:%S')
        date_feat = 1 if modify < create else 0
        gps_feat = 1 if meta['gps'] == "0.000000, 0.000000" else 0
        author_feat = 1 if meta.get('author') in [None, 'Anonymous'] else 0
        features.append([sw_feat, date_feat, gps_feat, author_feat])
    
    print(f"   ✅ Feature extraction complete.")
    return np.array(features)

def train_model():
    print("🚀 Starting Metadata Model Training...")
    samples, labels = generate_metadata_samples(2000)
    X = preprocess_metadata(samples)
    print(f"[3/4] Splitting dataset into train/validation sets...")
    X_train, X_val, y_train, y_val = train_test_split(X, labels, test_size=0.2)
    
    print(f"[4/4] Building and training model...")
    model = models.Sequential([
        layers.Dense(8, activation='relu', input_shape=(4,)),
        layers.Dense(1, activation='sigmoid')
    ])
    
    model.compile(optimizer='adam',
                 loss='binary_crossentropy',
                 metrics=['accuracy'])
    
    model.fit(X_train, y_train,
              epochs=10,
              validation_data=(X_val, y_val),
              batch_size=32)
    
    os.makedirs('../../../trained_models', exist_ok=True)
    model.save('../../../trained_models/metadata_model.keras')
    print("✅ Model saved to trained_models/metadata_model.keras")

if __name__ == "__main__":
    train_model()
