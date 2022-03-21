import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Context } from '../../context/Context';
import './singlepost.css'

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];      //get the post id from the url
  const [post,setPost] = useState({})
  const PF = "http://localhost:5000/pics/";
  const {user} = useContext(Context) 
  const [title, setTitle] = useState(""); 
  const [desc, setDesc] = useState(""); 
  const [updateMode, setUpdateMode] = useState(false); 


  useEffect (()=>{

    const getPost = async () =>{
      const res = await axios.get("/posts/"+path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    }
    getPost()

  },[path])

  const handleDelete = async() =>{

    try {
      await axios.delete(`/posts/${post._id}`,{data: {username: user.username}});
      window.location.replace("/");

    } catch (error) {
      
    }

  }

  const handleUpdate = async () =>{
    try {
      await axios.put(`/posts/${post._id}`, {username: user.username, title, desc});
      window.location.reload();                                                         //reload same page

    } catch (error) {
      
    }


  }

  return (
    <div className='singlePost'>
        <div className="singlePostWrapper">
          {post.photo && (
          <img className='singlePostImg'src={PF+post.photo} alt="" />

          )
          
          }
          {updateMode ? <input className='singlePostTitleEdit' type="text" value={title} autoFocus onChange={(e)=>setTitle(e.target.value)}></input> :

          (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
              <i className="singlePostIcon fa-solid fa-pen-to-square" onClick={ ()=> setUpdateMode(true)}></i>
              <i className="singlePostIcon fa-solid fa-circle-minus" onClick={handleDelete}></i>
              </div>
              )}
          </h1>
          )}

          <div className="singlePostInfo">
          <Link to = {`/?user=${post.username}`} style={{textDecoration:"none", color:"inherit"}}>
              <span className='singlePostAuthor'>Author: {post.username}</span>
          </Link>
              <span className='singlePostDate'>{new Date(post.createdAt).toDateString()}</span>
          </div>
          {updateMode ? <textarea className='singlePostDescEdit' value={desc} onChange={(e)=>setDesc(e.target.value)}/> : (

          
          <p className='singlePostDesc'>
            {desc}
          </p>
          )}
          {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>Update</button>
          )}
        </div>
    </div>
  )
}
