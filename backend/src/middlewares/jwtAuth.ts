import { NextFunction } from "express";
import jwt from "jsonwebtoken";



export const generateToken=async(user:any)=>{
  const payload={
    id:user.id,
    email:user.email,
    role:user.role
  }
  const secretKey=process.env.JWT_SECRET || ' ';
  const token=jwt.sign(payload,secretKey,{
    expiresIn:'7h'
  });
  return token;
}




export const authenticateToken = (req: Request,res: Response,next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};