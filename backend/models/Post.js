import mongoose from "mongoose"

const postSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
       
    },
    desc:{
        type:String,
        required:true,
        
    },
   photo:{
        type:String,
        
        
    },
    userId:{
        type:String,
        required:true,
        
    },
    username:{
        type:String,
        required:true,
        
    },
    categories:{
        type:Array,
        
        
    }

},{timestamps:true})

const Post=mongoose.model("Post",postSchema)

export default Post