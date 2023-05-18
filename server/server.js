const http = require("http");
require("dotenv").config();

const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const con = require("./database");
const argon2 = require("argon2");
var cors = require("cors");
app.use(cors());
app.use(express.json());

var data;


app.get("/", authenticateToken, function (req, res) {
  con.query("SELECT * FROM personal_info", function (error, response) {
    if (!error) {
      res.send(response);
    } else console.log(error);
  });
});

app.get("/getId/:id", authenticateToken, function (req, res) {
  var id = parseInt(req.params.id);
  con.query(
    "SELECT * FROM personal_info WHERE id = ? ",
    [id],
    function (error, response) {
      if (!error) {
        res.send(response);
      } else console.log(error);
    }
  );
});

app.post(
  "/add",
  authenticateToken,
  bodyParser.json(),
  function (req, response) {
    var fname = req.body.fname;
    var lname = req.body.lname;
    var email = req.body.email;
    var phonenumber = req.body.phonenumber;
    var dob = req.body.dob;
    var gender = req.body.gender;
    var city = req.body.city;
    var state = req.body.state;
    var country = req.body.country;
    var pincode = req.body.pincode;
    var education = req.body.education;

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
              if (!error) {
                data = res;
                response.send(data);
              } else console.log(error);
            }
          );
        } else console.log(error);
      }
    );
  }
);

app.delete(
  "/delete/:id",
  authenticateToken,
  bodyParser.json(),
  function (req, res) {
    console.log(req.params);
    console.log(req.params.id);
    var id = req.params.id;
    var sql = "DELETE FROM personal_info WHERE id= ?";
    con.query(sql, [id], function (error, response) {
      if (!error) res.send();
      else console.log(error);
    });
    res.send();
  }
);

app.put(
  "/update/:oid",
  authenticateToken,
  bodyParser.json(),
  function (req, res) {
    var oid = req.params.oid;
    var id = req.body.id;
    var fname = req.body.fname;
    var lname = req.body.lname;
    var email = req.body.email;
    var phonenumber = req.body.phonenumber;
    var dob = req.body.dob;
    var gender = req.body.gender;
    var city = req.body.city;
    var state = req.body.state;
    var country = req.body.country;
    var pincode = req.body.pincode;
    var education = req.body.education;
    var sql =
      "UPDATE `personal_info` SET `id` = ?, `fname` = ?, `lname` = ?, `email` = ?, `phonenumber` = ?, `dob` = ?, `gender`=?, `city` = ?, `state` = ?, `country` = ?, `pincode` = ?, `education` = ?  WHERE (`id` = ?) ";
    con.query(
      sql,
      [
        id,
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
        oid,
      ],
      function (error, response) {
        if (!error) res.send();
        else console.log(error);
      }
    );
  }
);

app.post("/login", (req, res) => {
  var email = req.body.email;
  var pwd = req.body.pwd;
  con.query(
    "SELECT email, name, pwd FROM `registered` WHERE email = ? ",
    [email],
    async function (error, response) {
      if (!error) {
        if (response.rowCount == 0) {
          return res.status(400).send("First Register yourself!");
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
                res.status(200).json({
                  idToken: token,
                });
              } else {
                res.status(500).send("Incorrect password");
              }
            });
          } catch (error) {
            console.log(error);
            res.status(501).send("catch");
          }
        }
      } else console.log(error);
    }
  );
});

app.post("/register", bodyParser.json(), async function (req, res) {
  console.log(req.body);
  try {
    var name = req.body.name;
    var email = req.body.email;
    var pwd = req.body.pwd;
    var hpwd = "";
    argon2.hash(pwd).then((hashedPwd) => {
      hpwd = hashedPwd;
      var sql = "INSERT INTO `registered` (email, pwd, name) VALUES (?, ?, ?)";
      con.query(sql, [email, hpwd, name], function (error, response) {
        if (!error) res.send("Registered! Login to get your Token.");
        else console.log(error);
      });
    });
  } catch {
    res.status(501).send();
  }
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
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

const ser = app.listen(8081, function () {
  console.log("http://localhost:%s", ser.address().port);
});