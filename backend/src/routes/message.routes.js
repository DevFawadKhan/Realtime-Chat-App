import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js';
import {getUserForSidebar,getMessage,SendMessages} from '../controller/message.controller.js'
const MessageRouter=express.Router();

MessageRouter.get("/users",protectRoute,getUserForSidebar)
MessageRouter.get("/:UserId",protectRoute,getMessage)
MessageRouter.post("/send/:id",protectRoute,SendMessages)
export default MessageRouter