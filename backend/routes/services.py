from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db import SessionLocal
import models

router = APIRouter(prefix="/services", tags=["Services"])


# ---------------- DB Dependency ----------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ---------------- Create Service ----------------
@router.post("/")
def create_service(name: str, price: str = None, db: Session = Depends(get_db)):

    new_service = models.Service(
        name=name,
        price=price
    )

    db.add(new_service)
    db.commit()
    db.refresh(new_service)

    return {
        "message": "Service created",
        "service_id": new_service.id
    }


# ---------------- Get All Services ----------------
def _service_row(s: models.Service) -> dict:
    return {"id": s.id, "name": s.name, "price": s.price}


@router.get("/")
def get_services(db: Session = Depends(get_db)):
    services = db.query(models.Service).order_by(models.Service.id).all()
    return [_service_row(s) for s in services]


# ---------------- Get Single Service ----------------
@router.get("/{service_id}")
def get_service(service_id: int, db: Session = Depends(get_db)):
    service = db.query(models.Service).filter(models.Service.id == service_id).first()

    if not service:
        raise HTTPException(status_code=404, detail="Service not found")

    return _service_row(service)


# ---------------- Delete Service ----------------
@router.delete("/{service_id}")
def delete_service(service_id: int, db: Session = Depends(get_db)):

    service = db.query(models.Service).filter(models.Service.id == service_id).first()

    if not service:
        raise HTTPException(status_code=404, detail="Service not found")

    db.delete(service)
    db.commit()

    return {"message": "Service deleted"}