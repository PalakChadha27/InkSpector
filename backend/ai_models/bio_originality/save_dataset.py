import pandas as pd
import random
import os

# --- Expanded AI bios ---
AI_TEMPLATES = [
    "I am passionate about leveraging AI to revolutionize industries.",
    "As an AI language model, I love to assist with diverse topics.",
    "Dedicated to innovation, technology, and pushing the boundaries.",
    "Exploring new horizons in machine learning and deep learning.",
    "My mission is to empower individuals with cutting-edge AI tools.",
    "AI is the future, and I strive to be at the forefront of it.",
    "Researching neural networks and natural language processing.",
    "Transforming the world with automation and data-driven insights.",
    "Optimizing workflows with artificial intelligence applications.",
    "Pioneering AI ethics and responsible machine learning."
]

# --- Expanded Real bios ---
REAL_TEMPLATES = [
    "Love playing football and hanging out with friends.",
    "Second year CS student, coffee addict, and coding enthusiast.",
    "Traveler, foodie, and aspiring writer sharing life experiences.",
    "Dog lover 🐶 | Fitness junkie 💪 | Exploring new cultures 🌍",
    "Just a small-town guy who enjoys reading books and music.",
    "Enjoy hiking, photography, and late-night coding marathons.",
    "Proud mom of two, juggling work and family with a smile.",
    "Big fan of cricket 🏏 and Bollywood movies.",
    "Casual gamer 🎮 who spends weekends on PlayStation.",
    "Love experimenting with cooking and trying new cuisines."
]

def generate_fake_bio():
    return random.choice(AI_TEMPLATES)

def generate_real_bio():
    return random.choice(REAL_TEMPLATES)

def save_dataset(n=1000):
    data = []
    for _ in range(n // 2):  # ensure balance
        data.append([generate_real_bio(), "real"])
        data.append([generate_fake_bio(), "ai"])
    
    random.shuffle(data)
    df = pd.DataFrame(data, columns=["bio", "label"])

    # ✅ ensure dataset directory exists
    base_dir = os.path.dirname(__file__)
    dataset_dir = os.path.join(base_dir, "dataset")
    os.makedirs(dataset_dir, exist_ok=True)

    save_path = os.path.join(dataset_dir, "bio_dataset.csv")
    df.to_csv(save_path, index=False)
    print(f"Dataset saved at {save_path}")

if __name__ == "__main__":
    save_dataset(1000)