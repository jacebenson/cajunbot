module.exports = {
    command: function(bot, msg) {
        var phrase = '!ping';
        if (msg.author.bot === false) {
            var wordsArr = msg.content.split(' ');
            wordsArr.map(function(word, index) {
                if (word.toLowerCase() === phrase) {
                    //msg.addReaction('💯'); //now geting error unknown emoji
                    //msg.addReaction('😅');
                    /*var msgs = bot.getMessages(msg.channel.id, 100).then(function(messages){
                      messages.map(function(message){
                        console.log('Deleting "'+message.content+'"');
                      bot.deleteMessage(msg.channel.id, message.id, 'Test Delete Content');
                      });
                    });
                bot.deleteMessage(msg.channel.id, msg.id, 'Test Delete Content');
                */
                    const https = require('https');
                    var url = msg.content.replace(phrase, '').trim();
                    if(url.indexOf('http')==-1){
                    url = 'https://' + url;
                    }
                    https.get(url, (resp) => {
                        let data = '';

                        // A chunk of data has been recieved.
                        resp.on('data', (chunk) => {
                            data += chunk;
                        });

                        // The whole response has been received. Print out the result.
                        resp.on('end', () => {
                            console.log(JSON.parse(data).explanation);
                            bot.createMessage(msg.channel.id, resp.statusCode);
                        });

                    }).on("error", (err) => {
                        console.log("Error: " + err.message);
                    });
                }
            });
        }
    },
    help: '`!ping` test ....'
};
