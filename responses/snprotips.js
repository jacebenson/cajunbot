module.exports = {
    command: function(commandObj) {
        var phrases = ['!snprotips', '!prof', '!tips'];
        if (commandObj.msg.author.bot === false) {
            var wordsArr = commandObj.msg.content.split(' ');
            wordsArr.map(function(word, index) {
                phrases.map(function(phrase) {
                    if (word.toLowerCase() === phrase) {
                        var message = 'https://snprotips.com/search?q=' + encodeURI(wordsArr.join(' ').replace(word, '').trim());
                        commandObj.msg.channel.send(message);
                    }
                });
            });
        }
    },
    help: '`!snprotips or !prof or !tips string` Searchs snprotips blog for the string provided.'
};