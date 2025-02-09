from flask_restful import Api
from server.routes.admin_routes import AdminSignup, AdminLogin, AdminProfile
from server.routes.event_routes import EventResource, EventByIdResource
from server.routes.organization_routes import OrganizationResource, OrganizationByIdResource
from server.routes.volunteer_routes import VolunteerResource, VolunteerByIdResource
from server.routes.task_routes import TaskResource, TaskByIdResource

def register_routes(api: Api):
    api.add_resource(OrganizationResource, '/organizations')
    api.add_resource(OrganizationByIdResource, '/organizations/<int:organization_id>')

    api.add_resource(EventResource, '/events')
    api.add_resource(EventByIdResource, '/events/<int:event_id>')

    api.add_resource(VolunteerResource, '/volunteers')
    api.add_resource(VolunteerByIdResource, '/volunteers/<int:volunteer_id>')

    api.add_resource(TaskResource, '/tasks')
    api.add_resource(TaskByIdResource, '/tasks/<int:task_id>')

    api.add_resource(AdminSignup, '/signup')
    api.add_resource(AdminLogin, '/login')
    api.add_resource(AdminProfile, '/profile')
