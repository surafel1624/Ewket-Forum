const mysql2 = require("mysql2");

const dbconnection = mysql2.createPool({
    user: "root",
    database: "ewket_forum",
    host: "localhost",
    password: "",
    connectionLimit: 10
});

dbconnection.execute("select 'test'", (err, result) =>{
    if(err){
        console.log(err.message);
    }
    else{
        console.log(result);
    }
});