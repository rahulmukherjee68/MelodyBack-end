'user strict';

var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'R@r9835559603',
    database : 'melody'
});

connection.connect(function(err) {
    if (err) throw err;
});
module.exports = connection;