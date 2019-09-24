var acroynm = require('acronym');
module.exports = {
    command: function(bot, msg) {
        var phrases = ['!acronym', '!ac'];
        if (msg.author.bot === false) {
            var wordsArr = msg.content.split(' ');
            wordsArr.map(function(word, index) {
                phrases.map(function(phrase) {
                    if (word.toLowerCase() === phrase) {
                        var search = wordsArr.join('').replace(word, '');
                        msg.channel.send(acroynm(search));
                        console.log(entries[0].example)
                    }
                });
            });
        }
    },
    help: '`!acroynm` letters'
};