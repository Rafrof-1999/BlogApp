import React from 'react'
import './post.css'
import { Link } from "react-router-dom";


export default function Post({post}) {
   const PF = "http://localhost:5000/pics/";
  return (
    <div className='post'>
      {post.photo && (
      <img className='postImg'src={ PF+post.photo} alt="" />


      )}
        <div className="postInfo">
        <Link to = {`/post/${post._id}`} style={{textDecoration:"none", color:"inherit"}}>
            <span className="postTitle">
              {post.title}
            </span>
         </Link>
            <hr />
            <span className="postDate">
            {new Date(post.createdAt).toDateString()}
            </span>
            <p className="postDesc">
              {post.desc}
            </p>
        </div>
    </div>
  )
}
