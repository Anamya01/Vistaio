import React from 'react'
import { Link , useNavigate } from 'react-router-dom'
import './Pav.css';
import { FaCircleCheck } from "react-icons/fa6";

function Success() {
    const nav = useNavigate();
    const submitHanlder =() =>{
        nav('/');
    }
  return (
    <div className='box'>
      <FaCircleCheck className='check' />
    <div>Your Payment Was Successful</div>
    <button onClick={submitHanlder}>DONE</button>
    </div>
  )
}

export default Success