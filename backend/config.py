import os
from pathlib import Path

class Config:
    # Server configuration
    HOST = '0.0.0.0'
    PORT = 8000
    DEBUG = True
    
    # File uploads
    BASE_DIR = Path(__file__).parent.resolve()
    UPLOAD_FOLDER = BASE_DIR / 'uploads'
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB limit
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'mp3', 'wav', 'mp4'}
    
    # AI Models
    MODEL_FOLDER = BASE_DIR / 'ai_models'
    DEEPFAKE_MODEL = MODEL_FOLDER / 'deepfake.h5'
    VOICE_MODEL = MODEL_FOLDER / 'voice_authenticity.pkl'