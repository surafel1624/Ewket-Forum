import React, { useContext, useEffect, useState } from 'react';
import classes from './AllQuestion.module.css';
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
        <div className={classes.headerTitles}>
          <h2>All Questions</h2>
          <p>Browse the latest discussions from the community.</p>
        </div>
      </header>
      <hr className={classes.divider} />
      <div className={classes.feedContent}>
        {loading ? (
          <div className={classes.stateWrapper}>
            <div className={classes.spinner}></div>
            <p className={classes.loadingText}>Loading questions...</p>
          </div>
        ) : filteredQuestions.length === 0 ? (
          <div className={classes.stateWrapper}>
            <svg className={classes.emptyIcon} width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <p className={classes.warning}>No questions found.</p>
          </div>
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
                    <svg className={classes.arrowIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                    {/* <span className={classes.arrowIcon}>&rarr;</span> */}
                  </div>
              </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
    </>
  )
}

export default AllQuestion