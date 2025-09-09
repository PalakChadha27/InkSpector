import os, joblib

class BioAuthCheck:
    def __init__(self, model_path=None):
        if model_path is None:
            # Auto locate inside the trained_models folder
            base_dir = os.path.dirname(__file__)
            model_path = os.path.join(base_dir, "trained_models", "bio_auth_model.pkl")
            model_path = os.path.abspath(model_path)

        if not os.path.exists(model_path):
            raise FileNotFoundError(f"Model file not found at {model_path}")

        self.model = joblib.load(model_path)

    def check_authenticity(self, text: str):
        prediction = self.model.predict([text])[0]
        prob = self.model.predict_proba([text])[0]
        return {
            "input_text": text,
            "prediction": prediction,
            "confidence": round(max(prob) * 100, 2)
        }

if __name__ == "__main__":
    checker = BioAuthCheck()
    samples = [
        "I enjoy cooking and playing cricket with friends.",
        "Pioneering advancements in deep learning for real-world applications."
    ]
    for s in samples:
        print(checker.check_authenticity(s))