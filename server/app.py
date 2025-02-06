#!/usr/bin/env python3

import os
from flask import Flask, jsonify
from flask_cors import CORS
from flask_restful import Api

from server.config import app
from server.routes import register_routes

# Enable CORS
CORS(app, resources={r"/api/*": {"origins": "https://voluntree-dzzv.onrender.com"}}, supports_credentials=True)

# Initialize API
api = Api(app)
register_routes(api)

# Home route
@app.route('/')
def home():
    return jsonify({"message": "Welcome to VolunTree API!"}), 200


@app.route('/api/health')
def health_check():
    return jsonify({"message": "API is running!"}), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
