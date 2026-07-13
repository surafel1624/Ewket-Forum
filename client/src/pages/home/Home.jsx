import React, { useContext, useEffect, useState } from 'react'
import { AppState } from '../../App';
import Logout from './Logout';

function Home() {
  const {user} = useContext(AppState);
  const [message, setMessage] = useState('');
  const savedMessage = sessionStorage.getItem('flashMessage');
  useEffect(() => {
    // const savedMessage = sessionStorage.getItem('flashMessage');
    if(savedMessage){
      setMessage(savedMessage);
      sessionStorage.removeItem('flashMessage');
    }
  }, []);
  return (
    <div>
      {message && (<div style={{padding: '10px', backgroundColor: '#d4edda', color: '#155724', marginBottom: '20px', borderRadius: '4px'}}>{message}</div>)}
      <h1>Home</h1>
      <br />
      <h2>Wellcome, {user.username}</h2>
      <Logout/>
    </div>
  )
}

export default Home