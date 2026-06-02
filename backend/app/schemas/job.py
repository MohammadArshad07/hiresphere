from pydantic import BaseModel


class JobCreate(BaseModel):

    title: str
    company: str
    location: str
    salary: str
    description: str
    requirements: str


class JobResponse(BaseModel):

    id: int
    title: str
    company: str
    location: str
    salary: str
    description: str
    requirements: str

    class Config:
        from_attributes = True