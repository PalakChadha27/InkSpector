import os
import numpy as np
import librosa
import soundfile as sf
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, accuracy_score
import joblib

# =====================
# 1. Generate Synthetic Audio Dataset
# =====================
def generate_sine_wave(freq, duration=2.0, sr=22050, noise_factor=0.0):
    t = np.linspace(0, duration, int(sr * duration), False)
    tone = np.sin(freq * t * 2 * np.pi)
    noise = np.random.normal(0, noise_factor, tone.shape)
    return tone + noise

def generate_dataset(samples_per_class=20, sr=22050):
    X_audio = []
    y_labels = []

    for _ in range(samples_per_class):
        # REAL voice-like sample (stable tone + low noise)
        freq = np.random.uniform(100, 200)  # human pitch range
        audio = generate_sine_wave(freq, noise_factor=0.01)
        X_audio.append(audio)
        y_labels.append(0)  # 0 = REAL

        # FAKE voice-like sample (unstable pitch + higher noise)
        freq = np.random.uniform(150, 400)
        audio = generate_sine_wave(freq, noise_factor=0.05)
        # simulate AI "glitches" by pitch shifting
        glitch_idx = np.random.randint(0, len(audio)//2)
        audio[glitch_idx:glitch_idx+500] *= np.random.uniform(0.5, 1.5)
        X_audio.append(audio)
        y_labels.append(1)  # 1 = FAKE

    return X_audio, np.array(y_labels)

# =====================
# 2. Feature Extraction
# =====================
def extract_features(audio, sr=22050):
    mfccs = librosa.feature.mfcc(y=audio, sr=sr, n_mfcc=13)
    chroma = librosa.feature.chroma_stft(y=audio, sr=sr)
    contrast = librosa.feature.spectral_contrast(y=audio, sr=sr)
    
    # flatten and concatenate all features
    features = np.hstack((
        np.mean(mfccs, axis=1),
        np.mean(chroma, axis=1),
        np.mean(contrast, axis=1)
    ))
    return features

# =====================
# 3. Train Voice Authenticity Model
# =====================
def train_voice_auth_model():
    print("[INFO] Generating synthetic dataset...")
    X_audio, y = generate_dataset(samples_per_class=25)  # total 50 per class

    print("[INFO] Extracting features...")
    X = np.array([extract_features(a) for a in X_audio])

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    print("[INFO] Training model...")
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    print("[INFO] Evaluating...")
    y_pred = model.predict(X_test)
    print(classification_report(y_test, y_pred))
    print("Accuracy:", accuracy_score(y_test, y_pred))

    os.makedirs("../../../trained_models", exist_ok=True)
    model_path = "../../../trained_models/voice_auth_model.pkl"
    joblib.dump(model, model_path)
    print(f"[INFO] Model saved to {model_path}")

if __name__ == "__main__":
    train_voice_auth_model()
