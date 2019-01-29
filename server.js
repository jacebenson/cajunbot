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
        } catch (e) {
            console.log(e);
        }
    });
  bot.on("messageCreate", function(msg) {
    var wordsArr = msg.content.split(' ');
    wordsArr.map(function(word, index){
      //console.log('in wordsArr' + word);
      if(word.toLowerCase() === phrase){
        var message = ['Below are the descriptions of how to use this bot.'];
        for (var helpLine in responses){
          message.push(responses[helpLine]);
        }
      /*var message = [
        '`!bang @person` Supportive text for an overworked employee.',
        '`!clap some sentence` Caps lock and clap backs.',
        //'`Say 30F or 30C` and it will convert the temperature to the other unit',
        '`!docs string` Searchs the ServiceNow docs for the string provided.',
        '`!flip string` Or !invert, flips the string upside down.',
        //'`!giphy string` Regular old giphy search but works in threads.',
        //'`!google string` Provides a link to a google search for the provided string.',
        '`!insult` *Deactivated and moved to SlackBot instead*. Says an SN-related insult.',
        //'`!iss` Let\'s you know where the International Space Station is right now.',
        '`!job` Creates a random LinkedIn message that an SN Dev is likely to receive from a recruiter.',
        '`!lmgtfy string` A more sassy version of !google.',
        //'`!madlib` Provides instructions on how to create a SN-related madlib.',
        //'`!parrot wave` Adds excitement to your message.',
        //'`!report string` Reports on how often the provided string has appeared in the last 7 days on this workspace.',
        //'`!roll 3d6` Rolls three six-sided dice (or any other combination you give).',
        //'`!tips` A summary of tips from the SN Devs pro-tips website',
        //'`!test` Creates a randomly generated SN-related testing script.',
        //'`!trout @person` or `!slap @person` IRC-like slap to whoever you @.',
        //'`!youtube string` Links the first found video on youtube according to your search string',
        //'`!zalgo string` or !curse will eff yo text up',
        //'`!earl` Let\'s you know more about the creator of this bot.',
        //'`!help` ¯\\_(ツ)_/¯'
      ];*/
      message = message.join('\n');
   bot.createMessage(msg.channel.id, message);
      }
    });
  });

  bot.connect(); // Get the bot to connect to Discord
});//
