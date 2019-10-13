require('dotenv').config();
var fs = require('fs');
//var Eris = require('eris');
//var bot = new Eris(process.env.DISCORD_BOT_TOKEN);
var Discord = require('discord.js');
var bot = new Discord.Client();
var token = process.env.DISCORD_BOT_TOKEN
bot.login(token);
require('greenlock-express').create({
  email: 'jace.benson@protonmail.com',     // The email address of the ACME user / hosting provider
  agreeTos: true,                          // You must accept the ToS as the host which handles the certs
  configDir: '~/.config/acme/',            // Writable directory where certs will be saved
  communityMember: true,                   // Join the community to get notified of important updates
  telemetry: true,                         // Contribute telemetry data to the project
  app: require('./site.js')                // Include sites you want to run here
  //, debug: true
}).listen(80, 443);

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

