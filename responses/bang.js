module.exports = {
    command: function(bot, msg) {
        var phrase = '!bang';
        if (msg.author.bot === false) {
            var wordsArr = msg.content.split(' ');
            wordsArr.map(function(word, index) {
                if (word.toLowerCase() === phrase) {
                    var term = wordsArr[index + 1];
                    var message = 'Hey ' + term + ', you\'ve had a bang-up past couple of months. Hope people start respecting you and your hard work.';
                    bot.reply(message);
                }
            });
        }
    },
    help: '`!bang @person` Supportive text for an overworked employee.'
};