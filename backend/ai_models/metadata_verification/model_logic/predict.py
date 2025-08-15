import os
import json
import numpy as np
from datetime import datetime
from tensorflow.keras.models import load_model

class MetadataVerifier:
    def __init__(self, model_path=None):
        # Resolve model path relative to this file
        if model_path is None:
            base_dir = os.path.dirname(os.path.dirname(__file__))  # go up from model_logic
            model_path = os.path.join(base_dir, "trained_models", "metadata_model.keras")
        
        if not os.path.exists(model_path):
            raise FileNotFoundError(f"Model file not found at: {model_path}")
        
        self.model = load_model(model_path)
    
    def preprocess(self, metadata):
        """Convert metadata to feature vector"""
        # Feature 1: Software suspiciousness
        sw_feat = 1 if any(x in metadata.get('software', '').lower() 
                   for x in ['deepfake', 'generator', 'editor']) else 0
        
        # Feature 2: Date inconsistency
        try:
            create = datetime.strptime(metadata['create_date'], '%Y:%m:%d %H:%M:%S')
            modify = datetime.strptime(metadata['modify_date'], '%Y:%m:%d %H:%M:%S')
            date_feat = 1 if modify < create else 0
        except:
            date_feat = 1  # Invalid dates are suspicious
            
        # Feature 3: GPS anomaly
        gps_feat = 1 if metadata.get('gps', '') in ["0.000000, 0.000000", "null", ""] else 0
        
        # Feature 4: Author anomaly
        author_feat = 1 if metadata.get('author') in [None, 'Anonymous', ''] else 0
        
        return np.array([[sw_feat, date_feat, gps_feat, author_feat]])
    
    def predict(self, metadata):
        try:
            features = self.preprocess(metadata)
            prediction = self.model.predict(features)[0][0]
            return {
                'is_tampered': bool(prediction > 0.5),
                'confidence': float(prediction if prediction > 0.5 else 1 - prediction),
                'features': {
                    'suspicious_software': bool(features[0][0]),
                    'date_inconsistency': bool(features[0][1]),
                    'gps_anomaly': bool(features[0][2]),
                    'author_anomaly': bool(features[0][3])
                }
            }
        except Exception as e:
            return {'error': str(e)}

# Example usage
if __name__ == "__main__":
    verifier = MetadataVerifier()
    
    test_meta = {
        'create_date': '2023:01:01 12:00:00',
        'modify_date': '2022:12:31 12:00:00',  # Modified before creation
        'software': 'DeepFake Generator Pro',
        'gps': '0.000000, 0.000000',
        'author': 'Anonymous'
    }
    
    result = verifier.predict(test_meta)
    print("Verification Result:", result)
