# auth.py
import logging
from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from jose import jwt, JWTError
from datetime import datetime, timedelta
from database import get_db
from models import User, UserProfile
from fastapi.security import OAuth2PasswordBearer
from typing import Optional
from pydantic import BaseModel, EmailStr, Field  # Import Pydantic classes

# Configure logging
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

# JWT Configuration
SECRET_KEY = "your_secure_secret_key"  # Replace with a secure, unique key
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

auth_router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

# Helper: Create access token
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# Pydantic Models
class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8, max_length=255)
    first_name: str = Field(..., max_length=50)
    last_name: str = Field(..., max_length=50)
    role: str = Field(..., pattern="^(Property Owner|Managing Partner|Investor)$")  # Use 'pattern' instead of 'regex'
    phone_number: str = Field(..., max_length=20)
    city: str = Field(..., max_length=100)
    state: str = Field(..., max_length=50)

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

@auth_router.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request.email).first()
    if not user:
        logger.warning(f"Login attempt failed: User '{request.email}' not found.")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials: User not found."
        )

    if not pwd_context.verify(request.password, user.password):
        logger.warning(f"Login attempt failed: Incorrect password for user '{request.email}'.")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials: Incorrect password."
        )

    access_token = create_access_token(data={"sub": user.email})
    logger.info(f"User '{request.email}' logged in successfully.")
    return {"access_token": access_token, "token_type": "bearer"}

@auth_router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        logger.warning(f"Registration attempt failed: Email '{user.email}' already registered.")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    hashed_password = pwd_context.hash(user.password)

    new_user = User(
        email=user.email,
        password=hashed_password,
        first_name=user.first_name,
        last_name=user.last_name,
        role=user.role,
        phone_number=user.phone_number,
        city=user.city,
        state=user.state,
    )
    try:
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        logger.info(f"User '{user.email}' registered successfully.")
    except Exception as e:
        db.rollback()
        logger.error(f"Error during registration of user '{user.email}': {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

    # Create an associated UserProfile with default values
    user_profile = UserProfile(
        user_id=new_user.user_id,
        bio="",
        education="",
        experience="",
        investment_interests="",
        portfolio_overview="",
        investment_strategy="",
        testimonials="",
        media=""
    )
    try:
        db.add(user_profile)
        db.commit()
        db.refresh(user_profile)
        logger.info(f"UserProfile for user '{user.email}' created successfully.")
    except Exception as e:
        db.rollback()
        logger.error(f"Error creating UserProfile for user '{user.email}': {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

    return {"msg": "User registered successfully", "user_id": new_user.user_id}

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if email is None:
            logger.warning("get_current_user: 'sub' claim missing in token.")
            raise HTTPException(status_code=401, detail="Invalid authentication token")
        user = db.query(User).filter(User.email == email).first()
        if user is None:
            logger.warning(f"get_current_user: No user found with email '{email}'.")
            raise HTTPException(status_code=401, detail="User not found")
        logger.info(f"get_current_user: User '{email}' retrieved successfully.")
        return user  # Return User instance
    except JWTError as e:
        logger.error(f"get_current_user: JWTError - {e}")
        raise HTTPException(status_code=401, detail="Invalid authentication token")

def get_current_user_profile(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> UserProfile:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if email is None:
            logger.warning("get_current_user_profile: 'sub' claim missing in token.")
            raise HTTPException(status_code=401, detail="Invalid authentication token")
        user = db.query(User).filter(User.email == email).first()
        if user is None:
            logger.warning(f"get_current_user_profile: No user found with email '{email}'.")
            raise HTTPException(status_code=401, detail="User not found")
        if not user.profile:
            logger.warning(f"get_current_user_profile: User '{email}' has no profile.")
            raise HTTPException(status_code=404, detail="User profile not found")
        logger.info(f"get_current_user_profile: UserProfile for '{email}' retrieved successfully.")
        return user.profile  # Return UserProfile instance
    except JWTError as e:
        logger.error(f"get_current_user_profile: JWTError - {e}")
        raise HTTPException(status_code=401, detail="Invalid authentication token")

def get_current_user_optional(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> Optional[User]:
    """
    Returns the User if the token is valid; returns None if token is missing or invalid.
    Does NOT raise an exception for missing/invalid token.
    """
    if not token:
        logger.warning("get_current_user_optional: No token provided.")
        return None
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if not email:
            logger.warning("get_current_user_optional: 'sub' claim missing in token.")
            return None
        user = db.query(User).filter(User.email == email).first()
        if not user:
            logger.warning(f"get_current_user_optional: No user found with email '{email}'.")
            return None
        logger.info(f"get_current_user_optional: User '{email}' retrieved successfully.")
        return user
    except JWTError as e:
        logger.error(f"get_current_user_optional: JWTError - {e}")
        return None
