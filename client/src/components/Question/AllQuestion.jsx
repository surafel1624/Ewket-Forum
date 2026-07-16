import React, { useContext, useEffect, useState } from 'react';
import classes from './Question.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { AppState } from '../../App';
import axios from '../../API/axios';

function AllQuestion({searchTerm = ""}) {
  const {user} = useContext(AppState);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const filteredQuestions = questions.filter(q => (q.title || "").toLowerCase().includes(searchTerm.toLowerCase()));

  useEffect(() => {
    if(!user){
      navigate('/login');
      return;
    };
    async function fetchQuestions(){
      try {
        const currentToken = localStorage.getItem("token");
        if(!currentToken){
          navigate('/login');
          return;
        }
        const {data} = await axios.get('/questions/question', {
          headers: {
            Authorization: 'Bearer ' + currentToken
          }
        });
        setQuestions(data.questions || []);
      } catch (error) {
        console.error(error);
      }
      finally{
        setLoading(false);
      }
    }
    fetchQuestions();
  }, [user, navigate]);
  return (
    <>
    <div className={classes.questionsContainer}>
      <header className={classes.feedHeader}>
        <h2>All Questions</h2>
        <p>Browse the latest discussions from the community.</p>
      </header>
      <hr className={classes.divider} />
      {loading ? (
        <p className={classes.loadingText}>Loading questions...</p>
      ) : filteredQuestions.length === 0 ? (
        <p className={classes.warning}>No questions have been posted yet.</p>
      ) : (
        <div className={classes.questionsFeed}>
          {filteredQuestions.map((q) => {
            const initial = q.username ? q.username.charAt(0) : '?';
            return (
              <div className={classes.questionCard} key={q.questionid} onClick={() => navigate(`/question/${q.questionid}`)} style={{cursor: "pointer"}}>
                <div className={classes.cardLeft}>
                  <div className={classes.avatar}>{initial}</div>
                  <div className={classes.cardContent}>
                    <h4 className={classes.questionTitle}>{q.title}</h4>
                    <span className={classes.metaText}>Asked by: <strong>{q.username}</strong></span>
                  </div>
                </div>
                <div className={classes.cardRight}>
                  <span className={classes.arrowIcon}>&rarr;</span>
                </div>
            </div>
            );
          })}
        </div>
      )}
    </div>
    </>
  )
}

export default AllQuestion