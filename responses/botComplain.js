module.exports = {
    command: function(bot, msg) {
        var phrase = '!botHelp';
        if (msg.author.bot === false) {
            var wordsArr = msg.content.split(' ');
            wordsArr.map(function(word, index) {
                if (word.toLowerCase() === phrase) {
                    //var message = 'http://lmgtfy.com/?s=d&q=' + encodeURI(wordsArr.join(' ').replace(word, '').trim());
                    var message = 'Test';
                    msg.channel.send(message);
                }
            });
        }
    },
    help: '`React with 🤢 to have cajunbot assist the user'
}