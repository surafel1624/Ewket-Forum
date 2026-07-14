import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../API/axios';
import { AppState } from '../../App';

function Login() {
  const navigate = useNavigate();
  const {userCheck} = useContext(AppState);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const savedMessage = sessionStorage.getItem('flashMessage');

  useEffect(() => {
    if(savedMessage){
      setMessage(savedMessage);
      sessionStorage.removeItem('flashMessage');
    }
  }, []);
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) =>({
      ...prev, [name]: value
    }));
    if(error) setError('');
  };

   async function handleSubmit(e){
    e.preventDefault();
    const {email, password} = formData;
    if(!email || !password){
      setError("Please provide all required information.");
      return;
    }
    try {
      const {data} = await axios.post('/users/login', {
        email,
        password
      });
      localStorage.setItem('token', data.token);
      sessionStorage.setItem('flashMessage', "Successfully logged in.");
      await userCheck();
      navigate('/');
    } catch (error) {
      setError(error?.response?.data?.msg || "Something went wrong.");
    }
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        {error && <div style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
        {message && (<div style={{padding: '10px', backgroundColor: '#d4edda', color: '#155724', marginBottom: '20px', borderRadius: '4px'}}>{message}</div>)}
        <div>
          <span>Email: </span>
          <input type="email" name='email' value={formData.email} onChange={handleChange} placeholder="Email" required/>
        </div>
        <br />
        <div>
          <span>Password: </span>
          <input type="password" name='password' value={formData.password} onChange={handleChange} placeholder="Password" required/>
        </div>
        <button type='submit'>Login</button>
        <Link to={"/register"}>Register</Link>
      </form>
    </section>
  )
}

export default Login