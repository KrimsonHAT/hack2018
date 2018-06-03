var mysql = require('mysql');

var pool = mysql.createPool({
    host: "18.191.10.26",
    user: "maestro",
    password: "themaster",
    database: "codevs",
    acquireTimeout: 4000,
    dateStrings: true,
    connectionLimit: 100
});

module.exports=pool;