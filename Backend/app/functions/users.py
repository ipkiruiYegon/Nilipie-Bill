import os
from datetime import datetime, timedelta
from typing import List, Optional
from fastapi import Depends,HTTPException, status
from fastapi.security import (
    SecurityScopes,
)
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from pydantic import  ValidationError

from ..crud import get_user_by_username, get_user_by_email_id

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = os.environ.get("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

async def authenticate_user(db: Session, username: str, password: str):
    user = await get_user_by_username(db, username=username)
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return user

async def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(db: Session,token: str ):

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate Token"
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("userid")
        email: str =  payload.get("email")
        if user_id is None or email is None:
            raise credentials_exception
        
    except (JWTError, ValidationError):
        raise credentials_exception
    user = await get_user_by_email_id(db, email, user_id)
    if user is None:
        raise credentials_exception
    return user