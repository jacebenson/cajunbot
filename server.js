var fs = require('fs');
var Eris = require('eris');
var bot = new Eris(process.env.DISCORD_BOT_TOKEN);
var responses = {};
var testFolder = './responses/';

fs.readdir(testFolder, function(err, files) {
  files.forEach(function(file) {
  //console.log(file);//
  try {
    responses[file] = require(testFolder + file);
  } catch (e) {
    console.log(e);
  }
  responses['help.js'] = require('./help.js');
  });
});
bot.on("messageCreate", function(msg) {
  for(var response in responses){
    responses[response].command(bot, msg, responses);
  }
});
bot.on('ready', () => { // When the bot is ready
    console.log('CajonBot Ready!'); // Log "Ready!"
});
bot.on("presenceUpdate", function(msg) {
  console.log(msg.guild.name + ': ' + msg.username + ': ' + msg.status);
});
bot.connect(); // Get the bot to connect to Discord

var site = require('./site.js');