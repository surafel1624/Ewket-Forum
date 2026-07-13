import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../API/axios';

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
    <section>
      <form onSubmit={handleSubmit}>
        {error && <div style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
        <div>
          <span>Username: </span>
          <input type="text" name='username' value={formData.username} onChange={handleChange} placeholder="Username" required/>
        </div>
        <br />
        <div>
          <span>First name: </span>
          <input type="text" name='firstname' value={formData.firstname} onChange={handleChange} placeholder="First name" required/>
        </div>
        <br />
        <div>
          <span>Last name: </span>
          <input type="text" name='lastname' value={formData.lastname} onChange={handleChange} placeholder="Last name" required/>
        </div>
        <br />
        <div>
          <span>Email: </span>
          <input type="email" name='email' value={formData.email} onChange={handleChange} placeholder="Email" required/>
        </div>
        <br />
        <div>
          <span>Password: </span>
          <input type="password" name='password' value={formData.password} onChange={handleChange} placeholder="Password" required/>
        </div>
        <button type='submit'>Register</button>
        <Link to={"/login"}>Login</Link>
      </form>
    </section>
  )
}

export default Register