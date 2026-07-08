const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const {register, login, checkUser} = require('../controllers/userController');

router.post("/register", register);
router.post("/login", login);
router.get("/check", authMiddleware, checkUser);

module.exports = router;