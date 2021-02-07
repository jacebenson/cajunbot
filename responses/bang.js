module.exports = {
  command: function (commandObj) {
    var phrase = '!bang';
    if (commandObj.msg.author.bot === false) {
      var wordsArr = commandObj.msg.content.split(' ');
      wordsArr.map(function (word, index) {
        if (word.toLowerCase() === phrase) {
          var term = wordsArr[index + 1];
          var message = 'Hey ' + term + ', you\'ve had a bang-up past couple of months. Hope people start respecting you and your hard work.';
          commandObj.msg.channel.send(message);
        }
      });
    }
  },
  help: '`!bang @person` Supportive text for an overworked employee.'
};