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
                            if(entries.length>0){
                            //console.log(entries[0].word)
                            //console.log(winner[0].definition)
                            bot.createMessage(msg.channel.id, entries[0].definition);    
                            //console.log(entries[0].example)
                            } else {
                                bot.createMessage(msg.channel.id, "Define it: " + 'https://www.urbandictionary.com/add.php?word=' + search);
                            }
                          }).catch((error) => {
                            console.error(error.message)
                          });
                    }
                });
            });
        }
    },
    help: '`!define` word'
};

var rand = function (arr) {
    //console.log('in random.');
    var random_choice = Math.floor(Math.random() * arr.length);
    return arr[random_choice];
}