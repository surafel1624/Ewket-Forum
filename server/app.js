const express = require('express');
const app = express();
const port = 4000;
const dbConnection = require('./db/dbConfig');
const userRoutes = require("./routes/userRoute");

app.use(express.json());
app.use("/api/users", userRoutes);

async function start(){
    try{
        const result = await dbConnection.execute("select 'test' ");
        console.log("Database connection verified seccessfully.")
        app.listen(port, ()=>{
            console.log(`listening on ${port}`);
        }).on('error', (err) =>{
            console.error("server failed to start: ", err.message);
        });
    }
    catch (error){
        console.error("App initialization failed: ", error.message);
        process.exit(1);
    }
};

start();