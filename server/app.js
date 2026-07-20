require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const dbConnection = require('./db/dbConfig');
const userRoutes = require('./routes/userRoute');
const questionRoutes = require('./routes/questionRoute');
const authMiddleware = require('./middlewares/auth');
const cors = require('cors');

app.use(cors({origin: ['https://ewketforum.netlify.app', 'http://localhost:5173'], credentials: true}));
app.use(express.json());

app.get('/api/health', async (req, res) => {
    try {
        await dbConnection.execute("SELECT 1");
        res.status(200).json({status: "UP", message: "Server and Database are healthy."});
    } catch (error) {
        res.status(500).json({status: "DOWN", error: error.message});
    }
});

app.use("/api/users", userRoutes);
app.use("/api/questions", authMiddleware, questionRoutes);

async function start(){
    try{
        const result = await dbConnection.execute("select 'test' ");
        console.log("Database connection verified successfully.")
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