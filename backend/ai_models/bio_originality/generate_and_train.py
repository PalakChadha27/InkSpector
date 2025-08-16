import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
import joblib
import os

def train_model():
    # Find dataset path relative to this script
    base_dir = os.path.dirname(__file__)
    dataset_path = os.path.join(base_dir, "dataset", "bio_dataset.csv")
    model_dir = os.path.join(base_dir, "trained_models")
    os.makedirs(model_dir, exist_ok=True)

    # Load dataset
    df = pd.read_csv(dataset_path)
    
    # Train pipeline
    model = Pipeline([
        ("tfidf", TfidfVectorizer()),
        ("clf", LogisticRegression())
    ])
    
    model.fit(df["bio"], df["label"])
    
    # Save model
    model_path = os.path.join(model_dir, "bio_auth_model.pkl")
    joblib.dump(model, model_path)
    print(f"Model trained and saved at {model_path}")

if __name__ == "__main__":
    train_model()
