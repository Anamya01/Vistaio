import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar/NavBar';
import { UserAuth } from '../context/AuthContext'
import './Login.css';
function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, signUp } = UserAuth('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password,);
      console.log(user);
      navigate('/payment');
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className='dm'>
      <NavBar />
      <div className='side-ground'>
        <h1 className='product-name'>Vistaio</h1>
        <p className='product-sml'>Vistaio</p>
      </div>
      <div className='bgc'></div>
      <div className='signin'>
        <p className='head'>Sign Up</p>
        <form onSubmit={handleSubmit}>
          <input className='ing' onChange={(e) => setEmail(e.target.value)} type="email" placeholder='email'></input>
          <input className='ing' onChange={(e) => setPassword(e.target.value)} type="password" placeholder='password'></input>
          {/* <input type='file'></input> */}
          <div>
          </div>
          <button>Sign Up</button>
          <div className='sign-ii'> <Link to='/login'> Sign In  </Link> </div>
        </form>
      </div>
    </div>
  )
}
export default SignUp


