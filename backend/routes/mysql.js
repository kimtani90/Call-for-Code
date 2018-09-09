const ibmdb = require('ibm_db');


function fetchData(callback,sqlQuery){
    console.log("\nSQL Query::"+sqlQuery);
    ibmdb.open("DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-dal09-03.services.dal.bluemix.net;UID=wfg35258;" +
        "PWD=wbs05@0jr9zr14vj;PORT=50000;PROTOCOL=TCPIP", function (err,conn) {
        if (err) return console.log(err);
        conn.query(function(err,connection) {
            connection.query(sqlQuery, function (err, rows, fields) {
                console.log("DB Results:" + rows);
                callback(err, rows);
            });
            console.log("\nConnection closed..");
            connection.release();
        });
    });
}


function executeQuery(callback,sqlQuery){
    // console.log("\nSQL Query::"+sqlQuery);
    ibmdb.open("DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-dal09-03.services.dal.bluemix.net;UID=wfg35258;" +
        "PWD=wbs05@0jr9zr14vj;PORT=50000;PROTOCOL=TCPIP", function (err,conn) {
        if (err) callback(err);
        conn.query(sqlQuery,function (err, data) {
            if (err) callback(err);
            else console.log(data);
            callback();
            conn.close();
    });
})}


exports.fetchData=fetchData;
exports.executeQuery=executeQuery;