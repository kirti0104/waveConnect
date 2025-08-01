import User from "../models/user.model";
import AppError from "../utils/AppError";
import bcrypt from 'bcrypt'


const signup=async(data:any)=>{
   try{
    const{firstName,lastName,email,phoneNumber,password,confirmPassword}=data;

    const existingUser=await User.findOne({where:{email}})
    if(existingUser){
       throw new AppError("Email is already in use",409)
    }
    if(password!==confirmPassword){
        throw new AppError("Passwords do not match",400)
    }
    const hashedPassword=await bcrypt.hash(password,10)
     const user=await User.create({
        firstName,lastName,email,phoneNumber,password:hashedPassword
     })
     return user;
   }
   catch (err: any) {
    console.error("Sequelize Error:", err);
    if (err.name === "SequelizeValidationError") {
      throw new AppError(err.errors[0].message, 400);
    }
    throw new AppError("User creation failed", 500);
  }
}

export default {signup}