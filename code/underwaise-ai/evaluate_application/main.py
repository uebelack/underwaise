import numpy as np
import joblib
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC
from sklearn.multiclass import OneVsRestClassifier, OneVsOneClassifier
from sklearn.metrics import classification_report, accuracy_score
import pandas as pd
# -------------------------------
# 1. Configuration
# -------------------------------
# Choose between "ovr" (One-vs-Rest) and "ovo" (One-vs-One)
MULTI_CLASS_STRATEGY = "ovr"  # options: "ovr" or "ovo"

# Filenames for saving the model and scaler
MODEL_FILENAME = f"svm_model_{MULTI_CLASS_STRATEGY}.joblib"
SCALER_FILENAME = f"scaler_{MULTI_CLASS_STRATEGY}.joblib"

df = pd.read_csv('../../../assets/testdaten_underwriting.csv', encoding='latin1',delimiter=';')

label_map = {
    'Acceptance': 0,
    'Risk surcharge indicated': 1,
    'Additional clarification indicated': 2,
    'Rejection': 3
}


target_col = 'Target'
non_relevant_features = ['First name','Last name']

non_relevant_features.append(target_col)

# Separate features and target
y = df[target_col].map(label_map).values
X = df.drop(columns=non_relevant_features)

# Convert categorical variables to numeric (e.g., one-hot encoding)
X = pd.get_dummies(X, drop_first=True)

# Convert to NumPy arrays for sklearn compatibility
X = X.values


print(f"Features shape: {X.shape}")
print(f"Target shape: {y.shape}")
print(f"Unique classes: {np.unique(y)}")

# -------------------------------
# 3. Split Data
# -------------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42
)

# -------------------------------
# 4. Scale Features
# -------------------------------
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# -------------------------------
# 5. Initialize Base SVM
# -------------------------------
base_svm = SVC(
    kernel='rbf',
    C=1.0,
    gamma='scale',
    probability=True,
    random_state=42
)

# Wrap in Multi-Class Strategy
if MULTI_CLASS_STRATEGY == "ovr":
    model = OneVsRestClassifier(base_svm)
    print("\nUsing One-vs-Rest (OvR) strategy.")
elif MULTI_CLASS_STRATEGY == "ovo":
    model = OneVsOneClassifier(base_svm)
    print("\nUsing One-vs-One (OvO) strategy.")
else:
    raise ValueError("Invalid MULTI_CLASS_STRATEGY. Choose 'ovr' or 'ovo'.")

# -------------------------------
# 6. Train the Model
# -------------------------------
print("\nTraining SVM model...")
model.fit(X_train_scaled, y_train)
print("Training complete.")

# -------------------------------
# 7. Evaluate Model
# -------------------------------
y_pred = model.predict(X_test_scaled)
accuracy = accuracy_score(y_test, y_pred)

print("\n--- Model Evaluation ---")
print(f"Accuracy: {accuracy * 100:.2f}%")
print("\nClassification Report:")
print(classification_report(y_test, y_pred))

# -------------------------------
# 8. Save Model and Scaler
# -------------------------------
joblib.dump(model, MODEL_FILENAME)
joblib.dump(scaler, SCALER_FILENAME)
print(f"\nModel saved as: {MODEL_FILENAME}")
print(f"Scaler saved as: {SCALER_FILENAME}")
