module.exports = {
  command: function(bot, msg) {
    var acronym = require('acronym');
    var phrases = ['!ac', '!acronym', '!acromyn'];
    var specialEndingLetter = {
      "a": ["Administration"],
      "c": ["Care", "Control", "Charge", "Command", "Conduct"],
      "d": ["Direction"],
      "g": ["Governance", "Government", "Guidance"],
      "h": ["Handling"],
      "m": ["Manipulation"],
      "o": ["Operation", "Oversight"],
      "r": ["Rule"],
      "s": ["Supervision"]
    };
    if (msg.author.bot === false) {
      var wordsArr = msg.content.split(' ');
      wordsArr.map(function(word, index) {
        phrases.map(function(phrase) {
          if (word.toLowerCase() === phrase) {
            var firstWord = wordsArr[index+1].toLowerCase();
            var lastLetter = firstWord.charAt(firstWord.length-1);
            var message = "";
            if(firstWord == "snow"){
              message = "Snow is not an acroynm.  It's a word and it's a product, but it isn't ServiceNow."
            } else {
              var amISpecial = 'acdghmors'.split().indexOf(lastLetter)>=0;
              console.log('amISpecial', amISpecial);
              if(amISpecial) {
                console.log();
                console.log(specialEndingLetter[firstWord.charAt(firstWord.length-1)]);
                var letter = firstWord.charAt(firstWord.length-1);
                var businessWords = specialEndingLetter[letter];
                var businessWord = businessWords[Math.floor(Math.random()*businessWords.length)];
                firstWord = firstWord.substr(0,firstWord.length-1);
                message = acronym(firstWord) + ' ' + businessWord;
              } else {
                message = acronym(firstWord);
              }
            }
            msg.channel.send(message);
          }
        });
      });
    }
  },
  help: '`!acronym` test or `!ac` test'
};
