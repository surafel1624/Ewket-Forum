const express = require('express');
const router = express.Router();
const {ask, answer, question} = require('../controllers/questionController');

router.post("/ask", ask);
router.post("/answer", answer);
router.get("/question", question);

module.exports = router;