import Waves from "../models/waves.model";
import { Request,Response } from "express";
import dashboardService from "../services/dashboard.service";

//api to create the waves

export const createWaves = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const { name, message } = req.body;
  const photoUrl = req.file ? req.file.path : null; 

  const data={userId, name, message, photoUrl};
  const response=await dashboardService.createWaves(data)

  res.status(201).json({
    success: true,
    message: "Waves created successfully",
    data:response

  });
   
}