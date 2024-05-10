import React from 'react'
import {loadStripe} from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';
import "./Pav.css";
import NavBar from '../components/NavBar/NavBar';
function Payment() {
    const nav = useNavigate();
    const cart = [{
        id: 'ms_1',
        name : "Monthly Subscription",
        price : 49,
    }];
    const makePayment = async() =>{
        const stripe = await loadStripe('pk_test_51OXgLWSBnGr0bdLq7u6gxTaC5zytXZHgn2tZn7ew8RUPgwFCH7zqGkGoIp3wMNPRyftnI7liqDxq8yz59n79f9bL00VyIhjQHP');
        const body = {
            products: cart
        }
        const header = {
            "content-type": "application/json"
        }
        const response = await fetch("http://localhost:3001/api/create-checkout-session",{
            method : "POST",
            headers : header,
            body:JSON.stringify(body),

        });

        const seesion = await response.json();
        const result = stripe.redirectToCheckout({
            sessionId:seesion.id
        })
        if(result.error){
            console.log(result.error)
        }
    }
    const submitAds = () => {
        nav('/');
      }
  return (
    <>
    <NavBar />
    <div className='gbc'></div>
    <div className='bgcc'></div>
    <div className='boxb'>
        <div className='chinmay'>
            <p className='mon'>Watch AD Free</p>
            <p className='detr'>Enjoy the lastest movies and series without Ads at just Rs49</p>
            <p className='rp'>₹49</p>
        </div>
        <button onClick={makePayment}>Confirm</button>
        <button onClick={submitAds}>Continue with Ads</button>
    </div>
    </>
  )
}

export default Payment