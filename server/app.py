#!/usr/bin/env python3

import os
from flask import Flask, jsonify, send_from_directory, abort
from flask_cors import CORS
from flask_restful import Api
from .config import app, db
from .routes import register_routes

# Enable CORS
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Initialize API
api = Api(app)
register_routes(api)

# Home route for API
@app.route('/api')
def api_home():
    return jsonify({"message": "Welcome to VolunTree API!"}), 200

# Health check endpoint
@app.route('/api/health')
def health_check():
    return jsonify({"message": "API is running!"}), 200

# Serve React frontend for all non-API routes
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react(path):
    """
    Serve the React frontend for any non-API requests.
    This ensures React Router handles routing for client-side navigation.
    """
    react_build_dir = os.path.join(os.getcwd(), "client/build")

    # Check if the build directory exists
    if not os.path.exists(react_build_dir):
        return jsonify({"error": "Frontend build not found"}), 500

    # Check if requested path exists in build directory (for assets like JS, CSS, images)
    file_path = os.path.join(react_build_dir, path)
    if path and os.path.exists(file_path):
        return send_from_directory(react_build_dir, path)

    # Serve React index.html for all other cases (React Router will handle routing)
    index_path = os.path.join(react_build_dir, "index.html")
    if os.path.exists(index_path):
        return send_from_directory(react_build_dir, "index.html")
    
    # If index.html is missing, return a 500 error
    return jsonify({"error": "index.html not found in build directory"}), 500

# Run the Flask app
if __name__ == "__main__":
    is_local = os.getenv("FLASK_ENV") == "development"
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)), debug=is_local)
