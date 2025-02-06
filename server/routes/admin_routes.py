from flask import request, jsonify
from flask_restful import Resource
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from server.models import db, Admin
from werkzeug.security import check_password_hash

class AdminSignup(Resource):
    def post(self):
        data = request.get_json()

        if Admin.query.filter_by(username=data['username']).first():
            return {"error": "Username already exists"}, 400
        if Admin.query.filter_by(email=data['email']).first():
            return {"error": "Email already registered"}, 400

        if data['password'] != data['password_confirmation']:
            return {"error": "Passwords do not match"}, 400

        new_admin = Admin(
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=data['email'],
            username=data['username']
        )
        new_admin.set_password(data['password'])

        db.session.add(new_admin)
        db.session.commit()

        return {"message": "Admin registered successfully!"}, 201

class AdminLogin(Resource):
    def post(self):
        data = request.get_json()
        admin = Admin.query.filter_by(username=data['username']).first()

        if not admin or not check_password_hash(admin.password_hash, data['password']):
            return {"error": "Invalid username or password"}, 401

        access_token = create_access_token(identity=admin.id)
        return {"message": "Login successful!", "access_token": access_token}, 200

class AdminProfile(Resource):
    @jwt_required()
    def get(self):
        admin_id = get_jwt_identity()
        admin = Admin.query.get(admin_id)

        if not admin:
            return {"error": "Admin not found"}, 404

        return admin.serialize(), 200
