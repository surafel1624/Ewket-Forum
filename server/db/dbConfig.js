const mysql2 = require("mysql2");

const dbConnection = mysql2.createPool({
    user: "root",
    database: "ewket_forum",
    host: "localhost",
    password: "",
    connectionLimit: 10
});

module.exports = dbConnection.promise();