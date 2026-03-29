from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from db import SessionLocal
import models
from schemas import SignupBody, LoginBody

router = APIRouter()

pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def hash_password(password: str):
    return pwd_context.hash(password)


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


@router.post("/signup")
def signup(body: SignupBody, db: Session = Depends(get_db)):
    existing_user = db.query(models.User).filter(models.User.email == body.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    if body.role not in ["customer", "provider"]:
        raise HTTPException(status_code=400, detail="Invalid role")

    if body.role == "provider":
        if body.experience is None or not body.specialization:
            raise HTTPException(status_code=400, detail="Provider must have experience and specialization")

    new_user = models.User(
        name=body.name,
        email=body.email,
        phone=body.phone,
        password=hash_password(body.password),
        role=body.role,
        experience=body.experience if body.role == "provider" else None,
        specialization=body.specialization if body.role == "provider" else None,
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User created successfully",
        "user_id": new_user.id,
        "name": new_user.name,
        "role": new_user.role,
    }


@router.post("/login")
def login(body: LoginBody, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == body.email).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if not verify_password(body.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid password")

    return {
        "message": "Login successful",
        "user_id": user.id,
        "name": user.name,
        "role": user.role,
    }


@router.get("/providers")
def list_providers(db: Session = Depends(get_db)):
    rows = (
        db.query(models.User)
        .filter(models.User.role == "provider")
        .order_by(models.User.name)
        .all()
    )
    return [
        {
            "id": u.id,
            "name": u.name,
            "email": u.email,
            "phone": u.phone,
            "experience": u.experience,
            "specialization": u.specialization,
        }
        for u in rows
    ]


@router.get("/stats")
def platform_stats(db: Session = Depends(get_db)):
    total_bookings = db.query(models.Booking).count()
    completed = (
        db.query(models.Booking).filter(models.Booking.status == "completed").count()
    )
    active_providers = (
        db.query(models.User).filter(models.User.role == "provider").count()
    )
    return {
        "total_bookings": total_bookings,
        "completed_services": completed,
        "active_providers": active_providers,
        "revenue": 0,
    }
