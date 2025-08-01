import express from 'express'
import {addComment, addPreferences, adminLogin, adminSignup, changePassword, createWaves, fetchFriends, getComments, getUser, getWaves, inviteFriend, login, signup, updateUser } from '../controllers/authController';
import { adminSignupValidation, inviteFriendValidation, loginValidation, userValidation ,validatePreferences, wavevalidation} from '../middlewares/authValidation';
import upload from '../middlewares/multer';

const authRouter=express.Router();

authRouter
  .post('/adminSignup',adminSignupValidation,adminSignup)
  .post('/adminLogin',loginValidation,adminLogin)
  .post('/signup',userValidation,signup)
  .post('/login',loginValidation,login)
  .get('/getUser/:userId',getUser)
  .put('/updateUser/:userId',updateUser)
  .post('/addPreferences',validatePreferences,addPreferences)
  .post('/inviteFriend/:userId',inviteFriendValidation,inviteFriend)
  .get('/fetchFriends/:id',fetchFriends)
 .get('/getWaves',getWaves)
 .put('/changePassword/:userId',changePassword)
 .post('/addComment/:waveId',addComment)
 .get('/getComments/:waveId',getComments)


export default authRouter;