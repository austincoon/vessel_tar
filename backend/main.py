# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from routes import router  # assuming routes.py exports 'router'

import os
# Configure logging if not already
import logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

origins = [
    "http://localhost:3000",  # Frontend origin
    # Add other origins if needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Specify your frontend's origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.on_event("startup")
async def startup_event():
    logger.info("Application startup")

@app.on_event("shutdown")
async def shutdown_event():
    logger.info("Application shutdown")

app.mount("/profile_images", StaticFiles(directory="profile_images"), name="profile_images")

upload_dir = "property_images"
if not os.path.exists(upload_dir):
    os.makedirs(upload_dir)

app.mount("/property_images", StaticFiles(directory="property_images"), name="property_images")
