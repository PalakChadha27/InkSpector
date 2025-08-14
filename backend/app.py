# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)

# Enable CORS for all routes (development only)
CORS(app)

# Test route for frontend connection
@app.route("/api/register", methods=["POST"])
def register():
    try:
        data = request.get_json()
        name = data.get("name", "User")
        return jsonify({
            "status": "success",
            "message": f"Hello {name}, backend connected successfully!"
        }), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

# Optional root route for quick check in browser
@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Flask backend is running"}), 200

if __name__ == "__main__":
    host = os.getenv("FLASK_RUN_HOST", "127.0.0.1")
    port = int(os.getenv("FLASK_RUN_PORT", 8000))
    app.run(host=host, port=port, debug=True)
