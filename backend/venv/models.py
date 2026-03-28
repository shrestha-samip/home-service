from sqlalchemy import Column, Integer, String, Text, Enum, ForeignKey, TIMESTAMP
from sqlalchemy.orm import relationship, declarative_base
from sqlalchemy.sql import func
import enum
from db import Base
Base = declarative_base()


# -------------------------
# ENUM for Workout Difficulty
# -------------------------
class DifficultyLevel(enum.Enum):
    Beginner = "Beginner"
    Intermediate = "Intermediate"
    Advanced = "Advanced"


# -------------------------
# Users Table
# -------------------------
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    gender = Column(String(10))
    age = Column(Integer)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

    # Relationship → Workout History
    workout_history = relationship("WorkoutHistory", back_populates="user", cascade="all, delete")


# -------------------------
# Workouts Table
# -------------------------
class Workout(Base):
    __tablename__ = "workouts"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    description = Column(Text)
    difficulty = Column(Enum(DifficultyLevel))
    duration_minutes = Column(Integer)
    calories_burn_est = Column(Integer)
    photo_url = Column(Text)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

    # Relationship → Workout History
    workout_history = relationship("WorkoutHistory", back_populates="workout", cascade="all, delete")


# -------------------------
# Workout History Table
# -------------------------
class WorkoutHistory(Base):
    __tablename__ = "workout_history"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    workout_id = Column(Integer, ForeignKey("workouts.id", ondelete="CASCADE"), nullable=False)

    completed_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    duration_minutes = Column(Integer)
    calories_burned = Column(Integer)
    notes = Column(Text)

    # Relationships
    user = relationship("User", back_populates="workout_history")
    workout = relationship("Workout", back_populates="workout_history")