import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../API/axios';
import { AppState } from '../../App';
import classes from './Login.module.css';
import Ewket_Forum from '../../assets/ewket_forum_logo.png';

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
    <section className={classes.pageWrapper}>
      <div className={classes.authCard}>
        <div className={classes.header}>
          <img src={Ewket_Forum} alt="Ewket forum" className={classes.logo} />
          <h1 className={classes.title}>Welcome back</h1>
          <p className={classes.subtitle}>Sing in to your account to continue</p>
        </div>
        <form onSubmit={handleSubmit} className={classes.form}>
          {error && <div className={classes.errorMessage}>{error}</div>}
          {message && (<div className={classes.successMessage}>{message}</div>)}
          <div className={classes.inputGroup}>
            <label htmlFor='email' className={classes.label}>Email Address</label>
            <input type="email" name='email' id='email' className={classes.input} value={formData.email} onChange={handleChange} placeholder="someone@example.com" required/>
          </div>
          <div className={classes.inputGroup}>
            <label htmlFor='password' className={classes.label}>Password</label>
            <input type="password" name='password' id='password' className={classes.input} value={formData.password} onChange={handleChange} placeholder="********" required/>
          </div>
          <button type='submit' className={classes.submitBtn}>Login</button>
        </form>
        <div className={classes.footer}>
          <p className={classes.footerText}>Don't have an account?{' '}<Link to={"/register"} className={classes.signupLink}>Register</Link></p>
        </div>
      </div>
    </section>
  )
}

export default Login