module.exports = {
    command: function(commandObj) {
        var phrase = '!clap';
        if (commandObj.msg.author.bot === false) {
            var wordsArr = commandObj.msg.content.split(' ');
            wordsArr.map(function(word, index) {
                if (word.toLowerCase() === phrase) {
                    if(wordsArr.length>2){
                        var upperCaseArr = wordsArr.map(function(upperWord){
                            return upperWord.toUpperCase();
                        });
                        var message = upperCaseArr.join(' :clap: ').replace(word.toUpperCase() + ' :clap: ', '');
                        message = message.replace(phrase, '');
                        commandObj.msg.channel.send(message);
                    } else {
                        commandObj.msg.react('👏');
                    }
                }
            });
        }
    },
    help: '`!clap some sentence` Caps lock and clap backs.'
};
