module.exports = {
    command: function(bot) {
        var phrase = '!clap';
        bot.on('ready', () => { // When the bot is ready
            console.log(phrase + ' Ready!'); // Log "Ready!"
        });
        bot.on("messageCreate", function(msg) {
            var wordsArr = msg.content.split(' ');
            wordsArr.map(function(word, index) {
                if (word.toLowerCase() === phrase) {
                    //var term = wordsArr[index + 1];
                    var message = wordsArr.join(' :clap: ').replace(word + ' :clap: ', '');
                    bot.createMessage(msg.channel.id, message);
                }
            });
        });
    },
    help: '`!clap some sentence` Caps lock and clap backs.'
};