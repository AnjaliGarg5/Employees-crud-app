var mysql = require("mysql");

var db_config = {
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  password: "root",
  database: "employees_data",
};

let dbcon;

let createConnection = function () {
  dbcon = mysql.createConnection(db_config);
};

let connect = function () {
  dbcon.connect(function (err) {
    if (err) {
      if (err.code === "PROTOCOL_CONNECTION_LOST") {
        console.log(err);
      } else {
        console.log(err);
      }
    }
  });
  return dbcon
};

module.exports = {
    createConnection,
    connect
};
