const {Wit, log} = require('node-wit');
var clientToken = 'RIKH2DXKGM7HMWUI25VN5WWZLIHIPEWI';//publicly client side available
const client = new Wit({
    accessToken: process.env.witAIToken || clientToken,
    logger: new log.Logger(log.INFO)
});
module.exports = {
    command: function(bot, msg, responses) {
        if (msg.author.bot === false) {
            if(msg.content.charAt(0) != '!'){
            client.message(msg.content, {})
            .then((data)=>{
                console.log('yay, got wit.ai response: ', JSON.stringify(data));

                for(var prop in data.entities){
                    if(prop === "intent"){
                        data.entities[prop].forEach(function(intent){
                            console.log(intent);
                            if(intent.value === 'dad-joke' && intent.confidence > 0.9){
                                responses['joke.js']._command(msg, 1);
                            }
                            if(intent.value === 'quote' && intent.confidence >0.9){
                                if(data.entities.contact){
                                    console.log(data.entities.contact[0]);
                                    if(data.entities.contact[0].value.toLowerCase().indexOf('chuck')>=0){
                                        console.log('chuck meme incoming');
                                        responses['chuck-norris.js']._command(msg);
                                    } else if(data.entities.contact[0].value.toLowerCase().indexOf('ron')>=0){
                                        console.log('ron meme incoming');
                                        responses['ron-swanson.js']._command(msg);
                                    } else {
                                        console.log('quote about who? ', data.entities.contact[0].value);
                                    }

                                } else {
                                    var randomPerson = [
                                        'chuck',
                                        'ron'
                                    ]
                                    console.log('tell me a quote...', JSON.stringify(data,'',' '));
                                }
                            }
                        }); 
                    }
                }
            })
        }
    }
    }
};