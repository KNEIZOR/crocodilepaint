import os
import numpy as np
from PIL import Image

RAW_DIR = "quickdraw_raw"
OUT_DIR = "dataset"
IMG_SIZE = 64

os.makedirs(OUT_DIR, exist_ok=True)

for file in os.listdir(RAW_DIR):
    if not file.endswith(".npy"):
        continue

    label = file.replace(".npy", "")
    print(f"Обрабатываю {label}...")

    class_dir = os.path.join(OUT_DIR, label)
    os.makedirs(class_dir, exist_ok=True)

    data = np.load(os.path.join(RAW_DIR, file))

    data = data[:5000]  # можно уменьшить, если слишком много

    for i, img_flat in enumerate(data):
        img = img_flat.reshape(28, 28).astype(np.uint8)

        pil_img = Image.fromarray(img, mode="L")
        pil_img = pil_img.resize((IMG_SIZE, IMG_SIZE), Image.LANCZOS)

        pil_img.save(os.path.join(class_dir, f"{i}.png"))

print("Готово! PNG датасет создан.")
