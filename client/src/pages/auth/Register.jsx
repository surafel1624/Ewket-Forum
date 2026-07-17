import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../API/axios';
import classes from './Register.module.css';
import Ewket_Forum from '../../assets/ewket_forum_logo.png';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({
      ...prev, [name]: value
    }));
    if(error) setError('');
  };

  async function handleSubmit(e){
    e.preventDefault();
    const {username, firstname, lastname, email, password} = formData;
    if(!username || !firstname || !lastname || !email || !password){
      setError("Please provide all required information.");
      return;
    }
    try {
      await axios.post('/users/register', {
        username,
        firstname,
        lastname,
        email,
        password
      });
      sessionStorage.setItem('flashMessage', "You are successfully registered. Please login.")
      navigate('/login');
    } catch (error) {
      setError(error?.response?.data?.msg || "Something went wrong.");
    }
  }
  return (
    <section className={classes.pageWrapper}>
      <div className={classes.authCard}>
        <div className={classes.header}>
          <img src={Ewket_Forum} alt="Ewket forum" className={classes.logo} />
          <h1 className={classes.title}>Create an account</h1>
          <p className={classes.subtitle}>Join our community today</p>
        </div>
        <form onSubmit={handleSubmit} className={classes.form}>
          {error && <div className={classes.errorMessage}>{error}</div>}
          <div className={classes.inputGroup}>
            <label className={classes.label} htmlFor='username'>Username</label>
            <input type="text" name='username' id='username' className={classes.input} value={formData.username} onChange={handleChange} placeholder="Username" required/>
          </div>
          <div className={classes.nameRow}>
            <div className={classes.inputGroup}>
              <label className={classes.label} htmlFor='firstName'>First Name</label>
              <input type="text" name='firstname' id='firstName' className={classes.input} value={formData.firstname} onChange={handleChange} placeholder="First name" required/>
            </div>
            <div className={classes.inputGroup}>
              <label className={classes.label} htmlFor='lastName'>Last Name</label>
              <input type="text" name='lastname' id='lastName' className={classes.input} value={formData.lastname} onChange={handleChange} placeholder="Last name" required/>
            </div>
          </div>
          <div className={classes.inputGroup}>
            <label className={classes.label} htmlFor='email'>Email</label>
            <input type="email" name='email' id='email' className={classes.input} value={formData.email} onChange={handleChange} placeholder="someone@example.com" required/>
          </div>
          <div className={classes.inputGroup}>
            <label className={classes.label} htmlFor='password'>Password</label>
            <input type="password" name='password' id='password' className={classes.input} value={formData.password} onChange={handleChange} placeholder="********" required/>
          </div>
          <button type='submit' className={classes.submitBtn}>Register</button>
        </form>
        <div className={classes.footer}>
          <p className={classes.footerText}>Already have an account?{' '}<Link to={"/login"} className={classes.signupLink}>Log in here</Link></p>
        </div>
      </div>
    </section>
  )
}

export default Register