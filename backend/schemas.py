from pydantic import BaseModel
from typing import Optional


class SignupBody(BaseModel):
    name: str
    email: str
    phone: str
    password: str
    role: str  # "customer" or "provider"
    experience: Optional[int] = None
    specialization: Optional[str] = None


class LoginBody(BaseModel):
    email: str
    password: str


class BookingCreateBody(BaseModel):
    customer_id: int
    service_id: int
    date: str
    time: str
    address: str
    phone: str
    provider_id: Optional[int] = None  # optional; open job if omitted


class BookingStatusBody(BaseModel):
    status: str
    # Required when accepting an open booking (assigns this provider)
    provider_id: Optional[int] = None
