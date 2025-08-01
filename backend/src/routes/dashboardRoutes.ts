import express from 'express'

import upload from '../middlewares/multer';
import { createWaves, getWaves } from '../controllers/authController';
import { wavevalidation } from '../middlewares/authValidation';

const dashboardRouter=express.Router();

dashboardRouter
    .post('/createWaves/:userId', upload.single('photoUrl'), wavevalidation, createWaves)
     .get('/getWaves',getWaves)

export default dashboardRouter;