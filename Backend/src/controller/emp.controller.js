const Employees = require('../models/emp.model');

exports.getList = function(req, res){
    console.log(req);
    Employees.getList(req, function(err, emp){
        if(err) res.send(JSON.stringify({success: false, message: 'Something went wrong. Please try after some time'}));
        res.json(emp);
    });
};
