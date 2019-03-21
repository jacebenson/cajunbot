module.exports = {
    command: function (bot, msg) {
        try{
        var phrases = [
            {'dom manipulation':["(－‸ლ)","ಠ_ಠ"]},
            {'global business rule':["(－‸ლ)","ಠ_ಠ"]},
            {'global br':["(－‸ლ)","ಠ_ಠ"]},
            {'window.':["ಠ_ಠ"]},
            {'top.':["ಠ_ಠ"]},
            {'document.':["ಠ_ಠ"]},
            {'facepalm':["(－‸ლ)"]},
            {'(╯°□°）╯︵ ┻━┻':["┬──┬ ノ( ゜-゜ノ)"]},
            {'well it works':["http://i.imgur.com/vSaxB.jpg"]},
            {'current.update':["(－‸ლ)","ಠ_ಠ"]},
            {'global ui script':["(－‸ლ)","ಠ_ಠ"]},
            {'!xplore':["https://github.com/thewhitespace/Xplore/tree/master/dist"]},
        ];
        if (msg.author.bot === false) {
            var wordsArr = msg.content.split(' ');
            wordsArr.map(function(word, index) {
                phrases.map(function(phrase) {
                    if(typeof phrase[word.toLowerCase()]){
                        console.log('phrase['+word.toLowerCase()+']:' + phrase[word.toLowerCase()])
                        var message = rand(phrase[word.toLowerCase()]);
                        bot.createMessage(msg.channel.id, message);
                    }
                });
            });
        }
    }catch(e){
        console.log(e);
    }
    },
    help: 'Some strings have custom responses (see slackbot.js)'
};

var rand = function(arr) {
    //console.log('in random.');
    var random_choice = Math.floor(Math.random() * arr.length);
    return arr[random_choice];
}