
import { Route, Router, Routes } from 'react-router-dom'
import './App.css'

import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import PostDetails from './pages/PostDetails.jsx'
import CreatePost from './pages/CreatePost.jsx'
import EditPost from './pages/EditPosts.jsx'
import Profile from './pages/Profile.jsx'
import {  UserContextProvider } from './context/UserContext.jsx'
import MyBlogs from './pages/MyBlogs.jsx'

function App() {
  

  return (
   
    
    <UserContextProvider>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/posts/post/:id' element={<PostDetails />} />
        <Route exact path='/write' element={<CreatePost />} />
        <Route exact path='/edit/:id' element={<EditPost />} />
        <Route exact path='/profile/:id' element={<Profile />} />
        <Route exact path='/myblogs/:id' element={<MyBlogs />} />
      </Routes>
     
    
      </UserContextProvider>
  )
}

export default App
