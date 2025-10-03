from flask import Flask
<<<<<<< HEAD

app = Flask()
app.config["DEBUG"] = True


=======
from flask_cors import CORS

app = Flask(__name__)

# ✅ Allow all dev origins to prevent CORS issues
CORS(
    app,
    supports_credentials=True,
    resources={r"/*": {"origins": ["http://localhost:3000", "http://127.0.0.1:3000"]}}
)
>>>>>>> a75de8d00c4277a7e072961b74cfc444bfec5b17
