const express = require("express");
const app = express();
app.use(express.static("public")); // serves your HTML/CSS/JS

const mysql = require("mysql2");

// Connect to the same DB you created in MySQL Workbench
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Vonnie2468!!!!",   // same password Workbench uses
    database: "vonnie_db",   // must match EXACT schema name
    port: 3306
});


conn.connect(function(err) {
    if (err) {
        console.log("Could not connect to MySQL", err);
    } else {
        console.log("Database connection established");
    }
});

// Test query: read from Users table
conn.query("SELECT * FROM users", function(err, results) {
    if (err) {
        console.log("Query error:", err);
    } else {
        console.log("Users table data:");
        console.log(results);
    }
});

// Start server 
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
