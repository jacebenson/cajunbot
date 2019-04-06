module.exports = {
    command: function(bot, msg) {
        var phrase = '!emoji';
        if (msg.author.bot === false) {
            var translate = require('moji-translate');
            var wordsArr = msg.content.split(' ');
            wordsArr.map(function(word, index) {
                if (word.toLowerCase() === '!emoji') { //this.phrase){
                    var term = wordsArr[index + 1];
                    var message = translate.translate(wordsArr.join(' ').replace(word, '').trim());
                    msg.channel.send(message);
                }
            });
        }
    },
    help: '`!emoji string` makes the sentence fun and hard to read with emojis'
}