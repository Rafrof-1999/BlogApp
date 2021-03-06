import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import Posts from '../../components/posts/Posts'
import './home.css'
import axios from "axios";
import { useLocation } from 'react-router-dom';

export default function Home() {
  const [posts,setPosts] = useState([]);
  const {search} = useLocation();

  location

  useEffect(()=>{
    const fetchPosts = async ()=>{
      const res = await axios.get("/posts"+search)
      setPosts(res.data);

    }
    fetchPosts();

  },[search])                                       //add search as it can change
  return (
    <>
    <Header/>
    <div className='home'>
      <Posts posts={posts}/>
    </div>
    </>
  )
}
