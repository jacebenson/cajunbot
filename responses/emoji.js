module.exports = {
    command: function(commandObj) {
        var phrase = '!emoji';
        if (commandObj.msg.author.bot === false) {
            var translate = require('moji-translate');
            var wordsArr = commandObj.msg.content.split(' ');
            wordsArr.map(function(word, index) {
                if (word.toLowerCase() === phrase) { //this.phrase){
                    var term = wordsArr[index + 1];
                    var message = translate.translate(wordsArr.join(' ').replace(word, '').trim());
                    commandObj.msg.channel.send(message);
                }
            });
        }
    },
    help: '`!emoji string` makes the sentence fun and hard to read with emojis'
}