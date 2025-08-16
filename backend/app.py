from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from ai_models.deepfake_detection.model_logic.predict import DeepfakeDetector
from ai_models.bio_originality.model_logic.predict import BioAuthCheck
from ai_models.metadata_verification.model_logic.predict import MetadataVerifier
from werkzeug.utils import secure_filename
from PIL import Image
import piexif

app = Flask(__name__)
CORS(app)

# Create a cross-platform temp directory
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'temp_uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # Create if doesn't exist

# Load models once at startup
verifier = MetadataVerifier(
    model_path=os.path.join(
        os.path.dirname(__file__),
        "ai_models/metadata_verification/trained_models/metadata_model.keras"
    )
)
checker = BioAuthCheck()
detector = DeepfakeDetector(
    model_path=os.path.join(
        os.path.dirname(__file__),
        "ai_models/deepfake_detection/trained_models/deepfake_model.keras"
    )
)

# Root endpoint
@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Deepfake Detection API is running"}), 200

# ---------- Deepfake Detection ----------
@app.route("/api/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files["file"]
    if file.filename == '':
        return jsonify({"error": "Empty filename"}), 400
    
    filename = secure_filename(file.filename)
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    
    try:
        file.save(file_path)
        result = detector.predict(file_path)
        
        # Clean up after processing
        if os.path.exists(file_path):
            os.remove(file_path)
            
        return jsonify({"file": filename, "analysis": result}), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ---------- Bio Authenticity Check ----------
@app.route("/api/check", methods=["POST"])
def check_bio():
    data = request.get_json()
    
    if not data or "bio" not in data:
        return jsonify({"error": "Please provide a 'bio' field in JSON"}), 400
    
    bio_text = data["bio"]
    try:
        result = checker.check_authenticity(bio_text)
        return jsonify({"bio": bio_text, "analysis": result}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ---------- Metadata Extraction Helper ----------
def extract_metadata(file_path):
    metadata = {}
    try:
        img = Image.open(file_path)
        exif_data = img.info.get("exif")
        if exif_data:
            exif_dict = piexif.load(exif_data)
            for ifd_name in exif_dict:
                for tag, value in exif_dict[ifd_name].items():
                    try:
                        tag_name = piexif.TAGS[ifd_name][tag]["name"]
                        metadata[tag_name] = value
                    except Exception:
                        pass
    except Exception as e:
        metadata["error"] = str(e)
    return metadata

# ---------- Metadata Verification ----------
@app.route("/api/metadata", methods=["POST"])
def check_metadata():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    if file.filename == '':
        return jsonify({"error": "Empty filename"}), 400

    filename = secure_filename(file.filename)
    file_path = os.path.join(UPLOAD_FOLDER, filename)

    try:
        file.save(file_path)

        # Extract metadata (EXIF)
        metadata = extract_metadata(file_path)

        # Pass metadata to ML verifier
        result = verifier.predict(metadata)

        # Clean up file
        if os.path.exists(file_path):
            os.remove(file_path)

        return jsonify({
            "file": filename,
            "metadata": metadata,
            "analysis": result
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ---------- Main ----------
if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8000, debug=True)
