# 📸 InkSpector

AI-powered tool for detecting metadata inconsistencies and potential image tampering.

## 🚀 Features

* ✅ **Metadata Verification** using ML (`.keras` model)
* ✅ Detects anomalies in:

  * Suspicious software usage (e.g., DeepFake, editor)
  * Date inconsistencies (modified before created)
  * GPS anomalies (null or missing coordinates)
  * Author anomalies (anonymous or missing author)
* ✅ Easy to extend for new features

---

## 📂 Project Structure

```
backend/
 ├─ ai_models/
 │   └─ metadata_verification/
 │        ├─ model_logic/        # Inference scripts (predict.py)
 │        ├─ trained_models/     # Saved Keras model (.keras)
 │        └─ generate_and_train.py  # Training script
 ├─ app.py                       # Backend entrypoint
src/
 ├─ services/
 │    └─ api.js                  # API integration (frontend/backend bridge)
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

### 4️⃣ Run metadata verification test

```bash
cd backend/ai_models/metadata_verification/model_logic
python predict.py
```

Expected output (example):

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

## 🧪 Example Metadata Input

```json
{
  "create_date": "2023:01:01 12:00:00",
  "modify_date": "2022:12:31 12:00:00",
  "software": "DeepFake Generator Pro",
  "gps": "0.000000, 0.000000",
  "author": "Anonymous"
}
```

---

## 🛠️ Tech Stack

* **Backend**: Python (Flask/FastAPI), TensorFlow/Keras
* **Frontend**: React (Vite)
* **Database**: PostgreSQL (planned)

---

## 👩‍💻 Contributing

1. Fork the repo 🍴
2. Create your feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Create a Pull Request 🚀

