var express = require('express');
var router = express.Router();
var mysql = require('./mysql');
var twillio = require('./twillio');

router.post('/needhelp', function (req, res){
    console.log(req.body);
    // add the user in need help table
    var query = "INSERT INTO PERSONS VALUES ('"+  req.body.number +"','" + req.body.latitude +"','" + req.body.longitude+"','"+req.body.personType+"')";
    console.log(query);
    mysql.executeQuery(function(err){
        if (err){
            return res.status(400).json({error:"you are registered already! help is on way"});
        } else{
            mysql.fetchData(function(err, results){
                if (err){
                    console.log(err);
                }else{
                    for (var i=0; i < results.length; i++){
                        // console.log(results[i]);
                        twillio.sendMessage(results[i].number, "someone need help, click link to see. Link- " );
                    }
                }
            },"select * from persons where person_type='1'" );
            // select query to check nearest provider for victim :: use npm package for location
            // Twillio message to provide helpers
            return res.json({message:"help is on way"})
        }
    }, query);
});

router.post('/providehelp', function (req, res){
    var userNumber = req.number;
    // add the user in need help table
    var query = "INSERT INTO PERSONS VALUES ('"+  req.body.number +"','" + req.body.latitude +"','" + req.body.longitude+"','"+req.body.personType+"')";
    console.log(query);
    mysql.executeQuery(function(err){
        if (err){
            console.log(err);
            return res.status(400);
        }else{
            // select query to check nearest provider for victim :: use npm package for location
            // Twillio message to provide helper
            return res.json({message:"Thanks you will receive a text shortly"})
        }
    }, query);
});

router.get('/providehelp', function (req, res){
    "use strict";
    var query =  "select * from persons where person_type=1";
    mysql.fetchData(function(err, results){
        console.log("herere");
        if (err){
            console.log(err);
            return res.status(400);
        }else{
            // select query to check nearest provider for victim :: use npm package for location
            // Twillio message to provide helper
            return res.json({result:results});
        }
    }, query);
});

module.exports = router;
