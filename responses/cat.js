module.exports = {
    command: function(bot, msg) {
        var phrase = '!cat';
        if (msg.author.bot === false) {
            var wordsArr = msg.content.split(' ');
            wordsArr.map(function(word, index) {
                if (word.toLowerCase() === phrase) {
                    var url = 'https://catfact.ninja/fact';
                    var https = require('https');
                    var URL = require('url').URL;
                    //var myURL = new URL('http://www.example.com/foo?bar=1#main');
                    var url = new URL(url);
                    var options = {
                        timeout: 3000,
                        host: url.host,
                        path: url.pathname,
                        headers: {
                            "Accept": "application/json"
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
                            if(resp.statusCode === 200){
                                message = resp.fact;
                            }
                            msg.channel.send(message);
                        });
                    }).on("error", (err) => {
                        msg.channel.send("Error: `" + err.message + "`");
                    });
                }
            });
        }
    },
    help: '`!cat` gets a cat fact'
};
