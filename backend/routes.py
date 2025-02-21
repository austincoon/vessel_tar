# routes.py
from fastapi import APIRouter, Depends, HTTPException, File, UploadFile, status
from sqlalchemy.orm import Session
from auth import auth_router, get_current_user, get_current_user_profile, get_current_user_optional
from models import User, UserProfile, Property, PropertyImage, Project
from schemas import UserResponse, UserProfileResponse, PropertyCreate, PropertyImageCreate, PropertyResponse, ProjectCreate, ProjectResponse, UserUpdate, UserProfileUpdate
from typing import List, Optional
from database import get_db
import uuid
import os

router = APIRouter()

# Include authentication routes
router.include_router(auth_router, prefix="/auth", tags=["auth"])

@router.get("/api/user", response_model=UserResponse)
def get_current_user_info(current_user: Optional[User] = Depends(get_current_user_optional)):
    if current_user:
        return {
            "user_id": current_user.user_id,
            "email": current_user.email,
            "firstName": current_user.first_name or "",
            "lastName": current_user.last_name or "",
            "profileImage": current_user.profile_image or "",
        }
    raise HTTPException(status_code=401, detail="Not authenticated")

@router.get("/api/data")
def read_user_data(current_user: User = Depends(get_current_user)):
    """
    Protected route that returns user data.
    """
    return {
        "profile": {
            "id": current_user.user_id,
            "name": f"{current_user.first_name} {current_user.last_name}",
            "email": current_user.email,
            "city": current_user.city,
            "state": current_user.state,
            "phone": current_user.phone_number,
        }
    }


@router.get("/api/data", response_model=UserResponse)
def get_current_user_profile(current_user: User = Depends(get_current_user)):
    return {
        "user_id": current_user.user_id,
        "email": current_user.email,
        "firstName": current_user.first_name,
        "lastName": current_user.last_name,
        "profileImage": current_user.profile_image,
        "role": current_user.role,
        "phoneNumber": current_user.phone_number,
        "city": current_user.city,
        "state": current_user.state,
        "vesselRating": float(current_user.vessel_rating) if current_user.vessel_rating else None,
        "createdAt": current_user.created_at.isoformat() if current_user.created_at else None,
    }

@router.get("/api/details", response_model=UserProfileResponse)
def get_current_user_details(current_user: User = Depends(get_current_user)):
    user_profile = db.query(UserProfile).filter(UserProfile.user_id == current_user.user_id).first()
    if not user_profile:
        raise HTTPException(status_code=404, detail="User profile not found")
    return {
        "bio": user_profile.bio,
        "education": user_profile.education,
        "experience": user_profile.experience,
        "investmentInterests": user_profile.investment_interests,
        "portfolioOverview": user_profile.portfolio_overview,
        "investmentStrategy": user_profile.investment_strategy,
        "testimonials": user_profile.testimonials,
        "media": user_profile.media,
    }


@router.get("/users", response_model=List[UserResponse])
def get_all_users(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)  # Protect the endpoint
):
    users = db.query(User).all()
    return [
        {
            "user_id": user.user_id,
            "email": user.email,
            "firstName": user.first_name,
            "lastName": user.last_name,
            "profileImage": user.profile_image,
            "role": user.role,  # Map this field
            "phoneNumber": user.phone_number,
            "city": user.city,  # Map this field
            "state": user.state,  # Map this field
            "vesselRating": float(user.vessel_rating) if user.vessel_rating else None,  # Map this field
            "createdAt": user.created_at.isoformat() if user.created_at else None,
        }
        for user in users
    ]

@router.get("/user/{user_id}", response_model=UserResponse)
def get_user_profile(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {
        "user_id": user.user_id,
        "email": user.email,
        "firstName": user.first_name,  # Ensure this field is included
        "lastName": user.last_name,    # Ensure this field is included
        "profileImage": user.profile_image,
        "role": user.role,
        "phoneNumber": user.phone_number,  # Ensure this field is included
        "city": user.city,
        "state": user.state,
        "vesselRating": float(user.vessel_rating) if user.vessel_rating else None,
        "createdAt": user.created_at.isoformat() if user.created_at else None,
    }

@router.get("/user/{user_id}/details", response_model=UserProfileResponse)
def get_user_details(user_id: int, db: Session = Depends(get_db)):
    user_profile = db.query(UserProfile).filter(UserProfile.user_id == user_id).first()
    if not user_profile:
        raise HTTPException(status_code=404, detail="User profile not found")
    return {
        "bio": user_profile.bio,
        "education": user_profile.education,
        "experience": user_profile.experience,
        "investmentInterests": user_profile.investment_interests,
        "portfolioOverview": user_profile.portfolio_overview,
        "investmentStrategy": user_profile.investment_strategy,
        "testimonials": user_profile.testimonials,
        "media": user_profile.media,
    }



# ---------------------------------------------------

@router.put("/user/{user_id}", response_model=UserResponse)
def update_user(
    user_id: int,
    user_update: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Ensure a user can update only their own account
    if user_id != current_user.user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to update this account.")
    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    # Update fields if provided in the request
    if user_update.email is not None:
        user.email = user_update.email
    if user_update.firstName is not None:
        user.first_name = user_update.firstName
    if user_update.lastName is not None:
        user.last_name = user_update.lastName
    if user_update.profileImage is not None:
        user.profile_image = user_update.profileImage
    if user_update.phoneNumber is not None:
        user.phone_number = user_update.phoneNumber
    if user_update.city is not None:
        user.city = user_update.city
    if user_update.state is not None:
        user.state = user_update.state
    if user_update.vesselRating is not None:
        user.vessel_rating = user_update.vesselRating
    db.commit()
    db.refresh(user)
    return user

# ----------------------------------------------------------------
# Endpoint to update user profile details (USER_PROFILES table)
# ----------------------------------------------------------------

@router.put("/user/{user_id}/details", response_model=UserProfileResponse)
def update_user_details(
    user_id: int,
    details_update: UserProfileUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Ensure a user can update only their own profile
    if user_id != current_user.user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to update this account.")
    profile = db.query(UserProfile).filter(UserProfile.user_id == user_id).first()
    if not profile:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User profile not found")
    if details_update.bio is not None:
        profile.bio = details_update.bio
    if details_update.education is not None:
        profile.education = details_update.education
    if details_update.experience is not None:
        profile.experience = details_update.experience
    if details_update.investmentInterests is not None:
        profile.investment_interests = details_update.investmentInterests
    if details_update.portfolioOverview is not None:
        profile.portfolio_overview = details_update.portfolioOverview
    if details_update.investmentStrategy is not None:
        profile.investment_strategy = details_update.investmentStrategy
    if details_update.testimonials is not None:
        profile.testimonials = details_update.testimonials
    if details_update.media is not None:
        profile.media = details_update.media
    db.commit()
    db.refresh(profile)
    return profile

# ---------------------------------------------------
# Endpoint to delete the user account (cascade deletes profile)
# ---------------------------------------------------

@router.delete("/user/{user_id}")
def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if user_id != current_user.user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to delete this account.")
    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    db.delete(user)
    db.commit()
    return {"detail": "User deleted successfully"}


@router.post("/user/{user_id}/upload_profile_image")
async def upload_profile_image(
    user_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if user_id != current_user.user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to update this profile image."
        )
    
    if file.content_type not in ["image/jpeg", "image/png"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid file type. Only JPEG and PNG are allowed."
        )
    
    # Generate a unique filename for the uploaded file
    file_extension = file.filename.split(".")[-1]
    unique_filename = f"{uuid.uuid4()}.{file_extension}"
    
    # Ensure the directory exists
    upload_dir = "profile_images"
    os.makedirs(upload_dir, exist_ok=True)
    file_location = os.path.join(upload_dir, unique_filename)
    
    # Save the file to disk
    with open(file_location, "wb") as buffer:
        buffer.write(await file.read())
    
    # Update the user's profile_image to the URL path (not filesystem path)
    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # This is the key part: returning the URL the client can use
    image_url = f"/profile_images/{unique_filename}"
    user.profile_image = image_url
    db.commit()
    db.refresh(user)
    
    return {"profileImage": image_url}



@router.post("/properties/", response_model=PropertyResponse)
def create_property(property: PropertyCreate, db: Session = Depends(get_db)):
    db_property = Property(**property.dict())
    db.add(db_property)
    db.commit()
    db.refresh(db_property)
    return db_property


@router.put("/properties/{property_id}", response_model=PropertyResponse)
def update_property(
    property_id: int,
    property_update: PropertyCreate,  # or a dedicated update schema if defined
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    property_item = db.query(Property).filter(Property.property_id == property_id).first()
    if not property_item:
        raise HTTPException(status_code=404, detail="Property not found")
    if property_item.user_id != current_user.user_id:
        raise HTTPException(status_code=403, detail="Not authorized to update this property")
    
    # Update fields from the payload (only update provided fields)
    update_data = property_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(property_item, key, value)
    
    db.commit()
    db.refresh(property_item)
    return property_item


@router.get("/properties/user", response_model=List[PropertyResponse])
def get_user_properties(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    print("Current user id:", current_user.user_id)
    properties = db.query(Property).filter(Property.user_id == current_user.user_id).all()
    print("Properties found:", properties)
    return properties


@router.get("/properties", response_model=List[PropertyResponse])
def get_all_properties_excluding_current(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Query properties where the user_id is not equal to the current user's ID
    properties = db.query(Property).filter(Property.user_id != current_user.user_id).all()
    return properties



@router.get("/property/{property_id}", response_model=PropertyResponse)
def get_property(property_id: int, db: Session = Depends(get_db)):
    property = db.query(Property).filter(Property.property_id == property_id).first()
    if not property:
        raise HTTPException(status_code=404, detail="Property not found")
    return property



@router.post("/properties/{property_id}/upload_media")
def upload_property_media(
    property_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # (Implement file storage logic here, e.g., save to disk or cloud storage)
    # For now, we simulate by returning the filename.
    filename = file.filename
    # Optionally update your property record with the filename/path
    return {"property_id": property_id, "filename": filename}


@router.post("/properties/{property_id}/upload_images")
async def upload_property_images(
    property_id: int,
    files: List[UploadFile] = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Verify the property exists and belongs to the current user
    property_item = db.query(Property).filter(Property.property_id == property_id).first()
    if not property_item:
        raise HTTPException(status_code=404, detail="Property not found")
    if property_item.user_id != current_user.user_id:
        raise HTTPException(status_code=403, detail="Not authorized to upload images for this property")
    
    upload_dir = "property_images"
    os.makedirs(upload_dir, exist_ok=True)
    uploaded_urls = []
    
    for file in files:
        if file.content_type not in ["image/jpeg", "image/png"]:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid file type. Only JPEG and PNG are allowed."
            )
        file_ext = file.filename.split(".")[-1]
        unique_filename = f"{uuid.uuid4()}.{file_ext}"
        file_path = os.path.join(upload_dir, unique_filename)
        with open(file_path, "wb") as buffer:
            buffer.write(await file.read())
        # Create a new PropertyImage record
        new_image = PropertyImage(property_id=property_id, image_url=f"/property_images/{unique_filename}")
        db.add(new_image)
        db.commit()
        db.refresh(new_image)
        uploaded_urls.append(new_image.image_url)
    
    return {"detail": "Images uploaded successfully", "image_urls": uploaded_urls}



@router.delete("/properties/{property_id}")
def delete_property(
    property_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Query the property
    property_item = db.query(Property).filter(Property.property_id == property_id).first()
    if not property_item:
        raise HTTPException(status_code=404, detail="Property not found")
    
    # Ensure that the property belongs to the current user
    if property_item.user_id != current_user.user_id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this property")
    
    db.delete(property_item)
    db.commit()
    return {"detail": "Property deleted successfully"}



@router.post("/projects/", response_model=ProjectResponse)
def create_project(project: ProjectCreate, db: Session = Depends(get_db)):
    db_project = Project(**project.dict())
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

@router.get("/projects", response_model=List[ProjectResponse])
def get_all_projects_for_user(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    projects = db.query(Project).filter(Project.user_id == current_user.user_id).all()
    return projects

@router.get("/project/{project_id}", response_model=ProjectResponse)
def get_project_detail(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.project_id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@router.get("/all-projects", response_model=List[ProjectResponse])
def get_all_projects(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    projects = db.query(Project).filter(Project.user_id != current_user.user_id).all()
    return projects


@router.get("/api/public_data")
def public_data():
    return {"message": "This is public data. No login required."}


@router.delete("/project/{project_id}")
def delete_project(project_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    project = db.query(Project).filter(Project.project_id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    if project.user_id != current_user.user_id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this project")
    db.delete(project)
    db.commit()
    return {"detail": "Project deleted successfully"}
