import React, { useContext } from 'react';
import classes from './Header.module.css';
import Logout from '../Logout/Logout';
import { AppState } from '../../App';
import { Link, useNavigate } from 'react-router-dom';
import Ewket_Forum from '../../assets/ewket_forum_nav_image.png';

function Header() {
  const {user} = useContext(AppState);
  const navigate = useNavigate();
  return (
    <header className={classes.header}>
      <div className={classes.floatingNav}>
        <div className={classes.leftSection}>
          <Link to="/" className={classes.logoLink}>
            <img src={Ewket_Forum} alt="Ewket Forum Logo" className={classes.logoImage} />
          </Link>
        </div>
        <div className={classes.rightSection}>
          {user && (
            <div className={classes.profileGroup} onClick={() => navigate('/')}>
              <div className={classes.avatarRing}>
                <div className={classes.avatarInner}>{user.username ? user.username.charAt(0).toUpperCase() : '?'}</div>
              </div>
            </div>
          )}
          <div className={classes.divider}></div>
          <div className={classes.logoutContainer}>
            <Logout/>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header