var ud = require('urban-dictionary')
module.exports = {
    command: function (bot, msg) {
        var phrases = ['!define', '!def'];
        if (msg.author.bot === false) {
            var wordsArr = msg.content.split(' ');
            wordsArr.map(function (word, index) {
                phrases.map(function (phrase) {
                    if (word.toLowerCase() === phrase) {
                        var search = wordsArr.join('').replace(word, '');
                        ud.term(search).then((result) => {
                            var entries = result.entries
                            msg.channel.send(entries[0].definition);    
                          }).catch((error) => {
                            console.error(error.message)
                          })
                    }
                });
            });
        }
    },
    help: '`!define` word'
};

var rand = function (arr) {
    var random_choice = Math.floor(Math.random() * arr.length);
    return arr[random_choice];
}