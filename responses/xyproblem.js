module.exports = {
  command: function (commandObj) {
    var phrase = '!xy';
    if (commandObj.msg.author.bot === false) {
      var wordsArr = commandObj.msg.content.split(' ');
      wordsArr.map(function (word, index) {
        if (word.toLowerCase() === phrase) {
          var message = 'https://xyproblem.info/';
          commandObj.msg.channel.send(message);
        }
      });
    }
  },
  help: '`!xy` What are they trying to solve?'
};