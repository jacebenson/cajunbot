module.exports = {
    _command: function (msg, term) {
        var http = require("https");

        var options = {
            "method": "POST",
            "hostname": "relevant-xkcd-backend.herokuapp.com",
            "port": null,
            "path": "/search",
            "headers": {
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        };

        var req = http.request(options, function (res) {
            var chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function () {
                var message;
                var body = Buffer.concat(chunks);
                var xkcdObj = JSON.parse(body.toString());
                if(xkcdObj.results.length>0){
                    var xkcdObjResult = xkcdObj.results[0];
                    message = xkcdObjResult.image;
                } else {
                    message = 'https://imgs.xkcd.com/comics/not_available.png';
                }
                msg.channel.send(message);
            });
        });

        req.write("search=" + term);
        req.end();
    },
    command: function (bot, msg) {
        var phrases = ['!xkcd', '!xd', '!xckd'];
        if (msg.author.bot === false) {
            var wordsArr = msg.content.split(' ');
            wordsArr.map(function (word, index) {
                phrases.map(function (phrase) {
                    if (word.toLowerCase() === phrase) {
                        console.log('in xkcd.js');
                        var n = wordsArr[index + 1] || 1;
                        module.exports._command(msg, n);
                    }
                });
            });
        }
    },
    help: '`!xkcd` gets relevant xkcd comic'
};
