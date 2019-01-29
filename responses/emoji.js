var phrase = '!emoji';
var Eris = require('eris');
var bot = new Eris(process.env.DISCORD_BOT_TOKEN);
bot.on('ready', function() { // When the bot is ready
    console.log(phrase + ' Ready!'); // Log "Ready!"
});
var translate = require('moji-translate');

bot.on("messageCreate", function(msg) {
  var wordsArr = msg.content.split(' ');
  wordsArr.map(function(word, index){
    if(word.toLowerCase() === phrase){
      var term = wordsArr[index + 1];
      var message = translate.translate(wordsArr.join(' ').replace(word, '').trim());
      bot.createMessage(msg.channel.id, message);
    }
  });
});
bot.connect(); // Get the bot to connect to Discord
module.exports = '`!emoji string` makes the sentence fun and hard to read with emojis';