var express = require("express")
var keepalive = require('express-glitch-keepalive');
var app = express();
var fs = require('fs');
app.use(keepalive);
app.get('/', (req, res) => {
    res.json('Ok');
});
var phrase = '!help';
var Eris = require('eris');
var bot = new Eris(process.env.DISCORD_BOT_TOKEN);
bot.on('ready', () => { // When the bot is ready
    console.log(phrase + ' Ready!'); // Log "Ready!"
});
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
});//
