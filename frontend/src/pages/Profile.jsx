import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import ProfilePosts from '../components/ProfilePosts.jsx'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { URL } from '../url.js'
import { UserContext } from '../context/UserContext.jsx'

const Profile = () => {
    const param = useParams()
    const { user,setUser } = useContext(UserContext)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [upload, setUpload] = useState(false)
    const navigate=useNavigate()

    const [userPosts, setUserPosts] = useState([])
    const getPostsByUser = async () => {
        try {
            const res = await axios.get(`${URL}/api/post/user/${user._id}`)
            console.log(res.data)
            setUserPosts(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPostsByUser()

    }, [param])

    const fetchProfile = async () => {
        try {
            const res = await axios.get(`${URL}/api/user/${param.id}`)
            setUsername(res.data.username)
            setEmail(res.data.email)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchProfile()

    }, [param])


    const updateUser = async () => {
        try {
            await axios.put(`${URL}/api/user/${user._id}`,
                { username, email },
                { withCredentials: true }
            )
            setUpload(true)
        } catch (error) {
            console.log(error)
            setUpload(false)
        }
       
    }

    const deleteUser=async()=>{
        try {
            await axios.delete(`${URL}/api/user/${user._id}`,{ withCredentials: true })
            setUser(null)
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }
   

    return (
        <>
            <Navbar />
            <div className="min-h-[80vh] px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start items-start">
                <div className="flex flex-col md:w-[70%] w-full mt-8 md:mt-0">
                    <h1 className="text-xl font-bold mb-4">Your posts:</h1>
                    {
                        userPosts &&
                        userPosts.map((post) => (
                            <ProfilePosts key={post._id} post={post} />
                        ))
                    }


                </div>
                <div className="md:sticky md:top-12  flex justify-start md:justify-end items-start md:w-[30%] w-full md:items-end ">
                    <div className=" flex flex-col space-y-4 items-start">
                        <h1 className="text-xl font-bold mb-4">Profile</h1>

                        <input value={username} onChange={(e) => setUsername(e.target.value)}
                            className="outline-none px-4 py-2 text-gray-500" placeholder="New username" type="text" />

                        <input value={email} onChange={(e) => setEmail(e.target.value)}
                            className="outline-none px-4 py-2 text-gray-500" placeholder="New email" type="email" />
                        <div className="flex items-center space-x-4 mt-8">
                            <button onClick={updateUser}
                                className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400">Update</button>
                            <button onClick={deleteUser}
                            className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400">Delete</button>
                        </div>
                        {
                            upload &&
                            <h3 className="text-green-500 text-sm text-center mt-4">user updated successfully!</h3>
                        }
                        
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Profile