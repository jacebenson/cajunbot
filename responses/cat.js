module.exports = {
    command: function(bot, msg) {
//console.log('in cat command');
        var phrase = '!cat';
//console.log('msg.author.bot', msg.author.bot);
        if (msg.author.bot === false) {
            var wordsArr = msg.content.split(' ');
//console.log('wordsArr',wordsArr);
            wordsArr.map(function(word, index) {
                if (word.toLowerCase() === phrase) {
                    var http = require("https");

                    var options = {
                      "method": "GET",
                      "hostname": "catfact.ninja",
                      "port": null,
                      "path": "/fact",
                      "headers": {
                        "content-length": "0"
                      }
                    };
                    
                    var req = http.request(options, function (res) {
                      var chunks = [];
                    
                      res.on("data", function (chunk) {
                        chunks.push(chunk);
                      });
                    
                      res.on("end", function () {
                        var body = Buffer.concat(chunks);
                        console.log(body.toString());
                        var responseObj = JSON.parse(body.toString());
                        msg.channel.send(responseObj.fact);
                      });
                    });
                    
                    req.end();
                }
            });
        }
    },
    help: '`!cat` gets a cat fact'
};
