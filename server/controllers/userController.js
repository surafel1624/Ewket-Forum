const dbConnection = require('../db/dbConfig');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function register(req, res){
    const {username, firstname, lastname, email, password} = req.body;
    if(!username || !firstname || !lastname || !email || !password){
        return res.status(400).json({msg: "please proveide all required infromation."});
    }
    try {
        const [user] = await dbConnection.query("SELECT username, userid FROM users WHERE username = ? or email = ?", [username, email]);
        if(user.length > 0){
            return res.status(400).json({msg: "User already registered."});
        }
        if(password.length < 8){
            return res.status(400).json({msg: "Password must be at least 8 character."});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await dbConnection.query("INSERT INTO users (username, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)", 
            [username, firstname, lastname, email, hashedPassword]
        );
        return res.status(201).json({msg: "User registered successfully."});
    } catch (error) {
        console.error("Registration error: ", error.message);
        return res.status(500).json({msg: "Something went wrong."});
    }
}
async function login(req, res){
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({msg: "Please enter all required fields."});
    }
    try {
        const [user] = await dbConnection.query("SELECT username, userid, password FROM users WHERE email = ?", [email]);
        if(user == 0){
            return res.status(401).json({msg: "Invalid email or password."});
        }
        const isMatch = await bcrypt.compare(password, user[0].password);
        if(!isMatch){
            return res.status(401).json({msg: "Invalid email or password."});
        }
        const username = user[0].username;
        const userid = user[0].userid;
        const token = jwt.sign({username, userid}, "secret", {expiresIn: "1d"});
        return res.status(200).json({msg: "User login successful", token});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({msg: "Something went wrong."});
    }
}
async function checkUser(req, res){
    const {username, userid} = req.user;

    res.status(200).json({msg: "Valid user", username, userid});
}

module.exports = {register, login, checkUser};