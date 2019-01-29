module.exports = {
    command: function(bot, responses) {
        var phrase = '!help';
        bot.on('ready', () => { // When the bot is ready
            console.log(phrase + ' Ready!'); // Log "Ready!"
        });
        bot.on("messageCreate", function(msg) {
            var wordsArr = msg.content.split(' ');
            wordsArr.map(function(word, index) {
                if (word.toLowerCase() === phrase) {
                  var message = ['This is the help'];
                  for(var thing in responses){
                    message.push(responses[thing].help);
                  }
                    bot.createMessage(msg.channel.id, message.join('\n'));
                }
            });
        });
    },
    help: '`!help lists all commands'
};