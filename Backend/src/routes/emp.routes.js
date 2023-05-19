const express = require("express");
const router = express.Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");

const empController = require("../controller/emp.controller");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(401);
    req.user = user;
    next();
  });
}

router.post("/register", empController.register);

router.post("/login", empController.login);

router.get("/getList", authenticateToken, empController.getList);

router.get("/getId/:id", authenticateToken, empController.getId);

router.post("/add", authenticateToken, empController.add);

router.delete("/delete/:id", authenticateToken, empController.delete);

router.put("/update/:id", authenticateToken, empController.update);

module.exports = router;
