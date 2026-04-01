import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRouter from './routes/user.routes.js';
import userRouter from './routes/authuser.routes.js';
const app=express()
const PORT=process.env.PORT || 2001;
connectDB();
const allowedOrgins=['http://localhost:5173']
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin:allowedOrgins,credentials:true}));
app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);
app.listen(PORT,()=>{
  console.log("Server is running on port 2001")
})