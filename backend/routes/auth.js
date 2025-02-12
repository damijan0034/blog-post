import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const router=express.Router()

//REGISTER
router.post("/register",async(req,res)=>{
    try {
        const{username,email,password}=req.body
        const salt=await bcrypt.genSalt(10)
        const hashedPassword= bcrypt.hashSync(password,salt)
        const newUser=  new User({username,email,password:hashedPassword})
        const savedUser=await newUser.save()

        res.status(201).json(savedUser)
    } catch (error) {
        res.status(500).json(error)
    }
})

//LOGIN
router.post("/login",async(req,res)=>{
    try {
        
        const user= await User.findOne({email:req.body.email})
        if(!user){
            return res.status(404).json("No user")
        }
        const matchedPassword= bcrypt.compareSync(req.body.password,user.password)
        if(!matchedPassword){
            return res.status(404).json("Wrong credentials")
        }
        const token=jwt.sign({_id:user._id,username:user.username,email:user.email},process.env.SECRET,{expiresIn:"3d"})
        const {password,...info}=user._doc
        res.cookie("token",token).status(200).json(info)
       
    } catch (error) {
        res.status(500).json(error)
    }
})

//LOGOUT
router.get("/logout",async(req,res)=>{
    try {
         res.clearCookie("token").status(200).json("user logged out")
    } catch (error) {
        res.status(500),json(error)
    }
})
//REFETCH USER
router.get("/refetch",(req,res)=>{
    
        const token=req.cookies.token
        jwt.verify(token,process.env.SECRET,async(err,data)=>{
            if(err){
              return  res.status(404).json(err)
            }
            res.status(200).json(data)
        })
   
})
export default router