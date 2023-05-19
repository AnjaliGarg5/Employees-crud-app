var dbcon = require("./../../config/database.config");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const argon2 = require("argon2");

function authenticateToken(req, res, next) {
    console.log(req);
    const authHeader = req.headers["authorization"];
    console.log(authHeader);
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      //console.log(err);
      if (err) return res.sendStatus(401);
      req.user = user;
      //console.log(user);
      next();
    });
  }

var Employee = function (emp) {
  this.id = user.id;
  this.fname = user.fname;
  this.lname = user.lname;
  this.email = user.email;
  this.phonenumber = user.phonenumber;
  this.dob = user.dob;
  this.city = user.city;
  this.state = user.state;
  this.country = user.country;
  this.pincode = user.pincode;
  this.gender = user.gender;
  this.education = user.education;
};

Employee.getList = function (req, result) {
  dbcon.createConnection();
  const con = dbcon.connect();
  console.log(req)
  const query = "SELECT * FROM personal_info";
  con.query(query, authenticateToken(req), function (error, response) {
    con.end();
    if (!error) {
      result(response);
    } else {
      result(
        null,
        JSON.stringify({
          success: false,
          message: "Something Went Wrong. Please try again",
        })
      );
    }
  });
};

module.exports = Employee;
