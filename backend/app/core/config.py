import os

from dotenv import load_dotenv

load_dotenv()

JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
if not JWT_SECRET_KEY:
    raise ValueError(
        "JWT_SECRET_KEY not found"
    )

JWT_ALGORITHM = os.getenv(
    "JWT_ALGORITHM",
    "HS256"
)

cors_origins = os.getenv(
    "CORS_ORIGINS",
    "http://localhost:3000"
)

CORS_ORIGINS = [
    origin.strip()
    for origin in cors_origins.split(",")
    if origin.strip()
]
