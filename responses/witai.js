const {Wit, log} = require('node-wit');
var clientToken = 'RIKH2DXKGM7HMWUI25VN5WWZLIHIPEWI';//publicly client side available
const client = new Wit({
    accessToken: process.env.witAIToken || clientToken,
    logger: new log.Logger(log.INFO)
});
module.exports = {
    command: function(bot, msg, responses) {
        if (msg.author.bot === false) {
            client.message(msg.content, {})
            .then((data)=>{
                console.log('yay, got wit.ai response: ', JSON.stringify(data));
                for(var prop in data.entities){
                    console.log(prop, data.entities[prop]);
                    if(prop === "joke" && data.entities[prop][0].confidence > 0.75){
                        //console.log(responses);
                        responses['joke.js']._command(msg, 1);
                    }
                    //if(prop === "contact" && data.entities[prop][0].confidence > 0.75){
                    //    msg.channel.send("This is about... " + data.entities[prop][0].value);
                    //}
                }
            })
        }
    }
};