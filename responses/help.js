module.exports = {
    command: function(bot, msg, responses) {
        var phrase = '!help';
        var wordsArr = msg.content.split(' ');
        wordsArr.map(function(word, index) {
            if (word.toLowerCase() === phrase) {
                var message = [
                  'This is the help',
                  'View leaderboard here: http://cajunbot.jace.pro/',
                  'Contribute here: `https://github.com/jacebenson/cajonbot`'
                ];
                for (var thing in responses) {
                    message.push(responses[thing].help);
                }
                msg.channel.send(message.join('\n'));
            }
        });
    },
    help: '`!help` lists all commands'
};
