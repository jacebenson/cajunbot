require('dotenv').config();
var fs = require('fs');

var Discord = require('discord.js');
var bot = new Discord.Client();
var token = process.env.DISCORD_BOT_TOKEN
bot.login(token);
var site = require('./site');


var responses = {};
var reactions = {};

var responsesDirectory = './responses/';
var reactionDirectory = "./reactions/";

fs.readdir(responsesDirectory, function (err, files) {
  files.forEach(function (file) {
    try {
      responses[file] = require(responsesDirectory + file);
    } catch (e) {
      //     console.log(e);
    }
  });
});

fs.readdir(reactionDirectory, function (err, files) {
  files.forEach(function (file) {
    try {
      reactions[file] = require(reactionDirectory + file);
    } catch (e) {
      //     console.log(e);
    }
  });
});

bot.on("message", function (msg) {
  try {
    var now = new Date().toLocaleString();
    var messageLog = [];
    if (msg.channel.name) {
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
  } catch (error) {
    //     console.log(error);
  }
  for (var response in responses) {
    responses[response].command(bot, msg, responses);
  }
});

bot.on('ready', () => { // When the bot is ready
  //     console.log('CajonBot Ready!'); // Log "Ready!"
  //require('./integrations/timetable').start(bot).command();//disabled after token was revoked
  require('./integrations/errorkb').start(bot, true, true); //disabled after token was revoked
});
//bot.on("presenceUpdate", function(msg) {
//console.log(msg.guild.name + ': ' + msg.username + ': ' + msg.status);
//});
//bot.connect(); // Get the bot to connect to Discord

client.on("messageReactionAdd", async (reaction, user) => {
  // When we receive a reaction we check if the reaction is partial or not
  if (reaction.partial) {
    // If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
    try {
      await reaction.fetch();
    } catch (error) {
      console.error("Something went wrong when fetching the message: ", error);
      // Return as `reaction.message.author` may be undefined/null
      return;
    }
    for (var reactionE in reactions) {
      reactions[reactionE].react(reaction);
    }
  }


  // Now the message has been cached and is fully available
  // The reaction is now also fully available and the properties will be reflected accurately:
  //console.log(`${reaction.count} user(s) have given the same reaction to this message!`);
});

process.on('unhandledRejection', console.error);