import express from "express"
import User from "../models/User.js"
import Post from "../models/Post.js"
import Comment from "../models/Comment.js"
import verifyToken from "../middlewares/verifyToken.js"

const router=express.Router()

//UPDATE
router.put("/:id",verifyToken,async(req,res)=>{
    try {
        const {id,password}=req.params
        if(password){
            const salt=await bcrypt.genSalt(10)
            await bcrypt.hashSync(password,salt)
        }
        const updatedUser=await User.findByIdAndUpdate(id,{
            $set:req.body
        },{new:true})
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json(error)
    }
})

//DELETE
router.delete("/:id",verifyToken,async(req,res)=>{
    try {
        await User.findByIdAndDelete(req.params.id)
        await Post.deleteMany({userId:req.params.id})
       await  Comment.deleteMany({userId:req.params.id})
        res.status(200).json({message:"User and his posts and comments deleted"})
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET USER
router.get("/:id",async(req,res)=>{
    try {
        const user=await User.findById(req.params.id)
       
        //const{password,...info}=user._doc
        
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
})

export default router