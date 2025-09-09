import sys
import numpy as np
import librosa
import joblib

# =====================
# Feature Extraction
# =====================
def extract_features(audio, sr=22050):
    mfccs = librosa.feature.mfcc(y=audio, sr=sr, n_mfcc=13)
    chroma = librosa.feature.chroma_stft(y=audio, sr=sr)
    contrast = librosa.feature.spectral_contrast(y=audio, sr=sr)
    
    features = np.hstack((
        np.mean(mfccs, axis=1),
        np.mean(chroma, axis=1),
        np.mean(contrast, axis=1)
    ))
    return features

# =====================
# Prediction Function
# =====================
def predict_voice_authenticity(file_path):
    # Load trained model
    model_path = "../../../trained_models/voice_auth_model.pkl"
    model = joblib.load(model_path)

    # Load audio
    audio, sr = librosa.load(file_path, sr=22050, mono=True)

    # Extract features
    features = extract_features(audio, sr=sr).reshape(1, -1)

    # Predict
    pred = model.predict(features)[0]
    proba = model.predict_proba(features)[0]

    label = "REAL" if pred == 0 else "AI-GENERATED"
    confidence = proba[pred] * 100

    print(f"[RESULT] Prediction: {label}")
    print(f"[RESULT] Confidence: {confidence:.2f}%")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 predict.py <audio_file>")
        sys.exit(1)

    predict_voice_authenticity(sys.argv[1])
