import pandas as pd
import random
import os

def generate_fake_bio():
    ai_templates = [
        "I am passionate about leveraging AI to revolutionize industries.",
        "As an AI language model, I love to assist with diverse topics.",
        "Dedicated to innovation, technology, and pushing the boundaries.",
        "Exploring new horizons in machine learning and deep learning.",
        "My mission is to empower individuals with cutting-edge AI tools."
    ]
    return random.choice(ai_templates)

def generate_real_bio():
    real_samples = [
        "Love playing football and hanging out with friends.",
        "Second year CS student, coffee addict, and coding enthusiast.",
        "Traveler, foodie, and aspiring writer sharing life experiences.",
        "Dog lover 🐶 | Fitness junkie 💪 | Exploring new cultures 🌍",
        "Just a small-town guy who enjoys reading books and music."
    ]
    return random.choice(real_samples)

def save_dataset(n=500):
    data = []
    for _ in range(n):
        if random.random() > 0.5:
            data.append([generate_real_bio(), "real"])
        else:
            data.append([generate_fake_bio(), "ai"])
    
    df = pd.DataFrame(data, columns=["bio", "label"])

    # ✅ ensure dataset directory exists
    dataset_dir = os.path.join(os.path.dirname(__file__), "dataset")
    os.makedirs(dataset_dir, exist_ok=True)

    save_path = os.path.join(dataset_dir, "bio_dataset.csv")
    df.to_csv(save_path, index=False)
    print(f"Dataset saved at {save_path}")

if __name__ == "__main__":
    save_dataset(500)
