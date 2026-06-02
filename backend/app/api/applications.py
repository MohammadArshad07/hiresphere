from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.db.database import SessionLocal

from app.models.application import Application
from app.models.job import Job
from app.models.user import User

from app.core.dependencies import get_current_user


router = APIRouter()


# DATABASE SESSION

def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# APPLY TO JOB

@router.post("/apply/{job_id}")

def apply_job(
    job_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    # Only job seekers can apply

    if current_user.role != "jobseeker":

        raise HTTPException(
            status_code=403,
            detail="Only job seekers can apply"
        )

    # Check if job exists

    job = db.query(Job).filter(
        Job.id == job_id
    ).first()

    if not job:

        raise HTTPException(
            status_code=404,
            detail="Job not found"
        )

    # Prevent duplicate applications

    existing_application = db.query(Application).filter(
        Application.user_id == current_user.id,
        Application.job_id == job_id
    ).first()

    if existing_application:

        raise HTTPException(
            status_code=400,
            detail="You already applied for this job"
        )

    new_application = Application(

        user_id=current_user.id,
        job_id=job_id,
        status="Applied"
    )

    db.add(new_application)

    db.commit()

    db.refresh(new_application)

    return {
        "message": "Application submitted successfully"
    }


# GET ALL APPLICATIONS

@router.get("/all")

def get_all_applications(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    # Only recruiters can view applications

    if current_user.role != "recruiter":

        raise HTTPException(
            status_code=403,
            detail="Only recruiters can view applications"
        )


    # Get recruiter jobs

    recruiter_jobs = db.query(Job).filter(
        Job.recruiter_id == current_user.id
    ).all()


    recruiter_job_ids = [
        job.id for job in recruiter_jobs
    ]


    # Get only applications related to recruiter jobs

    applications = db.query(Application).filter(
        Application.job_id.in_(recruiter_job_ids)
    ).all()


    results = []


    for application in applications:

        applicant = db.query(User).filter(
            User.id == application.user_id
        ).first()


        job = db.query(Job).filter(
            Job.id == application.job_id
        ).first()


        results.append({

            "application_id": application.id,

            "applicant_name":
                applicant.name,

            "applicant_email":
                applicant.email,

            "job_title":
                job.title,

            "company":
                job.company,

            "status":
                application.status,

            "applied_at":
                application.created_at,

        })


    return results

# UPDATE APPLICATION STATUS

@router.patch("/update-status/{application_id}")

def update_application_status(
    application_id: int,
    status: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    # ONLY RECRUITERS

    if current_user.role != "recruiter":

        raise HTTPException(
            status_code=403,
            detail="Only recruiters can update application status"
        )


    # FIND APPLICATION

    application = db.query(Application).filter(
        Application.id == application_id
    ).first()


    if not application:

        raise HTTPException(
            status_code=404,
            detail="Application not found"
        )


    # FIND JOB

    job = db.query(Job).filter(
        Job.id == application.job_id
    ).first()


    if not job:

        raise HTTPException(
            status_code=404,
            detail="Job not found"
        )


    # SECURITY CHECK
    # Recruiter can update ONLY own job applications

    if job.recruiter_id != current_user.id:

        raise HTTPException(
            status_code=403,
            detail="Unauthorized action"
        )


    # ALLOWED STATUSES

    allowed_statuses = [

        "Applied",

        "Shortlisted",

        "Interview Scheduled",

        "Hired",

        "Rejected",
    ]


    if status not in allowed_statuses:

        raise HTTPException(
            status_code=400,
            detail="Invalid status"
        )


    # UPDATE STATUS

    application.status = status

    db.commit()

    db.refresh(application)


    return {

        "message":
            "Application status updated successfully",

        "new_status":
            application.status,
    }