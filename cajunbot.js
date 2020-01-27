require('dotenv').config();
var fs = require('fs');

var Discord = require('discord.js');
var bot = new Discord.Client();
var token = process.env.DISCORD_BOT_TOKEN
bot.login(token);
var site = require('./site');

var responses = {};
var responsesDirectory = './responses/';

fs.readdir(responsesDirectory, function(err, files) {
  files.forEach(function(file) {
  try {
    responses[file] = require(responsesDirectory + file);
  } catch (e) {
//     console.log(e);
  }
  });
});
bot.on("message", function(msg) {
  try{
    var now = new Date().toLocaleString();
    var messageLog = [];
    if(msg.channel.name){
      messageLog = [
        msg.channel.guild.name,
        ' #' + msg.channel.name,
        '[' + msg.channel.id + ']:',
        now,
        msg.author.username + ': ',
        msg.content
      ];
    } else {
      messageLog = [
        'PM#: ',
        now,
        msg.author.username + ': ',
        msg.content
      ];
    }
//     console.log(messageLog.join(' '));
  }catch(error){
//     console.log(error);
  }
  for(var response in responses){
    responses[response].command(bot, msg, responses);
  }
});

bot.on('ready', () => { // When the bot is ready
//     console.log('CajonBot Ready!'); // Log "Ready!"
    //require('./integrations/timetable').start(bot).command();//disabled after token was revoked
});
//bot.on("presenceUpdate", function(msg) {
  //console.log(msg.guild.name + ': ' + msg.username + ': ' + msg.status);
//});
//bot.connect(); // Get the bot to connect to Discord

process.on('unhandledRejection', console.error);

