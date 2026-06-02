from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from app.db.database import SessionLocal

from app.models.job import Job
from app.models.application import Application
from app.models.user import User


router = APIRouter()



# DATABASE SESSION

def get_db():

    db = SessionLocal()

    try:

        yield db

    finally:

        db.close()



# SEEKER DASHBOARD ANALYTICS

@router.get("/seeker")

def seeker_dashboard(

    db: Session = Depends(get_db)

):

    applications = db.query(
        Application
    ).all()


    recent_applications = []


    for app in applications[-5:]:

        job = db.query(Job).filter(
            Job.id == app.job_id
        ).first()


        if job:

            recent_applications.append({

                "job_title":
                    job.title,

                "company":
                    job.company,

                "status":
                    app.status,

            })


    return {

        "applications_count":
            len(applications),

        "recent_applications":
            recent_applications,

    }



# RECRUITER DASHBOARD ANALYTICS

@router.get("/recruiter")

def recruiter_dashboard(

    db: Session = Depends(get_db)

):

    # TEMPORARY:
    # FETCH ALL JOBS

    jobs = db.query(Job).all()


    job_ids = [
        job.id for job in jobs
    ]


    applications = db.query(
        Application
    ).filter(

        Application.job_id.in_(
            job_ids
        )

    ).all()


    recent_applicants = []


    for app in applications[-5:]:

        applicant = db.query(User).filter(
            User.id == app.user_id
        ).first()


        job = db.query(Job).filter(
            Job.id == app.job_id
        ).first()


        if applicant and job:

            recent_applicants.append({

                "application_id":
                    app.id,

                "name":
                    applicant.name,

                "email":
                    applicant.email,

                "job_title":
                    job.title,

                "status":
                    app.status,

                "resume_url":
                    applicant.resume_url,

            })


    return {

        "jobs_posted":
            len(jobs),

        "applications_received":
            len(applications),

        "recent_applicants":
            recent_applicants,

    }