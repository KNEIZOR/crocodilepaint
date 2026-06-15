import os
import urllib.request

CLASSES = [
    "cat",
    "house",
    "car",
    "tree",
    "sun",     
    "cell phone", 
    "fish",
    "star",
]

SAVE_DIR = "quickdraw_raw"
os.makedirs(SAVE_DIR, exist_ok=True)

BASE_URL = "https://storage.googleapis.com/quickdraw_dataset/full/numpy_bitmap/{}.npy"

for label in CLASSES:
    url = BASE_URL.format(label.replace(" ", "%20"))
    path = os.path.join(SAVE_DIR, f"{label}.npy")

    print(f"Скачиваю {label}...")
    urllib.request.urlretrieve(url, path)
    print(f"Сохранено: {path}")

print("Готово.")
