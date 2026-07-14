const { use, useId } = require("react");
const dbConnection = require("../db/dbConfig");
const crypto = require("crypto");

async function ask(req, res) {
    const {questionTitle, questionDescription} = req.body;
    console.log(req)
    const userId = req.user.userid;
    if(!questionTitle || !questionDescription){
        return res.status(400).json({msg : "Please provide all required information."});
    }
    if(!userId){
        return res.status(400).json({msg: "Please login first"});
    }
    try {
        const questionID = "q_" + crypto.randomBytes(12).toString("hex");
        await dbConnection.query("INSERT INTO questions (questionid, userid, title, description) VALUES (?, ?, ?, ?)", [questionID, userId, questionTitle, questionDescription]);
        return res.status(201).json({msg: "Question successfully posted."});
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({msg: "Someting went wrong."})
    }
};
async function answer(req, res){
   const {answer, questionId} = req.body;
   const userId = req.user?.userid;

   if(!answer || !questionId){
    // return res.status(400).json({msg: "Please provide all required information."});
    return res.status(400).json({ msg: "Please provide your answer and the question reference." });
   }
   if(!userId){
    return res.status(401).json({msg: "Please login first."});
   }
   try {
    const [questionCheck] = await dbConnection.query("SELECT id FROM questions WHERE questionid = ?", [questionId]);
    if(questionCheck.length === 0){
        return res.status(404).json({msg: "The question you are trying to answer does not exist."});
    }
    await dbConnection.query("INSERT INTO answers (userid, questionid, answer) VALUES (?, ?, ?)", [userId, questionId, answer]);
    return res.status(201).json({msg: "Answer successfully posted."});
   } catch (error) {
    console.error(error.message);
    return res.status(500).json({msg: "Somethig went wrong."});
   }
};
async function question(req, res){
    const {questionID} = req.params;
    try {
        if(questionID){
            const [rows] = await dbConnection.query(`SELECT q.id, q.questionid, q.title, q.description, u.username FROM questions q JOIN users u ON q.uerid=u.userid WHERE q.questionid = ?`, [questionID]);
            if(rows.length === 0){
                return res.status(404).json({msg: "Question not found."});
            }
            return res.status(200).json({question: rows[0]});
        }
        else{
            const [rows] = await dbConnection.query(`SELECT q.id, q.questionid, q.title, u.username FROM questions q JOIN users u ON q.userid=u.userid ORDER BY q.id DESC`);
            return res.status(200).json({questions: rows});
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({msg: "Someting went wrong."});
    }
};

module.exports = {ask, answer, question};