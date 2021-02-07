module.exports = {
    command: function(commandObj) {
        var phrase = '!lmgtfy';
        if (commandObj.msg.author.bot === false) {
            var wordsArr = commandObj.msg.content.split(' ');
            wordsArr.map(function(word, index) {
                if (word.toLowerCase() === phrase) {
                    var message = 'https://lmddgtfy.net/?q=' + encodeURI(wordsArr.join(' ').replace(word, '').trim());
                    commandObj.msg.channel.send(message);
                }
            });
        }
    },
    help: '`!lmgtfy string` let me google that for you.'
};