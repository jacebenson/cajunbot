var phrase = '!bang';
var Eris = require('eris');
var bot = new Eris(process.env.DISCORD_BOT_TOKEN);
bot.on('ready', () => { // When the bot is ready
    console.log(phrase + ' Ready!'); // Log "Ready!"
});
bot.on("messageCreate", function(msg) {
  var wordsArr = msg.content.split(' ');
  wordsArr.map(function(word, index){
    if(word.toLowerCase() === phrase){
      var term = wordsArr[index + 1];
      var message = 'Hey ' + term + ', you\'ve had a bang-up past couple of months. Hope people start respecting you and your hard work.';
      bot.createMessage(msg.channel.id, message);
    }
  });
});

bot.connect(); // Get the bot to connect to Discord
module.exports = undefined;