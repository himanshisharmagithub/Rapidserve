import joblib
import numpy as np
from scipy.sparse import hstack

bundle = joblib.load("model/priority_model.pkl")

model = bundle["model"]
tfidf = bundle["tfidf"]
urgency_encoder = bundle["urgency_encoder"]
service_encoder = bundle["service_encoder"]
priority_encoder = bundle["priority_encoder"]

complaint = ["Gas leakage near kitchen area"]
urgency = ["high"]
service = ["gas"]

X_text = tfidf.transform(complaint)
urg_enc = urgency_encoder.transform(urgency)
ser_enc = service_encoder.transform(service)

X_other = np.array([[urg_enc[0], ser_enc[0]]])
X = hstack([X_text, X_other])

pred = model.predict(X)
label = priority_encoder.inverse_transform(pred)

print("Predicted Priority:", label[0])
