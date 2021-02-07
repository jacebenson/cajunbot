module.exports = {
    command: function(commandObj) {
        var phrase = '!docs';
        if (commandObj.msg.author.bot === false) {
            var wordsArr = commandObj.msg.content.split(' ');
            wordsArr.map(function(word, index) {
                if (word.toLowerCase() === phrase) {
                    var term = wordsArr[index + 1];
                    var message = 'https://docs.servicenow.com/search?q=' + encodeURI(wordsArr.join(' ').replace(word, '').trim());
                    commandObj.msg.channel.send(message);
                }
            });
        }
    },
    help: '`!docs string` Searchs the ServiceNow docs for the string provided.'
};