import React, { useContext, useEffect, useState } from 'react'
import { AppState } from '../../App'
import { useNavigate } from 'react-router-dom';
import axios from '../../API/axios';
import classes from './Ask.module.css';

function Ask() {
  const {user, userCheck} = useContext(AppState);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);

  useEffect(() =>{
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if(!token){
        navigate("/login");
        return;
      }
      if(!user || !user.username){
        try {
          await userCheck ();
        } catch (error) {
          navigate("/login");
          return;
        }
      }
      setAuthChecking(false);
    };
    checkAuth();
  }, [user, navigate, userCheck]);
  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(!title.trim() || !description.trim()) return;
    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(`/questions/ask`, {
        questionTitle: title,
        questionDescription: description
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate('/', {state: {message: "Your question was successfully posted!"}});
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.msg || "Something went wrong. Please try again");
      setSubmitting(false);
    }
  };
  if(authChecking){
    return(
      <div style={{ textAlign: 'center', marginTop: '100px', fontFamily: 'sans-serif' }}>
        <h3>Verifying authentication...</h3>
      </div>
    );
  }
  return (
    <div className={classes.container}>
      <div className={classes.tipsCard}>
        <h3>Steps to write a good question.</h3>
        <ol>
            <li>Summarize your problem in a clear, one-line title.</li>
            <li>Describe what you tried and what you expected to happen.</li>
            <li>Review your question and post it to the community.</li>
        </ol>
      </div>
      <br />
      <div className={classes.formCard}>
        <p className={classes.formTitle}>Post your question</p>
        <form onSubmit={handleSubmit}>
          <div className={classes.formGroup}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Question title' required/>
          </div>
          <br />
          <div className={classes.formGroup}>
            <textarea rows={7} cols={47} value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Question description' required></textarea>
          </div>
          <div className={classes.actions}>
            <button className={classes.submitBtn} type='submit' disabled={submitting}>{submitting ? "Publishing..." : "Post your question"}</button>
            <button className={classes.cancelBtn} type='button' onClick={() => navigate('/')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Ask