from sqlalchemy import Column, Integer, String
from database import base

class Animation(base):
    __tablename__ = "animations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    content = Column(String)
