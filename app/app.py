from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# ✅ CORS — THIS IS THE KEY FIX
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],   # allows OPTIONS + POST
    allow_headers=["*"],
)

class PredictRequest(BaseModel):
    complaint_text: str
    user_urgency: str
    service_type: str

@app.get("/")
def health():
    return {"status": "API running"}

@app.post("/predict")
def predict(req: PredictRequest):
    return {"predicted_priority": "high"}
