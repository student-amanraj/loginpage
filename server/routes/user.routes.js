import express from 'express'
import { isAuthenticated, login, logout, registerUser, resetPassword, sendResetOtp, sendVerifyOtp, verifyEmail } from '../controllers/user.controllers.js';
import userAuth from '../middleware/userAuth.js';

const authRouter=express.Router();
authRouter.post('/registery',registerUser)
authRouter.post('/login',login)
authRouter.post('/logout',logout)
authRouter.post('/send-verify-otp',userAuth,sendVerifyOtp)
authRouter.post('/verify-account',userAuth,verifyEmail)
authRouter.get('/is-auth',userAuth,isAuthenticated)
authRouter.post('/send-reset-otp',sendResetOtp);
authRouter.post('/reset-password',resetPassword)

export default authRouter