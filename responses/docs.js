module.exports = {
    command: function(bot, msg) {
        var phrase = '!docs';
        if (msg.author.bot === false) {
            var wordsArr = msg.content.split(' ');
            wordsArr.map(function(word, index) {
                if (word.toLowerCase() === phrase) {
                    var term = wordsArr[index + 1];
                    var message = 'https://docs.servicenow.com/search?q=' + encodeURI(wordsArr.join(' ').replace(word, '').trim());
                    bot.reply(message);
                }
            });
        }
    },
    help: '`!docs string` Searchs the ServiceNow docs for the string provided.'
};