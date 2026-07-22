import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Footer.module.css';
import Ewket_Forum from '../../assets/ewket_forum_logo.png';

function Footer() {
    const currentYear = new Date().getFullYear();
  return (
    <footer className={classes.footer}>
        <div className={classes.container}>
            <div className={classes.topSection}>
                <div className={classes.brandCol}>
                    <img src={Ewket_Forum} alt="Ewket Forum Logo" className={classes.logo} />
                    <p className={classes.description}>A community driven platform for developers to ask questions, share knowledge, and build the future together.</p>
                </div>
                <div className={classes.linksGrid}>
                    <div className={classes.linkGroup}>
                        <h3 className={classes.groupTitle}>Platform</h3>
                        <Link to="/" className={classes.link}>Home</Link>
                        <Link to="/ask" className={classes.link}>Ask a Question</Link>
                        <Link to="/tags" className={classes.link}>Browse Tags</Link>
                    </div>
                    <div className={classes.linkGroup}>
                        <h3 className={classes.groupTitle}>Company</h3>
                        <Link to="/about" className={classes.link}>About Us</Link>
                        <Link to="/contact" className={classes.link}>Contact</Link>
                        <Link to="/privacy" className={classes.link}>Privacy Policy</Link>
                    </div>
                </div>
            </div>
            <div className={classes.bottomSection}>
                <p className={classes.copyright}>&copy; {currentYear} Ewket Forum. All rights reserved.</p>
                <div className={classes.socialLinks}>
                    <a href="https://github.com/surafel1624" target='_blank' className={classes.socialIcon}>
                        <svg fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer