import express from 'express'
import {addComment, addPreferences, adminLogin, adminSignup, changePassword, createWaves, fetchFriends, getComments, getUser, getWaves, inviteFriend, login, signup, updateUser } from '../controllers/authController';
import { adminSignupValidation, inviteFriendValidation, loginValidation, userValidation ,validatePreferences, wavevalidation} from '../middlewares/authValidation';
import upload from '../middlewares/multer';

const router=express.Router();

router.post('/adminSignup',adminSignupValidation,adminSignup)
router.post('/adminLogin',loginValidation,adminLogin)
router.post('/signup',userValidation,signup);
router.post('/login',loginValidation,login);
router.get('/getUser/:userId',getUser)
router.put('/updateUser/:userId',updateUser);
router.post('/addPreferences',validatePreferences,addPreferences)
router.post('/inviteFriend/:id',inviteFriendValidation,inviteFriend)
router.get('/fetchFriends/:id',fetchFriends)

router.post('/createWaves/:userId', upload.single('photoUrl'), (req, res, next) => {
  if (req.file) {
    console.log("photo is uploaded properly");
  } else {
    console.log("No file uploaded");
  }
  next(); 
}, wavevalidation, createWaves);

router.get('/getWaves',getWaves)
router.put('/changePassword/:userId',changePassword)
router.post('/addComment/:waveId',addComment)
router.get('/getComments/:waveId',getComments)


export default router;