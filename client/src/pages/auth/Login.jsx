import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../API/axios';

function Login() {
  const navigate = useNavigate();
  const emailDom = useRef();
  const passwordDom = useRef();

   async function handleSubmit(e){
    e.preventDefault();
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;
    if(!emailValue || !passwordValue){
      alert("Please provide all required information.");
      return;
    }
    try {
      const {data} = await axios.post('/users/login', {
        email: emailValue,
        password: passwordValue
      });
      alert("Successfully logged in.");
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (error) {
      alert(error?.response?.data?.msg);
    }
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <span>Email: </span>
          <input ref={emailDom} type="email" placeholder="Email" required/>
        </div>
        <br />
        <div>
          <span>Password: </span>
          <input ref={passwordDom} type="password" placeholder="Password" required/>
        </div>
        <button type='submit'>Login</button>
        <Link to={"/register"}>Register</Link>
      </form>
    </section>
  )
}

export default Login