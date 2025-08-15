from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from ai_models.deepfake_detection.model_logic.predict import DeepfakeDetector

app = Flask(__name__)
CORS(app)

# Create a cross-platform temp directory
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'temp_uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # Create if doesn't exist

detector = DeepfakeDetector(
    model_path=os.path.join(os.path.dirname(__file__), "ai_models/deepfake_detection/trained_models/deepfake_model.keras")
)
@app.route("/api/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files["file"]
    if file.filename == '':
        return jsonify({"error": "Empty filename"}), 400
    
    # Use secure_filename to prevent path traversal
    from werkzeug.utils import secure_filename
    filename = secure_filename(file.filename)
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    
    try:
        file.save(file_path)
        result = detector.predict(file_path)
        
        # Clean up: delete the file after processing
        if os.path.exists(file_path):
            os.remove(file_path)
            
        return jsonify(result), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8000, debug=True)