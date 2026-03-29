from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db import SessionLocal, engine, Base
from routes import routers
import models

app = FastAPI(title="Home Service API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)


def seed_default_services():
    db = SessionLocal()
    try:
        if db.query(models.Service).count() == 0:
            defaults = [
                ("House Cleaning", "₹500-1000"),
                ("Plumbing", "₹300-800"),
                ("Electrical Work", "₹400-1200"),
                ("Painting", "₹800-2000"),
                ("General Repairs", "₹250-600"),
            ]
            for name, price in defaults:
                db.add(models.Service(name=name, price=price))
            db.commit()
    finally:
        db.close()


seed_default_services()

for router, prefix, tags in routers:
    app.include_router(router, prefix=prefix, tags=tags)
@app.get("/")
def root():
    return {"message": "Home Service API Running and Tables Created"}