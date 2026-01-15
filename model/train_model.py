import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
from scipy.sparse import hstack

# 1. Load data
df = pd.read_excel(
    r"C:\Users\win 11 x64\OneDrive\Desktop\rapidserve\data\emergency_dataset.xlsx"
)


# 2. Encode categorical columns
urgency_encoder = LabelEncoder()
service_encoder = LabelEncoder()
priority_encoder = LabelEncoder()

df["user_urgency_enc"] = urgency_encoder.fit_transform(df["user_urgency"])
df["service_type_enc"] = service_encoder.fit_transform(df["service_type"])
y = priority_encoder.fit_transform(df["priority_label"])

# 3. Text vectorization
tfidf = TfidfVectorizer(stop_words="english")
X_text = tfidf.fit_transform(df["complaint_text"])

# 4. Combine text + categorical features
X_other = df[["user_urgency_enc", "service_type_enc"]].values
X = hstack([X_text, X_other])

# 5. Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 6. Train model
model = LogisticRegression(max_iter=1000)
model.fit(X_train, y_train)

# 7. Evaluate
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)

print("Model Accuracy:", accuracy)
# -------- Predict on new complaint --------

new_complaint = ["Gas smell detected near stove in apartment"]
new_urgency = ["high"]
new_service = ["gas"]

new_text_vec = tfidf.transform(new_complaint)

new_urgency_enc = urgency_encoder.transform(new_urgency)
new_service_enc = service_encoder.transform(new_service)

import numpy as np
new_other = np.array([[new_urgency_enc[0], new_service_enc[0]]])

new_X = hstack([new_text_vec, new_other])

pred = model.predict(new_X)
pred_label = priority_encoder.inverse_transform(pred)

print("Predicted Priority:", pred_label[0])
import joblib

joblib.dump(
    {
        "model": model,
        "tfidf": tfidf,
        "urgency_encoder": urgency_encoder,
        "service_encoder": service_encoder,
        "priority_encoder": priority_encoder,
    },
    "model/priority_model.pkl"
)

joblib.dump(model, "model/priority_model.pkl")
joblib.dump(tfidf, "model/tfidf.pkl")
joblib.dump(urgency_encoder, "model/urgency_encoder.pkl")
joblib.dump(service_encoder, "model/service_encoder.pkl")
joblib.dump(priority_encoder, "model/priority_encoder.pkl")

print("All model artifacts saved successfully")
