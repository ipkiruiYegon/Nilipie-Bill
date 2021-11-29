from sqlalchemy.orm import Session
from passlib.context import CryptContext

from . import model, schemas

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

async def get_user(db: Session, user_id: int):
    return db.query(model.User).filter(model.User.id == user_id).first()

async def get_user_by_email(db: Session, email: str):
    return db.query(model.User).filter(model.User.email == email).first()

async def get_user_by_username(db: Session, username: str):
    return db.query(model.User).filter(model.User.username == username).first()


async def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(model.User).offset(skip).limit(limit).all()


async def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = pwd_context.hash(user.password)
    db_user = model.User(email=user.email, password=hashed_password, username=user.username.title(),firstname=user.firstname.title(),othernames=user.othernames.title())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


