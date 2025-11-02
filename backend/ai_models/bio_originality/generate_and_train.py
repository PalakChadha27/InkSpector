import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split
import joblib
import os

def train_model():
    # Paths
    base_dir = os.path.dirname(__file__)
    dataset_path = os.path.join(base_dir, "dataset", "bio_dataset.csv")
    model_dir = os.path.join(base_dir, "trained_models")
    os.makedirs(model_dir, exist_ok=True)

    # Load dataset
    df = pd.read_csv(dataset_path)

    # Split train/test
    X_train, X_test, y_train, y_test = train_test_split(
        df["bio"], df["label"], test_size=0.2, stratify=df["label"], random_state=42
    )

    
    model = Pipeline([
        ("tfidf", TfidfVectorizer(ngram_range=(1,2), max_features=5000)),
        ("clf", LogisticRegression(max_iter=200))
    ])

    model.fit(X_train, y_train)

    # Evaluate
    acc = model.score(X_test, y_test)
    print(f"Validation Accuracy: {acc*100:.2f}%")

    # Save model
    model_path = os.path.join(model_dir, "bio_auth_model.pkl")
    joblib.dump(model, model_path)
    print(f"Model trained and saved at {model_path}")

if __name__ == "__main__":
    train_model()