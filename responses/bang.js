module.exports = {
    command: function(bot) {
        var phrase = '!bang';
        bot.on('ready', () => { // When the bot is ready
            console.log(phrase + ' Ready!'); // Log "Ready!"
        });
        bot.on("messageCreate", function(msg) {
          if(msg.author.bot === false){
            var wordsArr = msg.content.split(' ');
            wordsArr.map(function(word, index) {
                if (word.toLowerCase() === phrase) {
                    var term = wordsArr[index + 1];
                    var message = 'Hey ' + term + ', you\'ve had a bang-up past couple of months. Hope people start respecting you and your hard work.';
                    bot.createMessage(msg.channel.id, message);
                }
            });
          }
        });
    },
    help: '`!bang @person` Supportive text for an overworked employee.'
};