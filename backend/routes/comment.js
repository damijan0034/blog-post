import express from "express"
import User from "../models/User.js"
import Post from "../models/Post.js"
import Comment from "../models/Comment.js"
import verifyToken from "../middlewares/verifyToken.js"

const router=express.Router()

//CREATE COMMENT
router.post("/write",verifyToken,async(req,res)=>{
    try {
        const newComment= new Comment(req.body)
        newComment.save()
        res.status(201).json(newComment)
    } catch (error) {
        res.status(500).json(error)
    }
})

//UPDATE
router.put("/:id",async(req,res)=>{
    try {
        
        const updatedComment=await Comment.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
        res.status(200).json(updatedComment)
    } catch (error) {
        res.status(500).json(error)
    }
})

//DELETE
router.delete("/:id",async(req,res)=>{
    try {
        await Comment.findByIdAndDelete(req.params.id)
        
        res.status(200).json({message:"Comment  deleted"})
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET SINGLE COMMENT
router.get("/:id",async(req,res)=>{
    try {
        const comment=await Comment.findById(req.params.id)
       
       
        
        res.status(200).json(comment)
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET ALL COMMENTS
router.get("/",async(req,res)=>{
    try {
        const comments=await Comment.find()
        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET COMMENTS BY USER ID
router.get("/user/:userId",async(req,res)=>{
    try {
        const userComments=await Comment.find({userId:req.params.userId})
        res.status(200).json(userComments)
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET COMMENTS BY POST ID
router.get("/post/:postId",async(req,res)=>{
    try {
        const postComments=await Comment.find({postId:req.params.postId})
        res.status(200).json(postComments)
    } catch (error) {
        res.status(500).json(error)
    }
})


export default router