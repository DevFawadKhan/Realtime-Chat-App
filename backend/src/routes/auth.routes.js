import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js';
const router=express.Router();
import { Login, Logout, Signup,UpdateProfile,Check } from '../controller/Auth.controller.js';
router.post('/signup',Signup)
router.post('/login',Login)
router.post('/logout',Logout)
router.put("/update-profile",protectRoute,UpdateProfile)
router.get("/check",protectRoute,Check)

export default router;