var fs = require('fs');
var Eris = require('eris');
var bot = new Eris(process.env.DISCORD_BOT_TOKEN);
var responses = {};
var testFolder = './responses/';
fs.readdir(testFolder, function (err, files) {
    files.forEach(function (file) {
        //console.log(file);//
        try {
            responses[file] = require(testFolder + file);
            responses[file].command(bot);
        } catch (e) {
            console.log(e);
        }
    });
  responses['help.js'] = require('./help.js');
  responses['help.js'].command(bot, responses);
  bot.connect(); // Get the bot to connect to Discord
});
var site =  require('./site.js');
