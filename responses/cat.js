module.exports = {
  command: function (commandObj) {
    var phrase = '!cat';
    if (commandObj.msg.author.bot === false) {
      var wordsArr = commandObj.msg.content.split(' ');
      wordsArr.map(function (word, index) {
        if (word.toLowerCase() === phrase) {
          var http = require("https");
          var req = http.request({
            "method": "GET",
            "hostname": "catfact.ninja",
            "port": null,
            "path": "/fact",
            "headers": {
              "content-length": "0"
            }
          }, function (res) {
            var chunks = [];

            res.on("data", function (chunk) {
              chunks.push(chunk);
            });

            res.on("end", function () {
              var body = Buffer.concat(chunks);
              var responseObj = JSON.parse(body.toString());
              commandObj.msg.channel.send(responseObj.fact);
            });
          });

          req.end();
        }
      });
    }
  },
  help: '`!cat` gets a cat fact'
};
