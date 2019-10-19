var Chance = require('chance');
// Instantiate Chance so it can be used
var chance = new Chance();
module.exports = {
    _command: function(msg){
        var http = require("https");
        var category = chance.pickone( 
        [
            "animal",
            "career",
            "celebrity",
            "dev",
            //"explicit",
            "fashion",
            "food",
            "history",
            "money",
            "movie",
            "music",
            //"political",
            //"religion",
            "science",
            "sport",
            "travel"
        ]);
        var req = http.request({
            "method": "GET",
            "hostname": "api.chucknorris.io",
            "port": null,
            "path": "/jokes/random?category=" + category
        }, function (chuckRes) {
            var chuckChunks = [];
            chuckRes.on("data", function (chunk) {
                chuckChunks.push(chunk);
            });
            chuckRes.on("end", function () {
                var chuckNorrisTemplates = [
                    '38579871',//Chuck-Norris-Guns
                    '16321730',//Chuck-Norris-Finger
                    '3411280',//Chuck-Norris-Flex
                    '126120154',//Chuck-Norris-Jean-Claude-VanDamme
                    '241304',//Chuck-Norris-Approves
                    '16483127',//Chuck-Norris-Hat-Tip
                    '40373861',//Chuck-Norris-Plane-Splits
                ];
                var template = chuckNorrisTemplates[Math.floor(Math.random()*chuckNorrisTemplates.length)];
                var body = Buffer.concat(chuckChunks);
                var chuckObj = JSON.parse(body.toString());
                var path = "/caption_image?";
                path += "username=" + process.env.imgflipUSER + "&";
                path += "password=" + process.env.imgflipPASS + "&";
                path += "template_id=" + template + "&";
                path += "text1=" +  encodeURIComponent(chuckObj.value);
                var imgFlip = http.request({
                    "method": "POST",
                    "hostname": "api.imgflip.com",
                    "port": null,
                    "path": path, 
                    "headers": {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }, function (imgFlipRes) {
                    var imgChunks = [];
                    imgFlipRes.on("data", function (chunk) {
                        imgChunks.push(chunk);
                    });
                    imgFlipRes.on("end", function () {
                        var imgFlipBody = Buffer.concat(imgChunks);
                        var imgFlipObj = JSON.parse(imgFlipBody.toString());
                        msg.channel.send(imgFlipObj.data.url);
                    });
                });
                imgFlip.write(JSON.stringify({}));
                imgFlip.end();
                
            });
        });

        req.end();
    },
    command: function (bot, msg) {
        var phrase = '!chuck';
        if (msg.author.bot === false) {
            var wordsArr = msg.content.split(' ');
            wordsArr.map(function (word) {
                if (word.toLowerCase() === phrase) {
                    module.exports._command(msg);
                }
            });
        }
    },
    help: '`!chuck` he doesn\'t sleep, he waits....'
};

