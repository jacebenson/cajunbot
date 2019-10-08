module.exports = {
    _command: function(msg){
        var http = require("https");

        var options = {
            "method": "GET",
            "hostname": "ron-swanson-quotes.herokuapp.com",
            "port": null,
            "path": "/v2/quotes"
        };

        var req = http.request(options, function (res) {
            var ronChunks = [];

            res.on("data", function (chunk) {
                ronChunks.push(chunk);
            });

            res.on("end", function () {
                var ronSwansonTemplates = [
                    '358280',//Ron-Swanson
                    '11906590',//Being served food
                    '117119699',//BBQ
                    '71724294',//Flag
                    '11906883',//Furrowed Brow
                    '122336292',//At fireplace
                    '43357204',//Happy
                ];
                var template = ronSwansonTemplates[Math.floor(Math.random()*ronSwansonTemplates.length)];
                var body = Buffer.concat(ronChunks);
                var ronObj = JSON.parse(body.toString())[0];
                var path = "/caption_image?";
                path += "username=" + process.env.imgflipUSER + "&";
                path += "password=" + process.env.imgflipPASS + "&";
                path += "template_id=" + template + "&";
                path += "text1=" +  encodeURIComponent(ronObj);
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
        var phrase = '!ron';
        if (msg.author.bot === false) {
            var wordsArr = msg.content.split(' ');
            wordsArr.map(function (word, index) {
                if (word.toLowerCase() === phrase) {
                    module.exports._command(msg);
                }
            });
        }
    },
    help: '`!ron` gets a Ron Swanson pick me up'
};
