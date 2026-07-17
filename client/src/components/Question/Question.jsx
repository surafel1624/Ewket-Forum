import React, { useContext, useEffect, useState } from 'react';
import classes from "./Question.module.css";
import { useNavigate, useParams } from 'react-router-dom';
import { AppState } from '../../App';
import axios from '../../API/axios';
import Header from '../Header/Header';

function Question() {
  const {questionid} = useParams();
  const {user} = useContext(AppState);
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState([]);
  const [newAnswer, setNewAnswer] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

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
      setSuccessMessage("Your answer was successfully posted.");
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    } catch (error) {
      console.error(error);
      alert("Could not post your answer. Please try again.");
    } finally{
      setSubmitting(false);
    }
  };
  if(loading){
    return (
      <div className={classes.centerState}>
        <div className={classes.spinner}>
          <p>Loading question details...</p>
        </div>
      </div>
    );
  }
  if(!question){
    return (
      <div className={classes.centerState}>
        <p className={classes.errorText}>Question not found.</p>
        <button className={classes.backBtn} onClick={() => navigate(-1)}>Return to feed</button>
      </div>
    )
  }
  return (
  <>
    <Header />
    <div className={classes.detailContainer}>
      <article className={classes.maniQuestionCard}>
        <div className={classes.questionHeader}>
          <div className={classes.userBadgeRow}>
            <div className={classes.profileCluster}>
              <div className={classes.userAvatarCircle}>{question.username ? question.username.charAt(0).toUpperCase() : '?'}</div>
              <span className={classes.authorName}>{question.username}</span>
            </div>
            <button className={classes.backBtn} onClick={() => navigate(-1)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Back<span className={classes.backBtnText}> to feed</span>
            </button>
          </div>
          <h2 className={classes.detailTitle}>{question.title}</h2>
        </div>
        <div className={classes.questionBody}>
          <p>{question.description || "No content provided."}</p>
        </div>
      </article>
      <hr />
      <div className={classes.answer}>
        <section className={classes.answerSection}>
          <h3 className={classes.sectionTitle}>Answer <span className={classes.answerCountBubble}>{answer.length}</span></h3>
          {answer.length === 0? (
            <div className={classes.emptyResponseCard}>
              <p className={classes.noResponse}>No responses yet. Be the first to share your thoughts!</p>
            </div>
          ) : (
            <div className={classes.answerList}>
              {answer.map((ans, idx) =>(
                <div key={idx} className={classes.answerCard}>
                  <div className={classes.answerHeader}>
                    <div className={classes.miniAvatar}>{ans.username ? ans.username.charAt(0).toUpperCase() : '?'}</div>
                    <span>Answered by: <strong>{ans.username}</strong></span>
                  </div>
                  <div className={classes.answerBody}>
                    <p>{ans.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
      <section className={classes.postAnswer}>
        <h4 className={classes.workspaceTitle}>Your Answer</h4>
        {successMessage && (
          <div className={classes.flashMessage}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            {successMessage}
          </div>
        )}
        <form onSubmit={handleAnswerSubmit} className={classes.answerForm}>
            <div className={classes.formGroup}>
              <textarea rows={5} value={newAnswer} onChange={(e) => setNewAnswer(e.target.value)} placeholder='Type your answer cleanly here...' maxLength={1500} required />
              <span className={classes.counter}>{newAnswer.length} / 1500 Characters</span>
            </div>
            <div className={classes.formActions}>
              <button type='submit' className={classes.submitReplyBtn} disabled={submitting} >{submitting ? "Posting..." : "Post Answer"}</button>
            </div>
        </form>
      </section>
    </div>
  </>
  )
}

export default Question