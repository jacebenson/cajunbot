module.exports = {
    command: function(bot, msg) {
        var acronym = require('acronym');
        var phrases = ['!ac', '!acronym', '!acromyn'];
        if (msg.author.bot === false) {
            var wordsArr = msg.content.split(' ');
            wordsArr.map(function(word, index) {
                phrases.map(function(phrase) {
                    if (word.toLowerCase() === phrase) {
                        var ac = wordsArr.toString.replace(phrase,'');
                        var message = acronym(ac);
                        msg.channel.send(message);
                    }
                });
            });
        }
    },
    help: '`!acronym` test or `!ac` test'
};
