import React, { useContext, useEffect, useState } from 'react';
import classes from "./Question.module.css";
import { useNavigate, useParams } from 'react-router-dom';
import { AppState } from '../../App';
import axios from '../../API/axios';

function Question() {
  const {questionid} = useParams();
  const {user} = useContext(AppState);
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState([]);
  const [newAnswer, setNewAnswer] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() =>{
    if(!user){
      navigate("/login");
      return;
    };
    async function fetchQuestionAnswers(){
      try {
        const token = localStorage.getItem("token");
        const headers = {Authorization: `Bearer ${token}`};

        const questionRes = await axios.get(`/questions/question/${questionid}`, {headers});
        setQuestion(questionRes.data.question || null);
        const answerRes = await axios.get(`/questions/answer/${questionid}`, {headers});
        setAnswer(answerRes.data.answers || []);
      } catch (error) {
        console.error(error);
      }
      finally{
        setLoading(false);
      }
    }
    fetchQuestionAnswers();
  }, [questionid, user, navigate]);
  const handleAnswerSubmit = async (e) =>{
    e.preventDefault();
    if(!newAnswer.trim()) return;
    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(`/questions/answer`, {
        answer: newAnswer,
        questionid: questionid
      }, {
        headers: {Authorization: `Bearer ${token}`}
      });
      setAnswer([{answer: newAnswer, username: user.username}, ...answer]);
      setNewAnswer('');
    } catch (error) {
      console.error(error);
      alert("Could not post your answer. Please try again.");
    } finally{
      setSubmitting(false);
    }
  };
  if(loading) return <div>Loading question details...</div>;
  if(!question) return <div>Question not found.</div>;
  return (
  <div className={classes.container}>
      {/* <div>
        <p>➡ What is DIV?</p>
        <p>- How to center a div?</p>
        <p>Ansers form the community.</p>
        <Link to={"/question/${questionid - for reference see amazon clone - category card}"}><div>Question 1</div></Link>
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
    </div> */}
    <button className={classes.backBtn} onClick={() => navigate(-1)}>Back to feed</button>
    <section className={question}>
      <h2>{question.title}</h2>
      <p>{question.description || "No content provided."}</p>
      <div><strong>{question.username}</strong></div>
    </section>
    <hr />
    <section className={classes.answer}>
      <h3>Answer ({answer.length})</h3>
      {answer.length === 0? (
        <p className={classes.noResponse}>No responses yet. Be the first to share your thoughts!</p>
      ) : (
        <div className={classes.answerList}>
          {answer.map((ans, idx) =>(
            <div key={idx}>
              <p>{ans.answer}</p>
              <span>Answered by: <strong>{ans.username}</strong></span>
            </div>
          ))}
        </div>
      )}
    </section>
    <section className={classes.postAnswer}>
      <h4>Your Answer</h4>
      <form onSubmit={handleAnswerSubmit}>
        <textarea rows={5} value={newAnswer} onChange={(e) => setNewAnswer(e.target.value)} placeholder='Type your answer cleanly here...' required />
          <button type='submit' disabled={submitting} >{submitting ? "Posting..." : "Post Answer"}</button>
      </form>
    </section>
  </div>
  )
}

export default Question