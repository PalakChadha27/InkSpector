# 🔍 InkSpector

AI-powered **authenticity & tampering detection platform** that verifies images, videos, voices, documents, and profiles — providing a **Trust Score** for simplified decision-making.

---

## 🚀 Features

* 🎭 **Deepfake Detection**
  Identifies AI-manipulated or tampered face images and videos using convolutional neural networks that analyze pixel-level inconsistencies and temporal artifacts.

* 🎤 **Voice Authenticity Analysis**
  Detects synthetic or cloned voice recordings via audio feature extraction and classification, distinguishing real human speech from AI-generated audio.

* 👤 **Bio/Profile Originality**
  Uses NLP to compare user bios and profiles against datasets, detecting copied or AI-generated text to flag suspicious identities.

* 🗂️ **Metadata Integrity**
  Examines EXIF and file metadata for inconsistencies or signs of tampering, ensuring an extra layer of validation.

* 📄 **Document Verification**
  Employs OCR, format analysis, and forgery detection to validate authenticity of official documents like IDs, passports, certificates, and invoices.

* 📊 **Trust Score Aggregation**
  Combines results from all AI models into a **single trust score** with a color-coded risk indicator for clear, actionable insights.

---

## 📂 Project Structure

```
backend/
 ├─ ai_models/
 │   ├─ deepfake_detection/      # CNN models for image/video tampering
 │   ├─ voice_authenticity/      # Voice classification models
 │   ├─ profile_originality/     # NLP-based text originality checks
 │   ├─ metadata_verification/   # EXIF/metadata analysis models
 │   ├─ document_verification/   # OCR & forgery detection pipelines
 │   └─ trust_score/             # Aggregates outputs into unified score
 ├─ app.py                       # Backend entrypoint
src/
 ├─ services/
 │    └─ api.js                  # API integration with frontend
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/PalakChadha27/InkSpector.git
cd InkSpector
```

### 2️⃣ Create a virtual environment

```bash
python3 -m venv venv
source venv/bin/activate   # macOS/Linux
venv\Scripts\activate      # Windows
```

### 3️⃣ Install dependencies

```bash
pip install -r requirements.txt
```

### 4️⃣ Run backend

```bash
cd backend
python app.py
```

---

## 🧪 Example Usage

### Metadata Verification

```python
from backend.ai_models.metadata_verification.model_logic.predict import MetadataVerifier

verifier = MetadataVerifier()
test_meta = {
  "create_date": "2023:01:01 12:00:00",
  "modify_date": "2022:12:31 12:00:00",
  "software": "DeepFake Generator Pro",
  "gps": "0.000000, 0.000000",
  "author": "Anonymous"
}
print(verifier.predict(test_meta))
```

Output:

```json
{
  "is_tampered": true,
  "confidence": 0.87,
  "features": {
    "suspicious_software": true,
    "date_inconsistency": true,
    "gps_anomaly": true,
    "author_anomaly": true
  }
}
```

---

## 🛠️ Tech Stack

* **AI/ML**: TensorFlow/Keras, PyTorch, NLP, OCR
* **Backend**: Python (Flask / FastAPI)
* **Frontend**: React (Vite)
* **Database**: PostgreSQL (planned)

---

## 📊 Trust Score

All module outputs are aggregated into a **Trust Score (0–100%)**:

* 🟢 **Low Risk** (80–100%)
* 🟡 **Moderate Risk** (50–79%)
* 🔴 **High Risk** (0–49%)

---

## 👩‍💻 Contributing

1. Fork the repo 🍴
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Added new detection module'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Create a Pull Request 🚀
