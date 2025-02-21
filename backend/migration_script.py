# migration_script.py
from sqlalchemy.orm import Session
from models import User, UserProfile
from database import engine, SessionLocal

def create_user_profiles():
    session = SessionLocal()
    users = session.query(User).all()
    for user in users:
        if not user.profile:
            user_profile = UserProfile(
                user_id=user.user_id,
                bio="",
                education="",
                experience="",
                investment_interests="",
                portfolio_overview="",
                investment_strategy="",
                testimonials="",
                media=""
            )
            session.add(user_profile)
    session.commit()
    session.close()

if __name__ == "__main__":
    create_user_profiles()
