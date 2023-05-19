require("dotenv").config();

const express = require("express");
const app = express();
var cors = require("cors");
app.use(cors());
app.use(express.json());

const empRoute = require('./src/Routes/emp.routes');

app.use('/employee', empRoute);


const ser = app.listen(8081, function () {
  console.log("http://localhost:%s", ser.address().port);
});
