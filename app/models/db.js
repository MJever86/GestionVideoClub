var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'jefe',
  password : 'videoclub',
  database: 'proyecto'
});

connection.connect();



module.exports = connection;
