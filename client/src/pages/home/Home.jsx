import React, { useContext, useEffect, useState } from 'react'
import { AppState } from '../../App';
import Header from '../../components/Header/Header';
import { Link, useNavigate } from 'react-router-dom';
import AllQuestion from '../../components/question/AllQuestion';

function Home() {
  const {user} = useContext(AppState);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    if(!user) {
      navigate("/login");
      return;
    }
    const savedMessage = sessionStorage.getItem('flashMessage');
    if(savedMessage){
      setMessage(savedMessage);
      sessionStorage.removeItem('flashMessage');
    };
  }, [user, navigate]);
  return (
    <div>
      <Header />
      <br />
      <br />
      {message && (<div style={{padding: '10px', backgroundColor: '#d4edda', color: '#155724', marginBottom: '20px', borderRadius: '4px'}}>{message}</div>)}
      <h1>Home</h1>
      <AllQuestion/>
      <br />
      <h2>Wellcome, {user?.username}</h2>
      <Link to="/ask">Ask</Link>
    </div>
  )
}

export default Home