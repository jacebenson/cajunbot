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
                            console.log(entries[0].word)
                            console.log(entries[0].definition)
                            bot.createMessage(msg.channel.id, entries[0].definition);    
                            console.log(entries[0].example)
                          }).catch((error) => {
                            console.error(error.message)
                          })
                    }
                });
            });
        }
    },
    help: '`!joke` Will get a joke from one of two apis.'
};

var rand = function (arr) {
    //console.log('in random.');
    var random_choice = Math.floor(Math.random() * arr.length);
    return arr[random_choice];
}