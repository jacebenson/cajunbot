module.exports = {
    _command: function(commandObj){
        var wordsArr = commandObj.msg.content.split(' ');
        var terms = wordsArr.filter(function(word) {
            if(word!='!jace'){
                return true;
            }
        });
        var message = 'https://jace.pro/?q=' + encodeURI(terms.join(' ').trim());
        commandObj.msg.channel.send(message);
    },
    command: function(commandObj) {
        var phrase = '!jace';
        if (commandObj.msg.author.bot === false) {
            var wordsArr = commandObj.msg.content.split(' ');
            wordsArr.map(function(word, index) {
                if (word.toLowerCase() === phrase) {
                    
                    module.exports._command(commandObj.msg);
                }
            });
        }
    },
    help: '`!jace string` Searchs jaces blog for the string provided.'
};