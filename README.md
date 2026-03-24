🚀 RapidServe AI – Smart Complaint Prioritization System

RapidServe AI is an intelligent complaint management system that analyzes user complaints and predicts their priority using machine learning, enabling faster and more efficient service response.

🔥 Features
🧠 AI-based Priority Prediction
Uses NLP + ML model to classify complaints into priority levels
📊 Admin Dashboard (Backend APIs)
View all complaints
Update complaint status (open, in_progress, resolved)
🔐 Authentication System
Role-based login (Admin/User)
JWT-based authentication
📝 Complaint Logging
Stores all complaints in CSV for tracking and admin actions
🎯 User-Friendly Frontend
Built with React + Tailwind CSS
Clean UI for submitting complaints
🛠️ Tech Stack

Frontend

React (Vite)
Tailwind CSS

Backend

FastAPI
Python

Machine Learning

Scikit-learn
TF-IDF Vectorizer

Authentication

JWT (JSON Web Tokens)
OAuth2
📂 Project Structure
rapidserve/
│
├── app/
│   ├── main.py
│   ├── admin.py
│
├── model/
│   ├── priority_model.pkl
│   ├── tfidf.pkl
│   ├── priority_encoder.pkl
│
├── data/
│   ├── predictions_log.csv
│
├── rapidserve-ui/
│   ├── src/
│   ├── index.html
│
⚙️ Setup Instructions
1️⃣ Backend Setup
pip install -r requirements.txt
pip install python-multipart bcrypt passlib python-jose

Run server:

python -m uvicorn app.main:app --reload

API Docs:

http://127.0.0.1:8000/docs
2️⃣ Frontend Setup
cd rapidserve-ui
npm install
npm run dev
🔑 Test Credentials
Role	Username	Password
Admin	admin	admin123
User	user	user123
📌 API Endpoints
POST /predict → Submit complaint
GET /admin/complaints → View all complaints
PUT /admin/complaints/{index}/status → Update status
POST /login → Authentication
🚧 Future Improvements
Full admin dashboard UI
Database integration (PostgreSQL/MongoDB)
Real-time tracking
Deployment (AWS / Vercel)
💡 Note

This project is under active development. Current version focuses on backend logic, ML integration, and API functionality.
