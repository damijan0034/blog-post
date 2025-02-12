import express from "express"
import User from "../models/User.js"
import Post from "../models/Post.js"
import Comment from "../models/Comment.js"
import verifyToken from "../middlewares/verifyToken.js"

const router=express.Router()

//CREATE POST
router.post("/write",verifyToken,async(req,res)=>{
    try {
        const newPost= new Post(req.body)
        newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(500).json(error)
    }
})

//UPDATE
router.put("/:id",verifyToken,async(req,res)=>{
    try {
        
        const updatedPost=await Post.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
        res.status(200).json(updatedPost)
    } catch (error) {
        res.status(500).json(error)
    }
})

//DELETE
router.delete("/:id",verifyToken,async(req,res)=>{
    try {
        await Post.findByIdAndDelete(req.params.id)
        await Comment.deleteMany({postId:req.params.id})
        res.status(200).json({message:"Post  deleted with comments"})
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET SINGLE POST
router.get("/:id",async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id)
       
       
        
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET ALL POSTS
router.get("/",async(req,res)=>{
    const query=req.query
    try {
        const searchFilter={
            title:{$regex:query.search,$options:"i"}
        }
        const posts=await Post.find(query.search ? searchFilter : null)
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET POSTS BY USER ID
router.get("/user/:userId",async(req,res)=>{
    try {
        const userPosts=await Post.find({userId:req.params.userId})
        res.status(200).json(userPosts)
    } catch (error) {
        res.status(500).json(error)
    }
})

export default router