import React, { useContext, useEffect, useState } from 'react';
import classes from './Question.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { AppState } from '../../App';
import axios from '../../API/axios';

function AllQuestion() {
  const {user} = useContext(AppState);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    <div className={classes.container}>
      <header>
        <h2>All Questions</h2>
        <p>Browse the latest discussions from the community.</p>
      </header>
      <hr />
      {loading ? (
        <p>Loading questions...</p>
      ) : questions.length === 0 ? (
        <p className={classes.warning}>No questions have been posted yet.</p>
      ) : (
        <div className={classes.questions}>
          {questions.map((q) => (
            <div key={q.questionid} onClick={() => navigate(`/question/${q.questionid}`)} style={{cursor: "pointer"}}>
              <h4 className={classes.questionTitle}>{q.title}</h4>
              {/* <p className={classes.questionDescription}>
                {(q.description || "").length > 150 ? q.description.substring(0, 150) + "..." : (q.description || "No description provided.")}
              </p> */}
              <span>Asked by: <strong>{q.username}</strong></span>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  )
}

export default AllQuestion