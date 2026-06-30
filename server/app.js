const express = require('express');
const app = express();
const port = 4000;
const userRoutes = require("./routes/userRoute");

app.use("/api/users", userRoutes);

app.listen(port, ()=>{
    console.log(`listening on ${port}`);
}).on('error', (err) =>{
    console.log("server failed to start: ", err);
})