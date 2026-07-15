const express = require('express');
const router = express.Router();
const {ask, answer, question, singleQuestion} = require('../controllers/questionController');

router.post("/ask", ask);
router.post("/answer", answer);
router.get("/question", question);
router.get("/question/:questionid", question);
router.get("/answer/:questionid", singleQuestion);

module.exports = router;