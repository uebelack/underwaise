
import numpy as np
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC
from sklearn.metrics import classification_report, accuracy_score, confusion_matrix

# 1. Load Data
# Using a sample dataset from sklearn.
# Replace this with your own data loading (e.g., pd.read_csv)
data = load_breast_cancer()
X = data.data
y = data.target

print(f"Features shape: {X.shape}")
print(f"Target shape: {y.shape}")

# 2. Split Data
# Splitting the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

print(f"Training samples: {X_train.shape[0]}")
print(f"Testing samples: {X_test.shape[0]}")

# 3. Preprocess Data (Feature Scaling)
# SVMs are sensitive to the scale of features.
# It's crucial to scale the data.
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test) # Only transform test data

# 4. Initialize SVM Model
# Create the Support Vector Classifier object
# --- Key Hyperparameters to Tune ---
# C: Regularization parameter. A smaller C creates a wider margin
#    at the cost of more misclassifications.
# kernel: Specifies the kernel type.
#    'linear': For linearly separable data.
#    'rbf': (Radial Basis Function) Good default for non-linear data.
#    'poly': Polynomial kernel.
#    'sigmoid': Sigmoid kernel.
# gamma: Kernel coefficient for 'rbf', 'poly', and 'sigmoid'.
#    'scale' (default) or 'auto' are good starting points.
#
# For a linear kernel:
# model = SVC(kernel='linear', C=1.0, random_state=42)
#
# For a non-linear (RBF) kernel:
model = SVC(kernel='rbf', C=1.0, gamma='scale', random_state=42, probability=True)
# probability=True allows using predict_proba() later, but is slower to train

# 5. Train the Model
# Fit the model to the scaled training data
print("\nTraining SVM model...")
model.fit(X_train_scaled, y_train)
print("Training complete.")

# 6. Make Predictions
# Use the trained model to make predictions on the scaled test data
y_pred = model.predict(X_test_scaled)

# 7. Evaluate the Model
print("\n--- Model Evaluation ---")

# Accuracy
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy * 100:.2f}%")

# Confusion Matrix
print("\nConfusion Matrix:")
print(confusion_matrix(y_test, y_pred))

# Classification Report
# Provides precision, recall, f1-score, and support
print("\nClassification Report:")
print(classification_report(y_test, y_pred, target_names=data.target_names))

# 8. Example: Predict on new data
# This new data must also be scaled using the *same* scaler
# that was fit on the training data.
# (Using the first test sample as an example)
new_sample = X_test[0].reshape(1, -1)
new_sample_scaled = scaler.transform(new_sample)
prediction = model.predict(new_sample_scaled)
prediction_prob = model.predict_proba(new_sample_scaled)

print("\n--- Example Prediction ---")
print(f"Sample features (scaled): {new_sample_scaled[0][:5]}...")
print(f"Predicted class: {data.target_names[prediction[0]]} (Class {prediction[0]})")
print(f"Class probabilities: {prediction_prob}")
