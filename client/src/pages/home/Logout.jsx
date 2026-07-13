import React, { useContext } from 'react';
import { AppState } from '../../App';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();
    const {setUser} = useContext(AppState);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser({});
        sessionStorage.setItem('flashMessage', "You have been successfully logged out.");
        navigate('/login');
    }
  return (
    <button
        onClick={handleLogout}
        style={{
            padding: '8px 16px',
            backgroundColor: '#dc3545',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
        }}
    >
        Logout</button>
  )
}

export default Logout