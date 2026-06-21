const express = require('express');
const app = express();
const port = 4000;

app.post("/api/user/register", (req, res) =>{
    res.send("register user");
})
app.post("/api/user/login", (req, res) =>{
    res.send("login user");
})
app.get("/api/user/check", (req, res) =>{
    res.send("check user");
})



app.listen(port, ()=>{
    console.log(`listening on ${port}`);
}).on('error', (err) =>{
    console.log("server failed to start: ", err);
})