# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from ai_models.deepfake_detection.model_logic.predict import DeepfakeDetector

app = Flask(__name__)
CORS(app)  # development only

# Load model once when server starts
detector = DeepfakeDetector(
    model_path=os.path.join(os.path.dirname(__file__), "ai_models/deepfake_detection/trained_models/deepfake_model.keras")
)

@app.route("/api/predict", methods=["POST"])  # <-- only POST allowed
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files["file"]
    file_path = os.path.join("/tmp", file.filename)
    file.save(file_path)
    
    result = detector.predict(file_path)
    
    return jsonify(result), 200

if __name__ == "__main__":
    host = os.getenv("FLASK_RUN_HOST", "127.0.0.1")
    port = int(os.getenv("FLASK_RUN_PORT", 8000))
    app.run(host=host, port=port, debug=True)
