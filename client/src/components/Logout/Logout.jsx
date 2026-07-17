import React, { useContext } from 'react';
import { AppState } from '../../App';
import { useNavigate } from 'react-router-dom';
import classes from './Logout.module.css';

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
    <button onClick={handleLogout} className={classes.logoutBtn}>
        <span className={classes.logoutText}>Logout</span>
        <svg className={classes.logoutIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
      </svg>
    </button>
  )
}

export default Logout