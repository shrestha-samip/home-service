from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from db import SessionLocal
import models

router = APIRouter()

pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")


# ---------------- DB Dependency ----------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ---------------- Password Helpers ----------------
def hash_password(password: str):
    return pwd_context.hash(password)


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


# ---------------- Signup ----------------
@router.post("/signup")
def signup(
    name: str,
    email: str,
    phone: str,
    password: str,
    role: str,  # "customer" or "provider"
    experience: int = None,
    specialization: str = None,
    db: Session = Depends(get_db)
):

    # Check existing user
    existing_user = db.query(models.User).filter(models.User.email == email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Validate role
    if role not in ["customer", "provider"]:
        raise HTTPException(status_code=400, detail="Invalid role")

    # If provider, require extra fields
    if role == "provider":
        if experience is None or specialization is None:
            raise HTTPException(status_code=400, detail="Provider must have experience and specialization")

    # Create user
    new_user = models.User(
        name=name,
        email=email,
        phone=phone,
        password=hash_password(password),
        role=role,
        experience=experience if role == "provider" else None,
        specialization=specialization if role == "provider" else None
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User created successfully",
        "user_id": new_user.id,
        "role": new_user.role
    }


# ---------------- Login ----------------
@router.post("/login")
def login(email: str, password: str, db: Session = Depends(get_db)):

    user = db.query(models.User).filter(models.User.email == email).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if not verify_password(password, user.password):
        raise HTTPException(status_code=401, detail="Invalid password")

    return {
        "message": "Login successful",
        "user_id": user.id,
        "name": user.name,
        "role": user.role
    }