import React, { useState, } from 'react';
import './NavBar.css';
import Search from '../Search/Search';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import used from '/Users/anamyavats/Downloads/RecPo/vplay/client/src/images/images.jpeg';
import { RiAccountCircleFill } from "react-icons/ri";
import { SiGooglebard } from "react-icons/si";


function NavBar() {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [photo, setPhoto] = useState(used);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/login');
    }
    catch (err) {
      console.log(err);
    }
  }
  var name = [""];
  if(user){
  if(user.displayName){
     name = user.displayName.split(" ");
  }
}
  const showHandlerOpen = () => {
    setShow(true);
  }
  const showHandlerClose = () => {
    setShow(false);
  }
  console.log(user);


  return (
    <div className='NavBar'>
      <div className='vistaio'>
        <Link to='/' > <h1>Vistaio <SiGooglebard className='vistaio-star' /> </h1> </ Link>
        <p id='topstrem'>Top Streaming</p>
      </div>
      <div className='user'>
        {user?.email && <Search className="srch"></Search>}
        {user?.email ?
          <div>
            <div className='profile' onClick={showHandlerOpen} onMouseLeave={showHandlerClose}>
              {/* <img src={photo} alt='' ></img> */}
              <div className='account-box'> <RiAccountCircleFill className='account-icon' /> </div>
            </div>
            {show &&
              <div className='bars' onMouseOut={showHandlerClose} onMouseOver={showHandlerOpen}>
                {user ? <p className='userName acountbtn' >{name[0]}</p> : <p>Moron</p> }
                <Link to='/account'>
                  <button className='acountbtn'>Account</button>
                </Link>
                <button className='acountbtn'
                  onClick={handleLogout}>
                  Logout
                </button>
              </div>}
          </div> :
          <div>
            <Link to='/login'>
              <button className='acountbtn-log'>Sign In</button>
            </Link>
            <Link to='/signup'>
              <button className='acountbtn-log'>
                Sign Up
              </button>
            </Link>
          </div>
        }
      </div>
    </div>
  )
}

export default NavBar;