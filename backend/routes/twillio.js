const accountSid = 'AC9cc8e76c2b2f7c11562e5709dab1e577';
const authToken = '005660016725ad603a16cdaec36271b0';
const client = require('twilio')(accountSid, authToken);

var contacts= ['4088861711', '5104588530']


function sendMessage(to, message){
    client.messages
        .create({from: '+18508808710', body: message, to: to})
        .then(message => console.log(message.sid))
.done();
}

module.exports = sendMessage;