module.exports = {
    command: function(bot, msg) {
        var phrase = '!ping';
        if (msg.author.bot === false) {
            var wordsArr = msg.content.split(' ');
            wordsArr.map(function(word, index) {
                if (word.toLowerCase() === phrase) {
                    msg.addReaction('💯'); //now geting error unknown emoji
                    msg.addReaction('😅');
                    /*var msgs = bot.getMessages(msg.channel.id, 100).then(function(messages){
                      messages.map(function(message){
                        console.log('Deleting "'+message.content+'"');
                      bot.deleteMessage(msg.channel.id, message.id, 'Test Delete Content');
                      });
                    });
                    bot.deleteMessage(msg.channel.id, msg.id, 'Test Delete Content');
                    */
                  
                }
            });
        }
    },
    help: '`!ping` test ....'
};