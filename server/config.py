#!/usr/bin/env python3

import os
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData

# Initialize Flask app
app = Flask(__name__)

# Configure database: Use cloud database if available, otherwise fallback to local SQLite
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL", "sqlite:///voluntree.db")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Set secret key for secure session management
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY", "supersecretkey")

# Ensure JSON responses are not compacted for readability
app.json.compact = False

# Define metadata naming conventions for database migrations
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

# Initialize database and migration support
db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)
db.init_app(app)



# Enable CORS for API requests from the frontend
CORS(app, resources={r"/api/*": {"origins": "https://voluntree-dzzv.onrender.com"}})

# Log confirmation message
print("\n")
print("\n✅ Flask application has been successfully configured and is ready to run!\n")
print("\n")