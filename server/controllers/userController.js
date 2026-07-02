const dbConnection = require('../db/dbConfig');
const bcrypt = require('bcrypt');

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
    res.send("login");
}
async function checkUser(req, res){
    res.send("checkUser");
}

module.exports = {register, login, checkUser};