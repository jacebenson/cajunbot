module.exports = {
    command: function(bot, msg) {
        var phrase = '!ping';
        if (msg.author.bot === false) {
            var wordsArr = msg.content.split(' ');
            wordsArr.map(function(word, index) {
                if (word.toLowerCase() === phrase) {
                    var https = require('https');
                    var url = msg.content.replace(phrase, '').trim();
                    var port = 80;
                    if(url.indexOf('http')==-1){
                        url = 'https://' + url;
                        port = 443;
                    }
                    console.log('going to: ' + url);
                    var options = {
                        host: url, // server uses this
                        //port: port, // server uses this
                        method: 'GET', // client uses this
                        path: '/', // client uses this
                    };
                    https.request(options, function(resp) {
                        var data = '';
                        resp.on('data', function(chunk) {
                            data += chunk;
                        });
                        // The whole response has been received. Print out the result.
                        resp.on('end', function() {
                            //console.log(JSON.parse(data).explanation);
                            var message = "`" + url + "` has a status of " + resp.statusCode;
                            if(resp.statusCode === 200){
                                message = "`" + url + "` is up with a status of " + resp.statusCode;
                            }
                            bot.createMessage(msg.channel.id, message);
                        });
                    }).on("error", function(err) {
                        if(err.code==="ECONNRESET"){
                            bot.createMessage(msg.channel.id, "No Response from " + url +".");
                        }
                        console.log("Error: " + err.message);
                    });
                }
            });
        }
    },
    help: '`!ping` twitter.com'
};
