module.exports = {
    command: function(bot, msg) {
        var phrase = '!ping';
        if (msg.author.bot === false) {
            var wordsArr = msg.content.split(' ');
            wordsArr.map(function(word, index) {
                if (word.toLowerCase() === phrase) {
                    var https = require('https');
                    var url = msg.content.replace(phrase, '').trim();
                    if(url.indexOf('http')==-1){
                        url = 'https://' + url;
                    }
                    https.get(url, (resp) => {
                        var data = '';
                        // A chunk of data has been recieved.
                        resp.on('data', (chunk) => {
                            data += chunk;
                        });
                        // The whole response has been received. Print out the result.
                        resp.on('end', () => {
                            //console.log(JSON.parse(data).explanation);
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
