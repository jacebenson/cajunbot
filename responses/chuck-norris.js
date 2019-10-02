module.exports = {
    command: function (bot, msg) {
        var phrase = '!chuck';
        if (msg.author.bot === false) {
            var wordsArr = msg.content.split(' ');
            wordsArr.map(function (word, index) {
                if (word.toLowerCase() === phrase) {
                    var http = require("https");
                    var req = http.request({
                        "method": "GET",
                        "hostname": "api.chucknorris.io",
                        "port": null,
                        "path": "/jokes/random"
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
                            ];
                            var template = chuckNorrisTemplates[Math.floor(Math.random()*chuckNorrisTemplates.length)];
                            var body = Buffer.concat(chuckChunks);
                            var chuckObj = JSON.parse(body.toString());
                            console.log('chuckObj', chuckObj);
                            var path = "/caption_image?";
                            path += "username=" + process.env.imgflipUSER + "&";
                            path += "password=" + process.env.imgflipPASS + "&";
                            path += "template_id=" + template + "&";
                            path += "text1=" +  encodeURIComponent(chuckObj.value);
                            console.log(path);
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
                                    console.log(imgFlipObj);
                                    msg.channel.send(imgFlipObj.data.url);
                                });
                            });
                            imgFlip.write(JSON.stringify({}));
                            imgFlip.end();
                            
                        });
                    });

                    req.end();
                }
            });
        }
    },
    help: '`!chuck` he doesn\'t sleep, he waits....'
};

