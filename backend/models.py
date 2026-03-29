from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from db import Base


# -------------------------
# User
# -------------------------
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    phone = Column(String)
    password = Column(String, nullable=False)

    role = Column(String, nullable=False)  # "customer" or "provider"

    # provider-only fields
    experience = Column(Integer)
    specialization = Column(String)

    created_at = Column(DateTime, server_default=func.now())

    # relationships
    customer_bookings = relationship(
        "Booking",
        foreign_keys="Booking.customer_id",
        back_populates="customer"
    )

    provider_bookings = relationship(
        "Booking",
        foreign_keys="Booking.provider_id",
        back_populates="provider"
    )


# -------------------------
# Service (predefined list)
# -------------------------
class Service(Base):
    __tablename__ = "services"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)

    bookings = relationship("Booking", back_populates="service")
    price = Column(String, nullable=True)


# -------------------------
# Booking
# -------------------------
class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True)

    customer_id = Column(Integer, ForeignKey("users.id"))
    # Null until a provider accepts the booking (open / marketplace jobs)
    provider_id = Column(Integer, ForeignKey("users.id"), nullable=True)

    service_id = Column(Integer, ForeignKey("services.id"))

    date = Column(String)
    time = Column(String)

    address = Column(Text)
    phone = Column(String)

    status = Column(String, default="pending")  # pending, accepted, completed

    created_at = Column(DateTime, server_default=func.now())

    # relationships
    customer = relationship("User", foreign_keys=[customer_id], back_populates="customer_bookings")
    provider = relationship("User", foreign_keys=[provider_id], back_populates="provider_bookings")
    service = relationship("Service", back_populates="bookings")