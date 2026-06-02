from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.db.database import SessionLocal

from app.models.job import Job
from app.models.user import User

from app.schemas.job import (
    JobCreate,
    JobResponse
)

from app.core.dependencies import get_current_user


router = APIRouter()


# Database Dependency

def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# CREATE JOB

@router.post("/create")

def create_job(

    job: JobCreate,

    db: Session = Depends(get_db)
):

    new_job = Job(

        title=job.title,
        company=job.company,
        location=job.location,
        salary=job.salary,
        description=job.description,
        requirements=job.requirements,

        recruiter_id=1
    )

    db.add(new_job)

    db.commit()

    db.refresh(new_job)

    return {
        "message": "Job created successfully",
        "job_id": new_job.id
    }


# GET ALL JOBS

@router.get("/all")

def get_jobs(
    db: Session = Depends(get_db)
):

    jobs = db.query(Job).all()

    return jobs