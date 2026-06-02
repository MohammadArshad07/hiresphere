from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from jose import jwt
from datetime import datetime, timedelta

from app.db.database import SessionLocal
from app.models.user import User
from app.schemas.user import LoginSchema
from app.core.security import verify_password

router = APIRouter()

SECRET_KEY = "sJTLPeefVBZs4YL8s8Q8thrufdK9cDaA6a9YAJJYUfw="
ALGORITHM = "HS256"


# Database Dependency

def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# Login Route

@router.post("/login")

def login(
    user: LoginSchema,
    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if not existing_user:

        raise HTTPException(
            status_code=401,
            detail="Invalid email"
        )

    valid_password = verify_password(
        user.password,
        existing_user.password
    )

    if not valid_password:

        raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )

    payload = {
        "user_id": existing_user.id,
        "email": existing_user.email,
        "role": existing_user.role,
        "exp": datetime.utcnow() + timedelta(days=7)
    }

    token = jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": existing_user.id,
            "name": existing_user.name,
            "email": existing_user.email,
            "role": existing_user.role
        }
    }