import tensorflow as tf
from tensorflow.keras import layers, models
import json
import os

IMG_SIZE = 64
DATASET_DIR = "dataset"

# 1. Загружаем датасет
train_ds = tf.keras.preprocessing.image_dataset_from_directory(
    DATASET_DIR,
    image_size=(IMG_SIZE, IMG_SIZE),
    color_mode="grayscale",
    batch_size=32
)

print("Порядок классов:", train_ds.class_names)

train_ds = train_ds.map(lambda x, y: (x / 255.0, y))

# 2. Модель
model = models.Sequential([
    layers.Input(shape=(IMG_SIZE, IMG_SIZE, 1)),
    layers.Conv2D(32, (3,3), activation='relu'),
    layers.MaxPooling2D(),
    layers.Conv2D(64, (3,3), activation='relu'),
    layers.MaxPooling2D(),
    layers.Conv2D(128, (3,3), activation='relu'),
    layers.MaxPooling2D(),
    layers.Flatten(),
    layers.Dense(128, activation='relu'),
    layers.Dense(10, activation='softmax')
])

model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

# 3. Обучение
model.fit(train_ds, epochs=10)
model.save("model.h5")

# 4. Сохраняем labels.json
class_names = train_ds.class_names
with open("labels.json", "w", encoding="utf-8") as f:
    json.dump(class_names, f, ensure_ascii=False, indent=2)

print("Модель обучена и сохранена как model.h5")
print("labels.json создан:", class_names)
