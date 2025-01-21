import { Request,Response } from "express";
import bcrypt from 'bcrypt';
import  jwt  from "jsonwebtoken";
import User from "../models/user.model";
import { logAuditEvent } from "../utils/auditLogger";
import AdminUser from "../models/adminUser.model";
import Preferences from "../models/preferences.model";
import Friends from "../models/friends.model";
import Waves from "../models/waves.model";
import Comments from "../models/comments.model";
import { where } from "sequelize";

//to register the admin

export const adminSignup=async(req:any,res:any)=>{
  const{email,password,fullName}=req.body;
  const hashedPassword=await bcrypt.hash(password,10);
  try{
    const admin=await AdminUser.findOne({where:{email}});
    if(admin)
    {
      return res.status(400).json({message:'Email already exists. Please login or use a different email'})
    }
    const newAdmin=await AdminUser.create({
      email,password:hashedPassword,fullName
    })
     await logAuditEvent("admin registration", `New admin registered with email: ${email}`, newAdmin.id);
      return res.status(201).json({message:"admin registered successfully"});  
  }catch(error){
       return res.status(500).json({message:'registration failed',error})
  }
}

//api to login admin user

export const adminLogin = async (req: any, res: any) => {
  const { email, password } = req.body;
  try {
    const user = await AdminUser.findOne({ where: { email } });
   
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      console.error("JWT_SECRET is not defined in environment variables");
      return res.status(500).json({ message: "Internal server error" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      jwtSecret,
      { expiresIn: "1h" } 
    );

  
    const { id, fullName, } = user;
    const userInfo = { id, email,fullName  };

   
    await logAuditEvent(
      "admin login",
      `User with email: ${email} logged in`,
      id
    );
    return res.status(200).json({  message: "Login successful",  token,user: userInfo,  });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
//api to register the user

export const signup=async(req:any,res:any)=>
{
    const{firstName,lastName,email,phoneNumber,password}=req.body;
    const hashedPassword= await bcrypt.hash(password,10)
    try{      
       const existingUser=await User.findOne({where:{email}});
       if(existingUser)
       {
          return res.status(400).json({message:"Email already exists. Please login or use a different email"})
       }
        const newUser=await User.create({
            firstName,
            lastName,
            email,
            phoneNumber,
            password:hashedPassword,        
        });
        await logAuditEvent("user registration", `New user registered with email: ${email}`, newUser.id);

           console.log("Starting Friends.findOne query...");

          const pendingRequest = await Friends.findOne({
      where: { receiverEmail: email, status: 'pending' },
    });
    console.log("Friends.findOne query completed.");
    console.log("Email used for query:", email);
    console.log("Pending requests fetched:", pendingRequest);

    if (pendingRequest) {
      await Friends.update(
        { status: 'accepted' },
        { where: { receiverEmail: email, status: 'pending' } });}     
         return res.status(201).json({message:"user registered successfully"});  
        }
    catch(error){
        return res.status(500).json({message:'registration failed',error})
    }
}

//to login the user

export const login = async (req: any, res: any) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      console.error("JWT_SECRET is not defined in environment variables");
      return res.status(500).json({ message: "Internal server error" });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      jwtSecret,
      { expiresIn: "1h" } 
    );
    const { id, firstName, lastName, phoneNumber } = user;
    const userInfo = { id, firstName, lastName, email, phoneNumber };

    await logAuditEvent(  "user login",`User with email: ${email} logged in`,  id );

    return res.status(200).json({ message: "Login successful",token,user: userInfo,  });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//to get the user details

export const getUser=async(req:any,res:any)=>{

  const userId=req.params.userId;
  
  
  if(!userId)
  {
    return res.status(400).json({error:"user id is not found"})
  }
  try{
    const user=await User.findOne({where:{id:userId}});
    if(!user){
      return res.status(404).json({error:'user not found'})
    }
    return res.status(200).json(user);
  }catch(error)
  {
    console.error('error fetching user:',error);
    return res.status(500).json({error:"an error occured while fetching user data "})
  }

}
//to update the user profile

export const updateUser=async(req:any,res:any)=>{
  console.log("hellloooo")
     const userId=req.params.userId;
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    addressOne,
    addressTwo,
    city,
    state,
    zipCode,
    socialSecurityNumber,
    dob,
    gender,
    martialStatus,
    social,
    kids,
  } = req.body;

   try {
  
    const user = await User.findOne({ where: {id: userId } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user details
    await user.update({
      firstName,
      lastName,
      phoneNumber,
      email,
      addressOne,
      addressTwo,
      city,
      state,
      zipCode,
      socialSecurityNumber,
      dob,
      gender,
      martialStatus,
      social,
      kids,
    });
    console.log("0000",req.body)

    await logAuditEvent(
      "user update",
      `User with email: ${userId} updated details`,
      userId
    );


    return res.status(200).json({ message: "User details updated successfully", user });
  } catch (error) {
    console.error("Error updating user details:", (error as any).message );
    return res.status(500).json({ message: "Internal Server Error" });
  }

}

//to add user preferences(this is pending)

export const addPreferences = async (req: any, res: any) => {
  try {
    const {
      language,
      breakfast,
      lunch,
      dinner,
      wakeTime,
      bedTime,
      weight,
      height,
      bloodGlucose,
      cholesterol,
      bloodPressure,
      distance,
      communicationType,
      userId
    } = req.body;

    console.log("====", req.body);

  console.log("heeeeeee")
    const userExists = await User.findOne({ where: { id: userId } });
    if (!userExists) {
      return res.status(400).json({ message: "User not found" });
    }

    // Proceed with creating preferences
    const preferences = await Preferences.create({
      language,
      breakfast,
      lunch,
      dinner,
      wakeTime,
      bedTime,
      cholesterol,
      bloodPressure,
      distance,
      weight,
      height,
      bloodGlucose,
      communicationType,
      userId,
    });

    return res.status(200).json({ message: "Preferences created successfully", preferences });
  } catch (error) {
    console.error("Error updating user details:", (error as any).message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//to invite the friend which is not a existing user

export const inviteFriend=async(req:any,res:any)=>{
  const{receiverFullName,receiverEmail,message}=req.body
  const senderId=req.params.id;
  try{
      const existingRequest=await Friends.findOne({where:{senderId,receiverEmail}})
      if(existingRequest){
        if (existingRequest.status === 'accepted') {
         return res.status(400).send('You are already friends.');
         } else if (existingRequest.status === 'pending') {
         return res.status(401).send('Friend request is already pending.');
        }
       }
       const newRequest=await Friends.create({
        senderId,receiverFullName,receiverEmail,message,status:'pending'
       })
         return res.status(200).json({ message: 'Friend request sent successfully.', request: newRequest,});
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending friend request' });
  }
}

//to fetch all the friend request

export const fetchFriends=async(req:any,res:any)=>{
  const userId=req.params.id;
  try{
       const request=await Friends.findAll({
        where:{senderId:userId}
       })
       res.status(200).json({message:'request fetch success',request});
  }
   catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching friend request' });
  }
}

//to create waves for the user
export const createWaves = async (req: any, res: any) => {
  console.log("hello");
  const userId = req.params.userId;
  const { name, message } = req.body;
  const photoUrl = req.file ? req.file.path : null; // Ensure the file exists before accessing path

  if (!photoUrl) {
    return res.status(400).json({ message: "No photo uploaded" });
  }

  try {
    const newWave = await Waves.create({ name, message, userId, photoUrl, isActive: true });
    res.status(201).json(newWave);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating wave' });
  }
};


//to get all the waves on the dashboard

export const getWaves=async(req:any,res:any)=>{
  
  try{
     const waves=await Waves.findAll({
      include:[
        {
          model:User,
          attributes:['firstName','lastName','userProfile']
        }
      ],
      order: [['createdAt', 'DESC']], 
      limit: 6, 
     });
     res.status(200).json({message:'request fetch success',waves})
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching waves' });
  }
}

//to change the password

export const changePassword=async(req:any,res:any)=>{
  const userId=req.params.userId;
  const{oldPassword,newPassword}=req.body;
  try{
       if(!userId || !oldPassword || !newPassword )
       {
        res.status(400).json({message:'all fields are required'})
       }
       const user=await User.findByPk(userId);
        console.log("----",user)
       if(!user)
       {
        res.status(404).json({message:'user not found'})
       }
      
       else{
            const isMatch=await bcrypt.compare(oldPassword,user?.password)
             if (!isMatch) {
             return res.status(400).json({ message: 'Incorrect old password' });
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);
             user.password = hashedPassword;
          await user.save(); 
         }
        res.status(200).json({ message: 'Password updated successfully' });
  }
  catch (error) {
    console.error(error)
    res.status(500).json({ message: 'An error occurred while updating password'});
  }
}

//to add comment to the waves

export const addComment=async(req:any,res:any)=>{
  const waveId=req.params.waveId;
  const{comment}=req.body
  try{
      const wave=await Waves.findByPk(waveId);
      if(!wave)
      {
        res.status(404).json({message:'wave not found'})
      }
      const newComment=await Comments.create({
        comment,waveId
      })
      res.status(200).json({message:'comment added successfully'})
  }
  catch(error){
    console.error(error)
    res.status(500).json({message:'an error occured while adding comment'})
  }
}

//to get the comments of that particular wave

export const getComments=async(req:any,res:any)=>{
  const waveId=req.params.waveId;
  try{
     const comments=await Comments.findAll({where:{waveId:waveId}, order: [['createdAt', 'DESC']], 
      limit: 4,
     include:[
        {
          model:Waves,
          attributes:['name']
        }
      ] })
      res.status(200).json({message:'comments fetched successfully',comments})
  }
    catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching comments' });
  }
}