import React, { useContext } from 'react'
import './topbar.css'
import { Link } from "react-router-dom";
import { Context } from '../../context/Context';


export default function TopBar() {
  const {user, dispatch} =useContext(Context);
  const PF = "http://localhost:5000/pics/"

  const handleLogout = () =>{
    dispatch({type: "LOGOUT"})
  }
  return (
    <div className='top'>
        <div className="topLeft">
          <h1>Flavor of Life</h1>
        </div>
        <div className="topCenter">
            <ul className="topList">
                <li className='topListItem'>
                  <Link to="/" style={{textDecoration:"none", color:"inherit"}}>HOME</Link>
                </li>
                <li className='topListItem'>
                  <Link to="/write" style={{textDecoration:"none", color:"inherit"}}>WRITE</Link>
                </li>
                <li className='topListItem' onClick={handleLogout}>
                  {user && "LOGOUT"}
                </li>




            </ul>
        </div>
        <div className="topRight">
          {user ? (
            <Link to="/settings" style={{textDecoration:"none", color:"inherit"}}>
            <img className='topImg'src={PF+user.profilePic} alt="" />
            </Link>     
                  )    :
          (
            <ul className='topList'>
              <li className='topListItem'>
            <Link to="/login" style={{textDecoration:"none", color:"inherit"}}>LOGIN</Link>
            </li>
            <li className='topListItem'>
            <Link to="/register" style={{textDecoration:"none", color:"inherit"}}>REGISTER</Link>
            </li>
            </ul>
            )}
        </div>
    </div>
  )
}
