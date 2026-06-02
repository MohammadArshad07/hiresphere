import fitz
import re


# COMMON TECH SKILLS

COMMON_SKILLS = [

    "python",
    "java",
    "javascript",
    "typescript",
    "react",
    "next.js",
    "node.js",
    "fastapi",
    "django",
    "flask",
    "sql",
    "postgresql",
    "mongodb",
    "docker",
    "aws",
    "git",
    "html",
    "css",
    "tailwind",
    "machine learning",
    "ai",
    "data structures",
    "algorithms",
]


# EXTRACT TEXT FROM PDF

def extract_text_from_pdf(
    pdf_path: str
):

    text = ""

    document = fitz.open(pdf_path)

    for page in document:

        text += page.get_text()

    return text.lower()


# DETECT SKILLS

def detect_skills(text: str):

    detected_skills = []

    for skill in COMMON_SKILLS:

        if skill.lower() in text:

            detected_skills.append(skill)

    return detected_skills


# ATS SCORE CALCULATION

# ATS SCORE CALCULATION

def calculate_ats_score(
    text: str,
    skills: list
):

    score = 0

    feedback = []


    # RESUME LENGTH

    if len(text) > 2500:

        score += 20

    elif len(text) > 1500:

        score += 15

    elif len(text) > 800:

        score += 10

    else:

        score += 5

        feedback.append(
            "Resume content is too short"
        )


    # SKILLS SCORING

    skill_count = len(skills)


    if skill_count >= 10:

        score += 30

    elif skill_count >= 7:

        score += 24

    elif skill_count >= 5:

        score += 18

    elif skill_count >= 3:

        score += 10

    else:

        score += 5

        feedback.append(
            "Add more relevant technical skills"
        )


    # IMPORTANT SECTIONS

    important_sections = [

        "education",
        "experience",
        "projects",
        "skills",
        "certifications",
    ]


    found_sections = 0


    for section in important_sections:

        if section in text:

            found_sections += 1


    score += found_sections * 8


    if found_sections < 3:

        feedback.append(
            "Resume missing important sections"
        )


    # CONTACT INFO

    email_pattern = r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+"


    if re.search(email_pattern, text):

        score += 10

    else:

        feedback.append(
            "Email address missing"
        )


    # PROJECT QUALITY CHECK

    if "github" in text:

        score += 5

    else:

        feedback.append(
            "Add GitHub project links"
        )


    # EXPERIENCE BONUS

    if "intern" in text or "experience" in text:

        score += 10

    else:

        feedback.append(
            "Add practical experience or internships"
        )


    # LIMITS

    if score > 95:

        score = 95


    # LOW QUALITY FLOOR

    if score < 35:

        score = 35


    return {

        "score": score,

        "feedback": feedback,
    }