module.exports = {
    command: function(bot) {
        var phrase = '!ping';
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
    },
    help: '`!ping test'
};
