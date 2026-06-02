from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    ForeignKey
)

from sqlalchemy.orm import relationship

from datetime import datetime

from app.db.database import Base


class Application(Base):

    __tablename__ = "applications"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )


    job_id = Column(
        Integer,
        ForeignKey("jobs.id")
    )


    status = Column(
        String,
        default="Applied"
    )


    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )


    # RELATIONSHIPS

    user = relationship(
        "User",
        backref="applications"
    )


    job = relationship(
        "Job",
        backref="applications"
    )