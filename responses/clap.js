module.exports = {
    command: function(bot, msg) {
        var phrase = '!clap';
        if (msg.author.bot === false) {
            var wordsArr = msg.content.split(' ');
            wordsArr.map(function(word, index) {
                if (word.toLowerCase() === phrase) {
                    if(wordsArr.length>2){
                        var upperCaseArr = wordsArr.map(function(upperWord){
                            return upperWord.toUpperCase();
                        });
                        var message = upperCaseArr.join(' :clap: ').replace(word.toUpperCase() + ' :clap: ', '');
                        message = message.replace(phrase, '');
                        msg.channel.send(message);
                    } else {
                        msg.react('👏');
                    }
                }
            });
        }
    },
    help: '`!clap some sentence` Caps lock and clap backs.'
};
