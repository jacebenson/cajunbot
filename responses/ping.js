module.exports = {
    command: function(commandObj) {
        var phrase = '!ping';
        if (commandObj.msg.author.bot === false) {
            var wordsArr = commandObj.msg.content.split(' ');
            wordsArr.map(function(word, index) {
                if (word.toLowerCase() === phrase) {
                    var url = commandObj.msg.content.replace(phrase, '').trim();
                    var https;
                    if(url.indexOf('http')>=0){
                        https = require('https');
                    } else if(url.indexOf('http')>=0){
                        https = require('http');        
                    } else {
                        https = require('https');
                        url = `https://${url}`;
                    }
                    var URL = require('url').URL;
                    var url = new URL(url);
                    var options = {
                        timeout: 3000,
                        host: url.host,
                        path: url.pathname
                    }
                    https.get(options, (resp) => {
                        var data = '';
                        resp.on('data', (chunk) => {
                            data += chunk;
                        });
                        // The whole response has been received. Print out the result.
                        resp.on('end', () => {
                            var message = `${url} has a status of ${resp.statusCode}`;
                            if(resp.statusCode === 200){
                                message = `${url} is ⬆⬆⬆⬆`;
                            }
                            
                            commandObj.msg.channel.send(message);
                        });
                    }).on("error", (err) => {
                        commandObj.msg.channel.send(`Error: \`${err.message}\``);
                    });
                }
            });
        }
    },
    help: '`!ping` `google.com`'
};
