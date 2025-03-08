import express from "express";
import { getUserdata, login, logout, register } from "../controllers/userController.js";
import authProtect from "../middleware/authProtect.js";

const router=express.Router();


router.post('/register',register)
router.post('/login',login);
router.get('/userdata',authProtect,getUserdata);
router.post('/logout',logout);
export default router;

