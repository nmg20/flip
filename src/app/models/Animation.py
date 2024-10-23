from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import base

class Animation(base):
    __tablename__ = "animations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    frames = Column(String, nullable=False) # Guardar frames como JSON
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    user = relationship("User", back_populates="animations")

    def __init__(self, name, frames, user_id):
        self.name = name
        self.frames = frames
        self.user_id = user_id
