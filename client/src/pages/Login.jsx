import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar/NavBar'
import { UserAuth } from '../context/AuthContext';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { provider } from '../firebase';
import { FcGoogle } from "react-icons/fc";
import { TfiGoogle } from "react-icons/tfi";

import './Login.css';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { user, logIn } = UserAuth('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (email === password) {
      setError("Email Pass Can't be Same");
      console.log("gem");
    }
    else {
      try {
        await logIn(email, password);
        navigate('/');
      } catch (error) {
        setError(error.message);
        console.log(error);
      }
    }
  };
  const GoogleSignUp = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        navigate('/');
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });

  }
  return (
    <div className='dm'>
      <NavBar />
      <div className='side-ground'>
        <h1 className='product-name'>Vistaio</h1>
        <p className='product-sml'>Vistaio</p>
      </div>
      <div className='signin'>
        {
          error && <p>{error.substring(10)}</p>
        }
        <p className='head'>Login</p>
        <form onSubmit={handleSubmit} >
          <input className='ing' name='email' onChange={(e) => setEmail(e.target.value)} type="email" placeholder='email' ></input>
          <input className='ing' name='pswrd' onChange={(e) => setPassword(e.target.value)} type="password" placeholder='password'></input>
          <span className='btn-span'><button>Sign In</button>
          <div onClick={GoogleSignUp} className='signup-google'><TfiGoogle /></div>
          </span>
          <span className='horizontal'><hr></hr><p>OR</p><hr></hr></span> 
          <div> <Link to='/signup'> Sign Up  </Link> </div>
        </form>
      </div>
    </div>
  )
}

export default Login