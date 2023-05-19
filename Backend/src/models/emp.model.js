var dbcon = require("./../../config/database.config");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");

var Employee = function (emp) {
  this.id = emp.id;
  this.fname = emp.fname;
  this.lname = emp.lname;
  this.email = emp.email;
  this.phonenumber = emp.phonenumber;
  this.dob = emp.dob;
  this.city = emp.city;
  this.state = emp.state;
  this.country = emp.country;
  this.pincode = emp.pincode;
  this.gender = emp.gender;
  this.education = emp.education;
};

Employee.getList = function (req, result) {
  dbcon.createConnection();
  const con = dbcon.connect();
  const query = "SELECT * FROM personal_info";
  con.query(query, function (error, response) {
    con.end();
    if (!error) {
      result(null, response);
    } else {
      console.log(error);
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

Employee.login = function (email, pwd, result) {
  dbcon.createConnection();
  const con = dbcon.connect();
  const query = "SELECT email, name, pwd FROM `registered` WHERE email = ? ";
  con.query(query, [email], async function (error, response) {
    var data;
    if (!error) {
      if (response.rowCount == 0) {
        return result.send("First Register yourself!");
      } else {
        try {
          var hpwd = response[0].pwd;
          await argon2.verify(hpwd, pwd).then((match) => {
            if (match) {
              data = response;
              token = jwt.sign({ ...data }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "24h",
              });
              data = { name: response[0].name, email: response[0].email };
              var auth = {
                idToken: token,
                expiresIn: "24h",
              };
              result(null, auth);
            } else {
              result(
                null,
                JSON.stringify({
                  success: false,
                  message: "Incorrect Password",
                })
              );
            }
          });
        } catch (error) {
          console.log(error);
          result(
            null,
            JSON.stringify({
              success: false,
              message: "In catch",
            })
          );
        }
      }
    } else console.log(error);
  });
  con.end();
};

Employee.register = function (name, email, pwd, result) {
  dbcon.createConnection();
  const con = dbcon.connect();
  try {
    var hpwd = "";
    argon2.hash(pwd).then((hashedPwd) => {
      hpwd = hashedPwd;
      var sql = "INSERT INTO `registered` (email, pwd, name) VALUES (?, ?, ?)";
      con.query(sql, [email, hpwd, name], function (error, response) {
        con.end();
        if (!error)
          result(
            null,
            JSON.stringify({
              success: true,
              message: "Registered! Login to get your Token.",
            })
          );
        else console.log(error);
      });
    });
  } catch {
    result(
      null,
      JSON.stringify({
        success: false,
        message: "Something Went Wrong. Please try again",
      })
    );
  }
};

Employee.add = function (body, result) {
  dbcon.createConnection();
  const con = dbcon.connect();

  var fname = body.fname;
  var lname = body.lname;
  var email = body.email;
  var phonenumber = body.phonenumber;
  var dob = body.dob;
  var gender = body.gender;
  var city = body.city;
  var state = body.state;
  var country = body.country;
  var pincode = body.pincode;
  var education = body.education;
  var data;

  var sql =
    "INSERT INTO `personal_info` (fname, lname, email, phonenumber, dob, gender, city, state, country, pincode, education) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  con.query(
    sql,
    [
      fname,
      lname,
      email,
      phonenumber,
      dob,
      gender,
      city,
      state,
      country,
      pincode,
      education,
    ],
    function (error, resp) {
      if (!error) {
        con.query(
          "SELECT * FROM personal_info WHERE (id =(SELECT MAX(id) AS 'maxID' FROM personal_info)) ",
          function (error, res) {
            con.end();
            if (!error) {
              data = res;
              result(null, data);
            } else console.log(error);
          }
        );
      } else console.log(error);
    }
  );
};

Employee.delete = function(id, result){
  dbcon.createConnection();
  const con = dbcon.connect();
  var sql = "DELETE FROM personal_info WHERE id= ?";
  con.query(sql, [id], function (error, response) {
    con.end();
    if (!error) result(null, response);
    else console.log(error);
  });
  
}

Employee.update = function(id, body, result){
  dbcon.createConnection();
  const con = dbcon.connect();

  var fname = body.fname;
  var lname = body.lname;
  var email = body.email;
  var phonenumber = body.phonenumber;
  var dob = body.dob;
  var gender = body.gender;
  var city = body.city;
  var state = body.state;
  var country = body.country;
  var pincode = body.pincode;
  var education = body.education;
  console.log(id)
  var sql =
    "UPDATE `personal_info` SET `fname` = ?, `lname` = ?, `email` = ?, `phonenumber` = ?, `dob` = ?, `gender`=?, `city` = ?, `state` = ?, `country` = ?, `pincode` = ?, `education` = ?  WHERE (`id` = ?) ";
  con.query(
    sql,
    [
      fname,
      lname,
      email,
      phonenumber,
      dob,
      gender,
      city,
      state,
      country,
      pincode,
      education,
      id,
    ],
    function (error, response) {
      con.end();
      console.log(response)
      if (!error) result(null, response);
      else console.log(error);
    }
  );
 
}

Employee.getId = function(id, result){
  dbcon.createConnection();
  const con = dbcon.connect();
  con.query(
    "SELECT * FROM personal_info WHERE id = ? ",
    [id],
    function (error, response) {
      con.end();
      if (!error) {
        result(null, response);
      } else console.log(error);
    }
  );
 
}

module.exports = Employee;
