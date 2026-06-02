import cloudinary
import cloudinary.uploader

from fastapi import UploadFile

import os


cloudinary.config(

    cloud_name=os.getenv(
        "CLOUDINARY_CLOUD_NAME"
    ),

    api_key=os.getenv(
        "CLOUDINARY_API_KEY"
    ),

    api_secret=os.getenv(
        "CLOUDINARY_API_SECRET"
    ),
)


async def upload_resume_to_cloudinary(
    file: UploadFile
):

    result = cloudinary.uploader.upload(

        file.file,

        resource_type="raw",

        folder="hiresphere_resumes",
    )

    return result["secure_url"]