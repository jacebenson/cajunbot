module.exports = {
  command: function(bot){
    var phrase = '!emoji';
    bot.on('ready', () => { // When the bot is ready
      console.log(phrase + ' Ready!'); // Log "Ready!"
    });
    bot.on("messageCreate", function(msg) {
      var translate = require('moji-translate');
      var wordsArr = msg.content.split(' ');
      wordsArr.map(function(word, index){
        if(word.toLowerCase() === '!emoji'){//this.phrase){
          var term = wordsArr[index + 1];
          var message = translate.translate(wordsArr.join(' ').replace(word, '').trim());
          bot.createMessage(msg.channel.id, message);
        }
      });
    });
  },
  help: '`!emoji string` makes the sentence fun and hard to read with emojis'
}