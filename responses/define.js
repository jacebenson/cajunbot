var https = require('https');
var URL = require('url').URL;
module.exports = {
    command: function(bot, msg) {
        var phrases = ['!define', '!def'];
        if (msg.author.bot === false) {
            var wordsArr = msg.content.split(' ');
            wordsArr.map(function(word, index) {
                phrases.map(function(phrase) {
                    if (word.toLowerCase() === phrase) {
                        var search = wordsArr.join('').replace(word, '');
                        var url = 'https://api.urbandictionary.com/v0/define?term=' + search;
                        console.log(url);
                        url = new URL(url);
                        var options = {
                            timeout: 3000,
                            host: url.host,
                            path: url.pathname,
                            headers: {
                                'Accept': 'application/json'
                            }
                        }
                        https.get(options, (resp) => {
                            var data = '';
                            resp.on('data', (chunk) => {
                                data += chunk;
                            });
                            // The whole response has been received. Print out the result.
                            resp.on('end', () => {
                                //console.log(JSON.parse(data).explanation);
                                var message;
                                var obj = JSON.parse(data);
                                try{
                                console.log(JSON.stringify(obj));
                                message = obj[0].definition;
                                bot.createMessage(msg.channel.id, message);
                                } catch (e) {
                                    console.log(e);
                                }
                            });
                        }).on("error", (err) => {
                            bot.createMessage(msg.channel.id, "Error: `" + err.message + "`");
                        });
                    }
                });
            });
        }
    },
    help: '`!joke` Will get a joke from one of two apis.'
};

var rand = function(arr) {
    //console.log('in random.');
    var random_choice = Math.floor(Math.random() * arr.length);
    return arr[random_choice];
}