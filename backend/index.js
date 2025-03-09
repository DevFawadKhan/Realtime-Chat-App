import express from 'express';
import authRoutes from './src/routes/auth.routes.js';
import MessageRouter from './src/routes/message.routes.js';
import { DBConnect } from './src/lib/db.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import {io,server,app} from './src/lib/socket.io.js'
dotenv.config()
app.use(express.json({limit:'50mb'}));  //for havey image
app.use(cookieParser());
app.use(cors({
    origin:['http://localhost:5173','http://localhost:5174'],
    credentials:true
}))
const PORT=process.env.PORT||3001
app.use('/api/auth',authRoutes)
app.use('/api/messages',MessageRouter)
server.listen(PORT,()=>{
    console.log(`Listing on ${PORT} PORT`)
    DBConnect()
})
