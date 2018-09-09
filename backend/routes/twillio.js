
const client = require('twilio')(accountSid, authToken);

var contacts= ['4088861711', '5104588530']


function sendMessage(to, message){
    client.messages
        .create({from: '+18508808710', body: message, to: to})
        .then(message => console.log(message.sid))
.done();
}

module.exports = sendMessage;