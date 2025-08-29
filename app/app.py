from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

# ✅ Allow all dev origins to prevent CORS issues
CORS(
    app,
    supports_credentials=True,
    resources={r"/*": {"origins": ["http://localhost:3000", "http://127.0.0.1:3000"]}}
)
