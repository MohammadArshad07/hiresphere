from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db.database import engine, Base

from app.models.user import User
from app.models.job import Job

from app.api.auth import router as auth_router
from app.api.login import router as login_router
from app.api.jobs import router as jobs_router

from app.models.application import Application

from app.api.applications import router as applications_router

from app.api import dashboard
from app.core.config import CORS_ORIGINS

app = FastAPI(
    title="HireSphere API",
    version="1.0.0"
)


# CREATE DATABASE TABLES

Base.metadata.create_all(bind=engine)


# CORS

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ROUTERS

app.include_router(
    auth_router,
    prefix="/auth",
    tags=["Authentication"]
)

app.include_router(
    login_router,
    prefix="/auth",
    tags=["Authentication"]
)

app.include_router(
    jobs_router,
    prefix="/jobs",
    tags=["Jobs"]
)
app.include_router(
    applications_router,
    prefix="/applications",
    tags=["Applications"]
)

app.include_router(
    dashboard.router,
    prefix="/dashboard",
    tags=["Dashboard"]
)

# ROOT ROUTE

@app.get("/")
async def root():
    return {
        "message": "HireSphere API Running"
    }


# HEALTH CHECK

@app.get("/health")
async def health():
    return {
        "status": "healthy"
    }