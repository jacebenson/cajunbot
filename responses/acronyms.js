module.exports = {
    command: function(bot, msg) {
        var acronym = require('acronym');
        var phrases = ['!ac', '!acroymn'];
        if (msg.author.bot === false) {
            var wordsArr = msg.content.split(' ');
            wordsArr.map(function(word, index) {
                phrases.map(function(phrase) {
                    if (word.toLowerCase() === phrase) {
                        var message = acronym(wordsArr[index + 1]);
                        msg.channel.send(message);
                    }
                });
            });
        }
    },
    help: '`!ac` test'
};