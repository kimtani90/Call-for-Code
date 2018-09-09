var express = require('express');
var router = express.Router();

var mysql = require('./mysql');

var contacts= ['4088861711', '5104588530'];
var twillio = require('./twillio');

/* GET home page. */
router.get('/broadcast', function(req, res, next) {

    for(var i=0;i<contacts.length;i++) {
        twillio.sendMessage(contacts[i], "we are here to help you. Please click on the link to tell us if you need help or you can provide help" +
            " http://locahost:3000?contact=" + contacts[i]);
    }
});

router.post('/mapperson', function(req, res, next) {

    var body = req.body;

    var victimContact = body.victimContact;
    var providerContact = body.providerContact;

    var getMapping="select active from persons where phone_number='"+victimContact+"' and active = 0";
    console.log("Query is:"+getUser);

    mysql.fetchData(function(err,results){
        if(err){
            throw err;
        }
        else
        {

            if(results.length > 0){

                console.log("valid Login");

                var insertUser="insert into personMappings (provider, victim) values ( '"+providerContact
                    +"' ,'" + victimContact +"')";


                mysql.executeQuery(function(err){
                    if(err){
                        console.log("Error inserting data....")
                    }
                    else
                    {
                        console.log("Data inserted....")
                        res.send({"status":201, "email" :reqEmail});

                    }
                },insertUser);

            }
            else {

                console.log("Invalid");
                res.status(401).json({message: "failed"});
            }
        }
    },getMapping);


});

module.exports = router;