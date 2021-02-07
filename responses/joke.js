var https = require('https');
var URL = require('url').URL;
module.exports = {
    _command: function(commandObj){
        console.log('in global joke fx');
        var url = 'https://joke.jace.pro/.netlify/functions/server/many/1';
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
                console.log(`data: ${data}`)
                //console.log(JSON.parse(data).explanation);
                var obj = JSON.parse(data);
                obj.forEach(jokeEntry => {
                    var message = '';
                    if(jokeEntry.joke && jokeEntry.punchline){
                        message += jokeEntry.joke + ' || ' + jokeEntry.punchline + '||\n';
                    } else {
                        message += jokeEntry.joke + '\n';
                    }
                commandObj.msg.channel.send(message);
                });
            });
        }).on("error", (err) => {
            commandObj.msg.channel.send("Error: `" + err.message + "`");
        });
    },
    command: function (commandObj) {
        var phrases = ['!joke', '!laugh', '!funny'];
        if (commandObj.msg.author.bot === false) {
            var wordsArr = commandObj.msg.content.split(' ');
            wordsArr.map(function (word, index) {
                phrases.map(function (phrase) {
                    if (word.toLowerCase() === phrase) {
                        console.log('in joke.js');
                        module.exports._command(commandObj);
                    }
                });
            });
        }
    },
    help: '`!joke` or `!joke 10` Will get a dad joke / pun.'
};
