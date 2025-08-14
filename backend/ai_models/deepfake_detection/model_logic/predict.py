import os
from tensorflow.keras.models import load_model

class DeepfakeDetector:
    def __init__(self, model_path=None):
        if model_path is None:
            # Absolute path relative to this file
            model_path = os.path.join(
                os.path.dirname(__file__),  # model_logic folder
                "../trained_models/deepfake_model.keras"
            )
        self.model = load_model(model_path)
        self.img_size = (256, 256)
    
    def preprocess(self, image_path):
        import cv2
        import numpy as np
        img = cv2.imread(image_path)
        img = cv2.resize(img, self.img_size)
        img = img.astype('float32') / 255.0
        return np.expand_dims(img, axis=0)
    
    def predict(self, image_path):
        try:
            processed_img = self.preprocess(image_path)
            prediction = self.model.predict(processed_img)[0][0]
            return {
                'is_fake': bool(prediction > 0.5),
                'confidence': float(prediction if prediction > 0.5 else 1 - prediction),
                'score': float(prediction)
            }
        except Exception as e:
            return {'error': str(e)}
