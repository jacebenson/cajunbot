//http://quotes.rest/qod.json?category=funny
var https = require('https');
var URL = require('url').URL;
module.exports = {
    _command: function(msg){
        var url = 'http://quotes.rest/qod.json?category=funny';
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
                var obj = JSON.parse(data);
                var message = obj.contents.quotes[0].quote + '\n' + ' - ' + obj.contents.quotes[0].author;
                msg.channel.send(message);
                });
        }).on("error", (err) => {
            msg.channel.send("Error: `" + err.message + "`");
        });
    },
    command: function (bot, msg) {
        var phrases = ['!joke', '!laugh', '!funny'];
        if (msg.author.bot === false) {
            var wordsArr = msg.content.split(' ');
            wordsArr.map(function (word, index) {
                phrases.map(function (phrase) {
                    if (word.toLowerCase() === phrase) {
                        console.log('in joke.js');
                        var n = wordsArr[index + 1] || 1;
                        module.exports._command(msg,n);
                    }
                });
            });
        }
    },
    help: '`!quote` Will get a funny quote.'
};
