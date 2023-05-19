const Employees = require('../models/emp.model');

exports.getList = function(req, res){
    Employees.getList(req, function(err, emp){
        if(err) res.send(JSON.stringify({success: false, message: 'Something went wrong. Please try after some time'}));
        res.json(emp);
    });
};

exports.login = function(req, res){
    console.log(req.body);
    Employees.login(req.body.email, req.body.pwd , function(err, response){
        if(err) res.send(JSON.stringify({success: false, message: 'Something went wrong. Please try after some time'}));
        res.json(response);
    });
};

exports.register = function(req, res){
    Employees.register(req.body.name, req.body.email, req.body.pwd, function(err, response){
        if(err) res.send(JSON.stringify({success: false, message: 'Something went wrong. Please try after some time'}));
        res.json(response);
    });
};

exports.getId = function(req, res){
    Employees.getId(req.params.id, function(err, response){
        if(err) res.send(JSON.stringify({success: false, message: 'Something went wrong. Please try after some time'}));
        res.json(response);
    });
};

exports.add = function(req, res){
    Employees.add(req.body, function(err, response){
        if(err) res.send(JSON.stringify({success: false, message: 'Something went wrong. Please try after some time'}));
        res.json(response);
    });
};

exports.delete = function(req, res){
    Employees.delete(req.params.id, function(err, response){
        if(err) res.send(JSON.stringify({success: false, message: 'Something went wrong. Please try after some time'}));
        res.json(response);
    });
};


exports.update = function(req, res){
    Employees.update(req.params.id, req.body, function(err, response){
        if(err) res.send(JSON.stringify({success: false, message: 'Something went wrong. Please try after some time'}));
        res.json(response);
    });
};

