require('dotenv').config()
var fs = require('fs');
//jace was here 02.05.2021
var Discord = require('discord.js');
var client = new Discord.Client();
var token = process.env.DISCORD_BOT_TOKEN
client.login(token);
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

client.on("message", function (msg) {
  for (var response in responses) {
    responses[response].command({client, msg, responses, reactions});
  }
});

client.on('ready', () => { // When the bot is ready
  console.log('CajonBot Ready!'); // Log "Ready!"
  //require('./integrations/timetable').start(bot).command();//disabled after token was revoked
  require('./integrations/errorkb').start(client, true, true); //disabled after token was revoked
});

client.on("messageReactionAdd", async (reaction, user) => {
  console.log(reaction);
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
  }
  for (var reactionE in reactions) {
    reactions[reactionE].react(reaction);
  }
});

process.on('unhandledRejection', console.error);