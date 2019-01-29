var phrase = '!ping';
var Eris = require('eris');
var bot = new Eris(process.env.DISCORD_BOT_TOKEN);
bot.on('ready', () => { // When the bot is ready
    console.log(phrase + ' Ready!'); // Log "Ready!"
});
bot.on("messageCreate", function(msg) {
  var wordsArr = msg.content.split(' ');
  wordsArr.map(function(word, index){
    if(word.toLowerCase() === phrase){
      msg.addReaction('💯'); //now geting error unknown emoji
      msg.addReaction('😅');
    }
  });
});

bot.connect(); // Get the bot to connect to Discord
module.exports = '`!bang @person` Supportive text for an overworked employee.';
