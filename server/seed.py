import random
from random import randint, choice as rc
from faker import Faker
from werkzeug.security import generate_password_hash
from sqlalchemy import text

from .config import app
from .models import db, Organization, Event, Volunteer, Task, event_volunteers, Admin

fake = Faker()

if __name__ == '__main__':
    with app.app_context():
        
        print("\n🚀 Starting seed process...\n")

        # Clearing old data
        print("🗑️  Clearing old data...")
        db.session.query(event_volunteers).delete()
        db.session.query(Task).delete()
        db.session.query(Event).delete()
        db.session.query(Volunteer).delete()
        db.session.query(Organization).delete()
        db.session.query(Admin).delete()
        db.session.flush()  # Ensures deletion before resetting IDs

        # Reset Auto-Increment Counters for PostgreSQL
        db.session.execute(text("ALTER SEQUENCE admins_id_seq RESTART WITH 1;"))
        db.session.execute(text("ALTER SEQUENCE organizations_id_seq RESTART WITH 1;"))
        db.session.execute(text("ALTER SEQUENCE events_id_seq RESTART WITH 1;"))
        db.session.execute(text("ALTER SEQUENCE volunteers_id_seq RESTART WITH 1;"))
        db.session.execute(text("ALTER SEQUENCE tasks_id_seq RESTART WITH 1;"))
        db.session.commit()
        print("✅ Auto-increment reset and old data cleared!\n")

        # Seeding Admins
        print("👨‍💼 Seeding admin users...")
        admin_users = [
            Admin(
                first_name="Brian",
                last_name="Gathui",
                email="brian.gathui@gmail.com",
                username="brian_admin",
                password_hash=generate_password_hash("admin123")
            ),
            Admin(
                first_name="Alice",
                last_name="Johnson",
                email="alice.johnson@gmail.com",
                username="alice_admin",
                password_hash=generate_password_hash("securePass!")
            ),
            Admin(
                first_name="Michael",
                last_name="Smith",
                email="michael.smith@gmail.com",
                username="mike_admin",
                password_hash=generate_password_hash("michael2024")
            )
        ] * 10
        db.session.add_all(admin_users)
        db.session.commit()
        print(f"✅ Seeded {len(admin_users)} admin users!\n")

        # Seeding Organizations
        print("🏢 Seeding organizations...")
        organizations = [
            Organization(
                name=fake.company(),
                contact_name=fake.name(),
                contact_phone=fake.phone_number(),
                contact_email=fake.email()
            ) for _ in range(50)
        ]
        db.session.add_all(organizations)
        db.session.commit()
        print(f"✅ Seeded {len(organizations)} organizations!\n")

        # Seeding Events
        print("📅 Seeding events...")
        events = [
            Event(
                name=fake.catch_phrase(),
                date=fake.date_between(start_date='-1y', end_date='+1y'),
                location=fake.city(),
                organization_id=rc([org.id for org in organizations])
            ) for _ in range(100)
        ]
        db.session.add_all(events)
        db.session.commit()
        print(f"✅ Seeded {len(events)} events!\n")

        # Seeding Volunteers
        print("🙋 Seeding volunteers...")
        volunteers = [
            Volunteer(
                name=fake.name(),
                email=fake.email(),
                phone=fake.phone_number()[:20]
            ) for _ in range(150)
        ]
        db.session.add_all(volunteers)
        db.session.commit()
        print(f"✅ Seeded {len(volunteers)} volunteers!\n")

        # Assigning Volunteers to Events
        print("🔗 Assigning volunteers to events...")
        event_volunteer_entries = set()

        for volunteer in volunteers:
            assigned_events = random.sample(events, randint(1, min(3, len(events))))
            for event in assigned_events:
                event_volunteer_entries.add((event.id, volunteer.id))

        db.session.execute(event_volunteers.insert(), 
            [{"event_id": ev, "volunteer_id": vol} for ev, vol in event_volunteer_entries])
        db.session.commit()
        print(f"✅ Assigned {len(event_volunteer_entries)} unique event-volunteer entries!\n")

        # Seeding Tasks
        print("📝 Seeding tasks...")
        statuses = ["pending", "in progress", "completed"]
        tasks = [
            Task(
                title=fake.sentence(nb_words=5),
                description=fake.text(),
                status=rc(statuses),
                event_id=rc([event.id for event in events]),
                volunteer_id=rc([vol.id for vol in volunteers]) if randint(0, 1) else None
            ) for _ in range(200)
        ]
        db.session.add_all(tasks)
        db.session.commit()
        print(f"✅ Seeded {len(tasks)} tasks!\n")

        print("🎉 SEEDING PROCESS COMPLETED SUCCESSFULLY! 🚀\n")
