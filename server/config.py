#!/usr/bin/env python3

import os
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData

app = Flask(__name__)

# Use cloud database or fallback to SQLite (for local development)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL", "sqlite:///voluntree.db")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY", "supersecretkey")
app.json.compact = False

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)
db.init_app(app)

CORS(app, resources={r"/api/*": {"origins": "https://voluntree-dzzv.onrender.com"}})
print("\n")
print("✅ Flask app configured successfully!")
print("\n")

if __name__ == "__main__":
    print("Run `flask db migrate && flask db upgrade` manually when needed.")
