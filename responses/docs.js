var phrase = '!docs';
var Eris = require('eris');
var bot = new Eris(process.env.DISCORD_BOT_TOKEN);
bot.on('ready', function() { // When the bot is ready
    console.log(phrase + ' Ready!'); // Log "Ready!"
});
bot.on("messageCreate", function(msg) {
  var wordsArr = msg.content.split(' ');
  wordsArr.map(function(word, index){
    if(word.toLowerCase() === phrase){
      var term = wordsArr[index + 1];
      var message = 'https://docs.servicenow.com/search?q=' + term
      bot.createMessage(msg.channel.id, message);
    }
  });
});
bot.connect(); // Get the bot to connect to Discord
module.exports = '`!docs string` Searchs the ServiceNow docs for the string provided.';