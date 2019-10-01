module.exports = {
    command: function(bot, msg) {
        var acronym = require('acronym');
        var phrases = ['!ac', '!acronym', '!acromyn'];
        if (msg.author.bot === false) {
            var wordsArr = msg.content.split(' ');
            wordsArr.map(function(word, index) {
                phrases.map(function(phrase) {
                    if (word.toLowerCase() === phrase) {
                        var firstWord = wordsArr[index+1];
                        var message = "";
                        if(firstWord == "snow"){
                            message = "Snow is not an acroynm.  It's a word and it's a product, but it isn't ServiceNow."
                        }
                        if(firstWord.endsWith("m")){
                           firstWord = firstWord.substr(0,firstWord.length-1);
                           message = acronym(firstWord) + " management";
                        } else {
                            message = acronym(wordsArr[index+1]);        
                        }
                    msg.channel.send(message);
                    }
                });
            });
        }
    },
    help: '`!acronym` test or `!ac` test'
};
