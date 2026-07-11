import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../API/axios';

function Register() {
  const navigate = useNavigate();
  const userNameDom = useRef(null);
  const firstNameDom = useRef(null);
  const lastNameDom = useRef(null);
  const emailDom = useRef(null);
  const passwordDom = useRef(null);

  async function handleSubmit(e){
    e.preventDefault();
    const usernameValue = userNameDom.current.value;
    const firstnameValue = firstNameDom.current.value;
    const lastnameValue = lastNameDom.current.value;
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;
    if(!usernameValue || !firstnameValue || !lastnameValue || !emailValue || !passwordValue){
      alert("Please provide all required information.");
      return;
    }
    try {
      await axios.post('/users/register', {
        username: usernameValue,
        firstname: firstnameValue,
        lastname: lastnameValue,
        email: emailValue,
        password: passwordValue
      });
      alert("Successfully registered. Please login.");
      navigate('/login');
    } catch (error) {
      alert(error?.response?.data?.msg);
    }
  }
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <span>Username: </span>
          <input ref={userNameDom} type="text" placeholder="Username" required/>
        </div>
        <br />
        <div>
          <span>First name: </span>
          <input ref={firstNameDom} type="text" placeholder="First name" required/>
        </div>
        <br />
        <div>
          <span>Last name: </span>
          <input ref={lastNameDom} type="text" placeholder="Last name" required/>
        </div>
        <br />
        <div>
          <span>Email: </span>
          <input ref={emailDom} type="email" placeholder="Email" required/>
        </div>
        <br />
        <div>
          <span>Password: </span>
          <input ref={passwordDom} type="password" placeholder="Password" required/>
        </div>
        <button type='submit'>Register</button>
      </form>
    </section>
  )
}

export default Register