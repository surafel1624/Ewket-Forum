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
        console.log("Current token found in localstorage: ", currentToken);
        if(!currentToken){
          console.warn("No token found. Redirecting...");
          navigate('/login');
          return;
        }
        const {data} = await axios.get('/questions/question', {
          headers: {
            Authorization: 'Bearer ' + currentToken
          }
        });
        console.log(data);
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
    <div>
        <p>➡ What is DIV?</p>
        <p>- How to center a div?</p>
        <p>Ansers form the community.</p>
        {/* <Link to={"/question/${questionid - for reference see amazon clone - category card}"}><div>Question 1</div></Link> */}
        <div style={{border: "1px solid black", height: "100px", overflowY: "scroll"}}>
            <div>Question 1</div>
            <div>Question 2</div>
            <div>Question 4</div>
            <div>Question 5</div>
            <div>Question 6</div>
            <div>Question 7</div>
            <div>Question 8</div>
            <div>Question 9</div>
        </div>
    </div>
    <br /> <br />
    <div>
        <textarea name="" id="" rows={7} cols={47} placeholder='Give answer for this question...'></textarea>
    </div>
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
            <div key={q.questionid} onClick={() => navigate(`/question/${q.questionid}`)}>
              <h4 className={classes.questionTitle}>{q.title}</h4>
              <p className={classes.questionDescription}>
                {(q.description || "").length > 150 ? q.description.substring(0, 150) + "..." : (q.description || "No description provided.")}
              </p>
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