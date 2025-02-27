import { userModel } from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"

export async function register(req,res) {
    const {name,email,password}=req.body;

    if(!name || !email || !password){
        return res.status(400).json({ success:false,message:"Please Provide all details" })
    }


    try {
        const user=await userModel.findOne({email});
        if(user){
            return res.status(400).json({ success:false,message:"User already Exists.Try login.." })
        }
    
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser=new userModel({
            name,email,
            password:hashedPassword
        })
    
        await newUser.save();
        const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET_KEY,{
            expiresIn:'1d'
        })
    
        res.cookie("token",token,{
            httpOnly:true,
            maxAge: 24 * 60 * 60 * 1000
        })
    
        res.status(200).json({success:true,message:"Successfully Registered"});
    } catch (error) {
        res.status(400).json(error.message);
    }

}

export async function login(req,res){

    const {email,password}=req.body;


    try {
        const user=await userModel.findOne({email});

        if(!user){
            return res.json({success:false,message:"User not found"})
        }
    
        const isMatch=await bcrypt.compare(password,user.password);
    
        if(!isMatch){
            return res.json({success:false,message:"Password is Invalid"});
        }
    
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{
            expiresIn:'1d'
        })
    
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Secure in production
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
        });
    
        res.json({success:true,message:"Succesfully Logined"});
    } catch (error) {
        console.log(error);
        
        res.status(400).json({success:false,message:error.message});
    }
   


}


export async function getUserdata(req,res) {
    try {
        const user=await userModel.findById(req.body.userId);

        res.status(200).json({success:true,
            userdata:{
                username:user.name,

            }
        })
        } catch (error) {
        res.json({success:false,message:error.message});
    }
}


export async function logout(req,res) {
    res.clearCookie("token");

    return res.json({success:true,message:"Logged Out Succesfully"})
} 