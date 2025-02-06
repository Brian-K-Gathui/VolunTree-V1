from server.models import db, Organization

def get_all_organizations():
    return [org.to_dict() for org in Organization.query.all()], 200

def get_organization_by_id(organization_id):
    organization = Organization.query.get(organization_id)
    if not organization:
        return {"error": "Organization not found"}, 404
    return organization.to_dict(), 200

def create_organization(data):
    new_organization = Organization(
        name=data['name'],
        contact_name=data['contact_name'],
        contact_phone=data['contact_phone'],
        contact_email=data['contact_email']
    )
    db.session.add(new_organization)
    db.session.commit()
    return new_organization.to_dict(), 201

def update_organization(organization_id, data):
    organization = Organization.query.get(organization_id)
    if not organization:
        return {"error": "Organization not found"}, 404

    for key, value in data.items():
        setattr(organization, key, value)
    
    db.session.commit()
    return organization.to_dict(), 200

def delete_organization(organization_id):
    organization = Organization.query.get(organization_id)
    if not organization:
        return {"error": "Organization not found"}, 404

    db.session.delete(organization)
    db.session.commit()
    return {"message": "Organization deleted successfully"}, 200