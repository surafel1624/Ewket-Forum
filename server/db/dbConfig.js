const mysql2 = require("mysql2");

const dbConnection = mysql2.createPool({
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT) || 10,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = dbConnection.promise();