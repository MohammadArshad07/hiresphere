from app.services.ats_service import (
    extract_text_from_pdf,
    detect_skills,
    calculate_ats_score
)

from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.schemas.user import (
    UserCreate,
)

from app.models.user import User

from app.db.database import SessionLocal

from app.core.security import (
    hash_password
)

from app.core.dependencies import (
    get_current_user
)

from app.services.cloudinary_service import (
    upload_resume_to_cloudinary
)


router = APIRouter(
    tags=["Authentication"]
)



# DATABASE SESSION

def get_db():

    db = SessionLocal()

    try:

        yield db

    finally:

        db.close()



# SIGNUP

@router.post("/signup")

def signup(
    user: UserCreate,
    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()


    # EMAIL EXISTS

    if existing_user:

        raise HTTPException(

            status_code=400,

            detail="Email already registered"
        )


    # HASH PASSWORD

    hashed_pw = hash_password(
        user.password
    )


    # CREATE USER

    new_user = User(

        name=user.name,

        email=user.email,

        password=hashed_pw,

        role=user.role
    )


    db.add(new_user)

    db.commit()

    db.refresh(new_user)


    return {

        "message":
            "User created successfully"
    }



# UPLOAD RESUME

@router.post("/upload-resume")

async def upload_resume(

    file: UploadFile = File(...),

    current_user: User = Depends(
        get_current_user
    ),

    db: Session = Depends(get_db)
):


    # PDF VALIDATION

    if file.content_type != "application/pdf":

        raise HTTPException(

            status_code=400,

            detail="Only PDF resumes allowed"
        )


    # CLOUDINARY UPLOAD

    resume_url = await upload_resume_to_cloudinary(
        file
    )


    # FIND USER

    user = db.query(User).filter(
        User.id == current_user.id
    ).first()


    if not user:

        raise HTTPException(

            status_code=404,

            detail="User not found"
        )


    # SAVE RESUME URL

    user.resume_url = resume_url

    db.commit()

    db.refresh(user)


    return {

        "message":
            "Resume uploaded successfully",

        "resume_url":
            resume_url
    }



# ATS RESUME ANALYZER

@router.post("/analyze-resume")

async def analyze_resume(

    file: UploadFile = File(...)
):


    # PDF VALIDATION

    if file.content_type != "application/pdf":

        raise HTTPException(

            status_code=400,

            detail="Only PDF files allowed"
        )


    # TEMP FILE

    temp_path = f"temp_{file.filename}"


    with open(temp_path, "wb") as buffer:

        buffer.write(
            await file.read()
        )


    # EXTRACT TEXT

    extracted_text = extract_text_from_pdf(
        temp_path
    )


    # DETECT SKILLS

    detected_skills = detect_skills(
        extracted_text
    )


    # ATS SCORE

    ats_result = calculate_ats_score(

        extracted_text,

        detected_skills
    )


    return {

        "ats_score":
            ats_result["score"],

        "detected_skills":
            detected_skills,

        "feedback":
            ats_result["feedback"],
    }