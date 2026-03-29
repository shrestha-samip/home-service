from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# Import your engine and Base from your db file
from db import engine, Base 
from routes import routers
# CRITICAL: You must import your models so SQLAlchemy "sees" them
import models 

# 1. Initialize the app ONLY ONCE
app = FastAPI(title="Home Service API")

# 2. Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Create the tables
# This works now because 'import models' registered the classes to Base.metadata
Base.metadata.create_all(bind=engine)

for router, prefix, tags in routers:
    app.include_router(router, prefix=prefix, tags=tags)
@app.get("/")
def root():
    return {"message": "Home Service API Running and Tables Created"}