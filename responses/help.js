module.exports = {
    command: function(bot, msg, responses) {
        var phrase = '!help';
        var wordsArr = msg.content.split(' ');
        wordsArr.map(function(word, index) {
            if (word.toLowerCase() === phrase) {
                var message = [
                  'This is the help',
                  'Contribute here: https://github.com/jacebenson/cajonbot',
                  'View leaderboard here: https://discord-cajon-bot.glitch.me/'
                ];
                for (var thing in responses) {
                    message.push(responses[thing].help);
                }
                bot.createMessage(msg.channel.id, message.join('\n'));
            }
        });
    },
    help: '`!help` lists all commands'
};