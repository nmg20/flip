from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from database import base

class User(base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), index=True, unique=True, nullable=False)
    password = Column(String(20), nullable=False)

    animations = relationship("Animation", back_populates="user")
