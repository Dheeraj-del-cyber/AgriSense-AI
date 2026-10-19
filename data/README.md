# 🌾 AgriAI Dataset Overview

This directory contains the dataset used for training and evaluating the AgriAI plant disease classification model.

## 📁 Directory Structure
```
data/
└── dataset_combined/
    ├── train/       # Training images categorized by disease class
    └── val/         # Validation images for model evaluation
```

## 🏷️ Disease Classes (11 Classes)
1. **Apple Scab**
2. **Bacterial Spot**
3. **Black Rot**
4. **Cedar Apple Rust**
5. **Early Blight**
6. **Esca (Black Measles)**
7. **Healthy**
8. **Late Blight**
9. **Leaf Blight**
10. **Septoria Leaf Spot**
11. **Yellow Leaf Curl Virus**

## 🔬 Model Architecture
- **Base Architecture**: EfficientNetB0 (Transfer Learning)
- **Input Resolution**: 224 × 224 pixels (RGB)
- **Preprocessing**: `tf.keras.applications.efficientnet.preprocess_input`
- **Augmentation**: Rotation, zoom, width/height shift, horizontal & vertical flip
