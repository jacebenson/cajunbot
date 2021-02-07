module.exports = {
  command: function (commandObj) {
    var phrase = '!help';
    var wordsArr = commandObj.msg.content.split(' ');
    wordsArr.map(function (word) {
      if (word.toLowerCase() === phrase) {
        var message = [
          'This is the help',
          'View leaderboard here: http://cajunbot.jace.pro/',
          'Contribute here: `https://github.com/jacebenson/cajonbot`'
        ];
        for (var thing in commandObj.responses) {
          message.push(commandObj.responses[thing].help);
        }
        for (var thing in commandObj.reactions) {
          message.push(commandObj.reactions[thing].help);
        }
        commandObj.msg.channel.send(message.join('\n'));
      }
    });
  },
  help: '`!help` lists all commands'
};
