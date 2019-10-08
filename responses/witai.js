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
                console.log('yay, got wit.ai response: ', JSON.stringify(data,'',' '));
                if(data.entities.contact){
                    var mentionsCajunBot = data.entities.contact.filter(function(contact){
                        var value = contact.value.toLowerCase();
                        if(value === "<@490235035627028511>"){
                            return true;//@CajunBot
                        }
                        if(value === 'bot' || value === 'robot' || value === 'machine'){
                            return true;
                        }
                        if(value === 'cajun' || value === 'cajunbot' || value === 'cajun bot'){
                            return true;
                        }
                        if(value === 'cajon' || value === 'cajonbot' || value === 'cajon bot'){
                            return true;
                        }
                    });
                    console.log(mentionsCajunBot);
                    if(mentionsCajunBot.length >= 1 || msg.channel.type === 'dm'){


                        for(var prop in data.entities){
                            if(prop === "intent"){
                                data.entities[prop].forEach(function(intent){
                                    console.log(intent);
                                    if(intent.value === 'dad-joke' && intent.confidence > 0.9){
                                        responses['joke.js']._command(msg, 1);
                                    }
                                    if(intent.value === 'quote' && intent.confidence >0.9){
                                        if(data.entities.contact){

                                            var mentionsChuck = data.entities.contact.filter(function(contact){
                                                if(contact.value.toLowerCase() === 'chuck'){
                                                    return true;
                                                }
                                                if(contact.value.toLowerCase() === 'norris'){
                                                    return true;
                                                }
                                                if(contact.value.toLowerCase() === 'chuck norris'){
                                                    return true;
                                                }
                                            });
                                            var mentionsRon = data.entities.contact.filter(function(contact){
                                                if(contact.value.toLowerCase() === 'ron'){
                                                    return true;
                                                }
                                                if(contact.value.toLowerCase() === 'swanson'){
                                                    return true;
                                                }
                                                if(contact.value.toLowerCase() === 'ron swanson'){
                                                    return true;
                                                }
                                            });
                                            if(mentionsChuck.length>0){
                                                console.log('chuck meme incoming');
                                                responses['chuck-norris.js']._command(msg);
                                            } else if(mentionsRon.length>0){
                                                console.log('ron meme incoming');
                                                responses['ron-swanson.js']._command(msg);
                                            } else {
                                                console.log('quote about who? ', data.entities.contact[0].value);
                                            }
        
                                        } else {
                                            console.log('tell me a quote...', JSON.stringify(data,'',' '));
                                        }
                                    }
                                }); 
                            }
                        }
                    } else {
                        console.log('not sure message is for cajunbot');
                    }
                } else {
                    console.log('no contacts from wit.ai');
                }
            })
        }
    }
    }
};