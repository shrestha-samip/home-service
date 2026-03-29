from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db import SessionLocal
import models
from schemas import BookingCreateBody, BookingStatusBody

router = APIRouter(prefix="/bookings", tags=["Bookings"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def booking_to_dict(booking: models.Booking, db: Session) -> dict:
    customer = (
        db.query(models.User).filter(models.User.id == booking.customer_id).first()
    )
    provider = (
        db.query(models.User).filter(models.User.id == booking.provider_id).first()
    )
    service = (
        db.query(models.Service).filter(models.Service.id == booking.service_id).first()
    )
    return {
        "id": booking.id,
        "customer_id": booking.customer_id,
        "provider_id": booking.provider_id,
        "service_id": booking.service_id,
        "service_name": service.name if service else None,
        "provider_name": provider.name if provider else None,
        "customer_name": customer.name if customer else None,
        "date": booking.date,
        "time": booking.time,
        "address": booking.address,
        "phone": booking.phone,
        "status": booking.status,
        "price": service.price if service else None,
    }


@router.post("/")
def create_booking(body: BookingCreateBody, db: Session = Depends(get_db)):
    customer = db.query(models.User).filter(models.User.id == body.customer_id).first()
    provider = db.query(models.User).filter(models.User.id == body.provider_id).first()
    service = db.query(models.Service).filter(models.Service.id == body.service_id).first()

    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    if not provider:
        raise HTTPException(status_code=404, detail="Provider not found")
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")

    new_booking = models.Booking(
        customer_id=body.customer_id,
        provider_id=body.provider_id,
        service_id=body.service_id,
        date=body.date,
        time=body.time,
        address=body.address,
        phone=body.phone,
    )

    db.add(new_booking)
    db.commit()
    db.refresh(new_booking)

    return {
        "message": "Booking created",
        "booking": booking_to_dict(new_booking, db),
    }


@router.get("/")
def get_all_bookings(db: Session = Depends(get_db)):
    bookings = db.query(models.Booking).order_by(models.Booking.id.desc()).all()
    return [booking_to_dict(b, db) for b in bookings]


@router.get("/{booking_id}")
def get_booking(booking_id: int, db: Session = Depends(get_db)):
    booking = db.query(models.Booking).filter(models.Booking.id == booking_id).first()

    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    return booking_to_dict(booking, db)


@router.put("/{booking_id}/status")
def update_booking_status(
    booking_id: int, body: BookingStatusBody, db: Session = Depends(get_db)
):
    booking = db.query(models.Booking).filter(models.Booking.id == booking_id).first()

    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    if body.status not in ["pending", "accepted", "completed"]:
        raise HTTPException(status_code=400, detail="Invalid status")

    booking.status = body.status
    db.commit()

    return {
        "message": "Booking status updated",
        "new_status": booking.status,
    }


@router.get("/customer/{customer_id}")
def get_customer_bookings(customer_id: int, db: Session = Depends(get_db)):
    bookings = (
        db.query(models.Booking)
        .filter(models.Booking.customer_id == customer_id)
        .order_by(models.Booking.id.desc())
        .all()
    )
    return [booking_to_dict(b, db) for b in bookings]


@router.get("/provider/{provider_id}")
def get_provider_bookings(provider_id: int, db: Session = Depends(get_db)):
    bookings = (
        db.query(models.Booking)
        .filter(models.Booking.provider_id == provider_id)
        .order_by(models.Booking.id.desc())
        .all()
    )
    return [booking_to_dict(b, db) for b in bookings]


@router.delete("/{booking_id}")
def delete_booking(booking_id: int, db: Session = Depends(get_db)):
    booking = db.query(models.Booking).filter(models.Booking.id == booking_id).first()

    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    db.delete(booking)
    db.commit()

    return {"message": "Booking deleted"}
