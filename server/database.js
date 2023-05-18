var mysql = require('mysql');

var con = mysql.createConnection({
    host:"127.0.0.1",
    port: "3306",
    user: "root",
    password: "root",
    database: "employees_data"
});

con.connect(function(err){
    if (err) throw err;
    console.log("Connected");
});

// con.query('SELECT * FROM personal_info', function (error, res, fields) {
//     if (error) throw error;
//     console.log(res);
//   });

module.exports = con;




