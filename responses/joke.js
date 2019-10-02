var https = require('https');
var URL = require('url').URL;
module.exports = {
    command: function (bot, msg) {
        var phrases = ['!joke', '!laugh', '!funny'];
        if (msg.author.bot === false) {
            var wordsArr = msg.content.split(' ');
            wordsArr.map(function (word, index) {
                phrases.map(function (phrase) {
                    if (word.toLowerCase() === phrase) {
                        var n = wordsArr[index + 1] || 1;
                        if(n>20){
                            n = 20;
                            msg.channel.send("That's too many.  Here's 20.");
                        }
                        var url = 'https://wizardly-wing-66188a.netlify.com/.netlify/functions/server/many/' + n;
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
                                var obj = JSON.parse(data);
                                obj.forEach(jokeEntry => {
                                    var message = '';
                                    if(jokeEntry.joke && jokeEntry.punchline){
                                        message += jokeEntry.joke + ' || ' + jokeEntry.punchline + '||\n';
                                    } else {
                                        message += jokeEntry.joke + '\n';
                                    }
                                    
                                msg.channel.send(message);
                                });
                            });
                        }).on("error", (err) => {
                            msg.channel.send("Error: `" + err.message + "`");
                        });

                    }
                });
            });
        }
    },
    help: '`!joke` or `!joke 10` Will get a dad joke / pun.'
};
