module.exports = {
    command: function(bot) {
        var phrase = '!docs';
        bot.on('ready', () => { // When the bot is ready
            console.log(phrase + ' Ready!'); // Log "Ready!"
        });
        bot.on("messageCreate", function(msg) {
          if(msg.author.bot === false){
            var wordsArr = msg.content.split(' ');
            wordsArr.map(function(word, index) {
                if (word.toLowerCase() === phrase) {
                    var term = wordsArr[index + 1];
                    var message = 'https://docs.servicenow.com/search?q=' + encodeURI(wordsArr.join(' ').replace(word, '').trim());
                    bot.createMessage(msg.channel.id, message);
                }
            });
          }
        });
    },
    help: '`!docs string` Searchs the ServiceNow docs for the string provided.'
};