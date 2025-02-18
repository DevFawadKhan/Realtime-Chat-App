import express from 'express';
import authRoutes from './src/routes/auth.routes.js';
import MessageRouter from './src/routes/message.routes.js';
import { DBConnect } from './src/lib/db.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
const app=express()
dotenv.config()
app.use(express.json());
app.use(cookieParser());
const PORT=process.env.PORT||3001
app.use('/api/auth',authRoutes)
app.use('/api/message',MessageRouter)

 app.listen(PORT,()=>{

    console.log(`Listing on ${PORT} PORT`)
    DBConnect()
})