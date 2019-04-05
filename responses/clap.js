module.exports = {
    command: function(bot, msg) {
        var phrase = '!clap';
        if (msg.author.bot === false) {
            var wordsArr = msg.content.split(' ');
            wordsArr.map(function(word, index) {
                if (word.toLowerCase() === phrase) {
                    if(wordsArr.length>2){
                        var message = wordsArr.join(' :clap: ').replace(word.toUpperCase() + ' :clap: ', '');
                        message = message.replace(phrase, '');
                        bot.createMessage(msg.channel.id, message);
                    } else {
                        msg.addReaction('👏');
                    }
                }
            });
        }
    },
    help: '`!clap some sentence` Caps lock and clap backs.'
};
