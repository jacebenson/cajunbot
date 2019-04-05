require('dotenv').config();
var fs = require('fs');
var Eris = require('eris');
require('greenlock-express').create({
  email: 'jace.benson@protonmail.com'     // The email address of the ACME user / hosting provider
, agreeTos: true                    // You must accept the ToS as the host which handles the certs
, configDir: '~/.config/acme/'      // Writable directory where certs will be saved
, communityMember: true             // Join the community to get notified of important updates
, telemetry: true                   // Contribute telemetry data to the project

  // Using your express app:
  // simply export it as-is, then include it here
, app: require('./site.js')

//, debug: true
}).listen(80, 443);

//require('./site.js')
//require('./integrations/sndevs.slack').connect();//disabled after token was revoked
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
  });
});
bot.on("messageCreate", function(msg) {
  try{
    var now = new Date().toLocaleString();
    if(msg.channel.name){
      console.log(msg.channel.guild.name + ' #' + msg.channel.name + '['+msg.channel.id+']: ' + now + ' ' msg.author.username + ': ' + msg.content);
    } else {
      console.log(msg.channel.guild.name + ' PM#: ' + now + ' ' + msg.author.username + ': ' + msg.content);
    }
  }catch(error){
    console.log(error);
  }
  for(var response in responses){
    responses[response].command(bot, msg, responses);
  }
});
bot.on('ready', () => { // When the bot is ready
    console.log('CajonBot Ready!'); // Log "Ready!"
});
bot.on("presenceUpdate", function(msg) {
  //console.log(msg.guild.name + ': ' + msg.username + ': ' + msg.status);
});
bot.connect(); // Get the bot to connect to Discord

process.on('unhandledRejection', console.error);

