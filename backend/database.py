from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "mysql+mariadbconnector://vessel_user:vessel_pass@mariadb:3306/vessel_db"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()  # The single Base used across the entire project

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
