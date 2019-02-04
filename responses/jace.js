module.exports = {
    command: function(bot, msg) {
        var phrase = '!jace';
        if (msg.author.bot === false) {
            var wordsArr = msg.content.split(' ');
            wordsArr.map(function(word, index) {
                if (word.toLowerCase() === phrase) {
                    var term = wordsArr[index + 1];
                    var message = 'https://blog.jacebenson.com/' + encodeURI(wordsArr.join(' ').replace(word, '').trim());
                    bot.createMessage(msg.channel.id, message);
                }
            });
        }
    },
    help: '`!jace string` Searchs jaces blog for the string provided.'
};