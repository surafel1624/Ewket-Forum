import React, { useContext, useEffect, useState } from 'react'
import { AppState } from '../../App';
import Header from '../../components/Header/Header';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AllQuestion from '../../components/question/AllQuestion';
import classes from './Home.module.css';

function Home() {
  const {user} = useContext(AppState);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const messagee = location.state?.message;
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
    <div className={classes.container}>
      <Header />
      <div className={classes.welcomeRow}>
        <div className={classes.welcomeText}>
          <h2>Welcome, <span>{user?.username}</span></h2>
          <p>Troubleshoot, review structures, and collaborate with peers.</p>
        </div>
        <Link to="/ask" className={classes.askBtn}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          Ask Question
        </Link>
      </div>
      {(message || messagee) && (
        <div className={classes.flashMessage}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          {message || messagee}
        </div>
      )}
      <section className={classes.searchBox}>
        <div className={classes.searchWrapper}>
          <svg className={classes.searchIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder='Search for questioins, tags or topics...' className={classes.searchInput} />
          <kbd className={classes.hotkey}>⌘ K</kbd>
        </div>
      </section>
      <AllQuestion searchTerm={searchTerm}/>
      <br />
    </div>
  )
}

export default Home