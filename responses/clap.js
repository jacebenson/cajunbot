module.exports = {
    command: function(bot,msg) {
        var phrase = '!clap';
          if(msg.author.bot === false){
            var wordsArr = msg.content.split(' ');
            wordsArr.map(function(word, index) {
                if (word.toLowerCase() === phrase) {
                    //var term = wordsArr[index + 1];
                    var message = wordsArr.join(' :clap: ').replace(word + ' :clap: ', '');
                    message = message.replace(phrase,'');
                    bot.createMessage(msg.channel.id, message);
                }
            });
          }
    },
    help: '`!clap some sentence` Caps lock and clap backs.'
};