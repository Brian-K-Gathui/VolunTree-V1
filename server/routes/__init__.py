from flask_restful import Api
from server.routes.admin_routes import AdminSignup, AdminLogin, AdminProfile
from server.routes.event_routes import EventResource, EventByIdResource
from server.routes.organization_routes import OrganizationResource, OrganizationByIdResource
from server.routes.volunteer_routes import VolunteerResource, VolunteerByIdResource
from server.routes.task_routes import TaskResource, TaskByIdResource

def register_routes(api: Api):
    api.add_resource(OrganizationResource, '/api/organizations')
    api.add_resource(OrganizationByIdResource, '/api/organizations/<int:organization_id>')

    api.add_resource(EventResource, '/api/events')
    api.add_resource(EventByIdResource, '/api/events/<int:event_id>')

    api.add_resource(VolunteerResource, '/api/volunteers')
    api.add_resource(VolunteerByIdResource, '/api/volunteers/<int:volunteer_id>')


    api.add_resource(TaskResource, '/api/tasks')
    api.add_resource(TaskByIdResource, '/api/tasks/<int:task_id>')

    api.add_resource(AdminSignup, '/api/signup')
    api.add_resource(AdminLogin, '/api/login')
    api.add_resource(AdminProfile, '/api/profile')
