from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db import SessionLocal
import models

router = APIRouter(prefix="/bookings", tags=["Bookings"])


# ---------------- DB Dependency ----------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ---------------- Create Booking ----------------
@router.post("/")
def create_booking(
    customer_id: int,
    provider_id: int,
    service_id: int,
    date: str,
    time: str,
    address: str,
    phone: str,
    db: Session = Depends(get_db)
):

    # Check if users & service exist
    customer = db.query(models.User).filter(models.User.id == customer_id).first()
    provider = db.query(models.User).filter(models.User.id == provider_id).first()
    service = db.query(models.Service).filter(models.Service.id == service_id).first()

    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    if not provider:
        raise HTTPException(status_code=404, detail="Provider not found")
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")

    new_booking = models.Booking(
        customer_id=customer_id,
        provider_id=provider_id,
        service_id=service_id,
        date=date,
        time=time,
        address=address,
        phone=phone
    )

    db.add(new_booking)
    db.commit()
    db.refresh(new_booking)

    return {
        "message": "Booking created",
        "booking_id": new_booking.id,
        "status": new_booking.status
    }


# ---------------- Get All Bookings ----------------
@router.get("/")
def get_all_bookings(db: Session = Depends(get_db)):

    bookings = db.query(models.Booking).all()
    return bookings


# ---------------- Get Booking by ID ----------------
@router.get("/{booking_id}")
def get_booking(booking_id: int, db: Session = Depends(get_db)):

    booking = db.query(models.Booking).filter(models.Booking.id == booking_id).first()

    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    return booking


# ---------------- Update Booking Status ----------------
@router.put("/{booking_id}/status")
def update_booking_status(booking_id: int, status: str, db: Session = Depends(get_db)):

    booking = db.query(models.Booking).filter(models.Booking.id == booking_id).first()

    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    if status not in ["pending", "accepted", "completed"]:
        raise HTTPException(status_code=400, detail="Invalid status")

    booking.status = status
    db.commit()

    return {
        "message": "Booking status updated",
        "new_status": booking.status
    }


# ---------------- Get Bookings by Customer ----------------
@router.get("/customer/{customer_id}")
def get_customer_bookings(customer_id: int, db: Session = Depends(get_db)):

    bookings = db.query(models.Booking).filter(models.Booking.customer_id == customer_id).all()
    return bookings


# ---------------- Get Bookings by Provider ----------------
@router.get("/provider/{provider_id}")
def get_provider_bookings(provider_id: int, db: Session = Depends(get_db)):

    bookings = db.query(models.Booking).filter(models.Booking.provider_id == provider_id).all()
    return bookings


# ---------------- Delete Booking ----------------
@router.delete("/{booking_id}")
def delete_booking(booking_id: int, db: Session = Depends(get_db)):

    booking = db.query(models.Booking).filter(models.Booking.id == booking_id).first()

    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    db.delete(booking)
    db.commit()

    return {"message": "Booking deleted"}