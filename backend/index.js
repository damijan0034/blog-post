import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import multer from "multer"
import path from "path"

import authRoute from "./routes/auth.js"
import userRoute from "./routes/user.js"
import postRoute from "./routes/posts.js"
import commentRoute from "./routes/comment.js"
import verifyToken from "./middlewares/verifyToken.js"
import cors from "cors"

const app=express()

//connect to db
const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("DB connected")
    } catch (error) {
        console.log(error)
    }
}

dotenv.config()
const port =process.env.PORT || 5000

const absPath=import.meta.dirname
const imagesPath=path.join(absPath,"/images")
console.log(imagesPath)

//MIDDLEWARES
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use("/images",express.static(imagesPath))   

app.use("/api/auth",authRoute)
app.use("/api/user",userRoute)
app.use("/api/post",postRoute)
app.use("/api/comment",commentRoute)

//image upload
const storage=multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null,"images")
    },
    filename:(req,file,fn)=>{
        // fn(null,"food1.jpg")
        fn(null,req.body.img)
    }
}
)
const upload=multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("Image successfully uploaded")
})

app.listen(port,()=>{
    connectDB()
    console.log("Listen to port 5000")
})