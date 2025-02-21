# config.py

from pydantic import BaseSettings

class Settings(BaseSettings):
    SECRET_KEY: str = "your_super_secret_key_here"  # Replace with a strong, unique key
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 200
    DATABASE_URL: str = "mysql+pymysql://user:password@localhost/dbname"  # Update with your actual DB credentials

    class Config:
        # No .env file is used; configurations are hardcoded
        env_file = None  # Ensure no attempt to load from .env

settings = Settings()
