#!/usr/bin/env python3

import os
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData

# Define metadata naming conventions (helps Alembic detect changes)
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

# Initialize Flask app
app = Flask(__name__)

# Configure database connection (Uses environment variable or falls back to SQLite)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL", "postgresql://voluntree_render_database_user:HyuR31vsObtAsp4iWqSfTpyi4YR8LVMJ@dpg-cuh5ir3v2p9s73crh21g-a.oregon-postgres.render.com/voluntree_render_database")

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY", "supersecretkey")

# Ensure JSON responses are readable
app.json.compact = False

# Initialize database
db = SQLAlchemy(metadata=metadata)
db.init_app(app)

# Initialize Flask-Migrate
migrate = Migrate(app, db)

# Import models here so Flask-Migrate can detect them
from server.models import Admin, Organization, Event, Volunteer, Task
print("Registered tables:", db.metadata.tables.keys())

# Enable CORS for API requests
CORS(app, resources={r"/api/*": {"origins": "https://voluntree-dzzv.onrender.com"}})

# Print a confirmation message
print("\n✅ Flask application has been successfully configured and is ready to run!\n")