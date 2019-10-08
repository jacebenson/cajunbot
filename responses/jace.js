module.exports = {
    _command: function(msg){
        var wordsArr = msg.content.split(' ');
        var terms = wordsArr.filter(function(word) {
            if(word!='!jace'){
                return true;
            }
        });
        var message = 'https://jace.pro/?q=' + encodeURI(terms.join(' ').trim());
        msg.channel.send(message);
    },
    command: function(bot, msg) {
        var phrase = '!jace';
        if (msg.author.bot === false) {
            var wordsArr = msg.content.split(' ');
            wordsArr.map(function(word, index) {
                if (word.toLowerCase() === phrase) {
                    
                    module.exports._command(msg);
                }
            });
        }
    },
    help: '`!jace string` Searchs jaces blog for the string provided.'
};