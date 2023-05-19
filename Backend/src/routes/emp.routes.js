const express = require("express");
const router = express.Router();

const empController = require("../controller/emp.controller");

router.get('/getList', empController.getList);

module.exports = router;
