import React from 'react';
import { Link } from 'react-router-dom';

function AllQuestion() {
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
    </>
  )
}

export default AllQuestion