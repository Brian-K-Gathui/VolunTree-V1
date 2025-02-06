#!/usr/bin/env python3

import os
from flask import jsonify
from flask_cors import CORS
from flask_restful import Api

from .config import app
from .routes import register_routes

# Enable CORS
CORS(app, resources={r"/api/*": {"origins": "*"}})  # Temporarily allow all requests

# Initialize API
api = Api(app)
register_routes(api)

# Home route
@app.route('/')
def home():
    return jsonify({"message": "Welcome to VolunTree API!"}), 200

# Health check endpoint
@app.route('/api/health')
def health_check():
    return jsonify({"message": "API is running!"}), 200

if __name__ == "__main__":
    is_local = os.getenv("FLASK_ENV") == "development"
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)), debug=is_local)
