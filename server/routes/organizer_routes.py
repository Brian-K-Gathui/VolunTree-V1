from flask import request
from flask_restful import Resource
from server.controllers.organization_controller import get_all_organization, get_organization_by_id, create_organization, update_organization, delete_organization

class OrganizationResource(Resource):
    def get(self):
        organizations, status_code = get_all_organization()
        return organizations, status_code

    def post(self):
        data = request.get_json()
        organization, status_code = create_organization(data)
        return organization, status_code

class OrganizationByIdResource(Resource):
    def get(self, organization_id):
        organization, status_code = get_organization_by_id(organization_id)
        return organization, status_code

    def patch(self, organization_id):
        data = request.get_json()
        organization, status_code = update_organization(organization_id, data)
        return organization, status_code

    def delete(self, organization_id):
        response, status_code = delete_organization(organization_id)
        return response, status_code
