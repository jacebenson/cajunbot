module.exports = {
    command: function (bot, msg) {
        //console.log('in ron command');
        var phrase = '!ron';
        //console.log('msg.author.bot', msg.author.bot);
        if (msg.author.bot === false) {
            var wordsArr = msg.content.split(' ');
            //console.log('wordsArr',wordsArr);
            wordsArr.map(function (word, index) {
                if (word.toLowerCase() === phrase) {
                    var http = require("https");

                    var options = {
                        "method": "GET",
                        "hostname": "ron-swanson-quotes.herokuapp.com",
                        "port": null,
                        "path": "/v2/quotes"
                    };

                    var req = http.request(options, function (res) {
                        var chunks = [];

                        res.on("data", function (chunk) {
                            chunks.push(chunk);
                        });

                        res.on("end", function () {
                            var body = Buffer.concat(chunks);
                            //console.log(body.toString());
                            var responseObj = JSON.parse(body.toString());
                            msg.channel.send(responseObj[0]);
                        });
                    });

                    req.end();
                }
            });
        }
    },
    help: '`!ron` gets a Ron Swanson pick me up'
};
