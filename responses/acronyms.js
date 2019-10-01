module.exports = {
  command: function(bot, msg) {
    var acronym = require('acronym');
    var phrases = ['!ac', '!acronym', '!acromyn'];
    var specialEndingLetter = {
      "a": ["Administration","Admin",],
      "b": ["Business"],
      "c": ["Container", "Control", "Command", "Catalog"],
      "d": ["Direction", "Docket"],
      "e": ["Error"],
      "f": ["Field"],
      "g": ["Governance", "Guidance"],
      "h": ["Hook", "Handling", "Harrassement"],
      "i": ["Integration"],
      "j": ["Jurisdiction"],
      "k": ["Kanban", "Keyword"],
      "l": ["Label","Labor"],
      "m": ["Manipulation","Management", "Meetings"],
      "n": ["Newsletter", "Need"],
      "o": ["Operation", "Oversight", "Order"],
      "p": ["Process", "Pattern", "Policy"],
      "q": ["Qualification","Quality",],
      "r": ["Rule","Routine"],
      "s": ["Supervision", "System"],
      "t": ["Technique", "Task","Ticket"],
      "u": ["Undertaking"],
      "v": ["Variable", "Validation", "Visit","Version","Value"],
      "w": ["Website","Work"],
      "x": ["Xenium"],
      "y": ["Yield"],
      "z": ["Zoning"],
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
              var amISpecial = 'acdghmors'.indexOf(lastLetter)>=0;
              if(amISpecial) {
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
