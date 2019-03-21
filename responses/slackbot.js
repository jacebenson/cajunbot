module.exports = {
    command: function (bot, msg) {
        try{
        var phrases = {
            'dom manipulation':     ["(－‸ლ)","ಠ_ಠ"],
            'global business rule': ["(－‸ლ)","ಠ_ಠ"],
            'global br':            ["(－‸ლ)","ಠ_ಠ"],
            'current.update':       ["(－‸ლ)","ಠ_ಠ"],
            'global ui script':     ["(－‸ლ)","ಠ_ಠ"],
            'window.':              ["ಠ_ಠ"],
            'top.':                 ["ಠ_ಠ"],
            'document.':            ["ಠ_ಠ"],
            'facepalm':             ["(－‸ლ)"],
            '(╯°□°）╯︵ ┻━┻':   ["┬──┬ ノ( ゜-゜ノ)"],
            '!xplore':              ["https://github.com/thewhitespace/Xplore/tree/master/dist"],
            'well it works':        ["http://i.imgur.com/vSaxB.jpg"],
        };
        if (msg.author.bot === false) {
            for(var phrase in phrases){
                if(msg.content.toLowerCase().indexOf(phrase)>-1){
                    var message = rand(phrases[phrase]);
                    bot.createMessage(msg.channel.id, message);
                }
            }
        }
    }catch(e){
        console.log(e);
    }
    },
    help: 'Some strings have custom responses (try `facepalm`)'
};

var rand = function(arr) {
    //console.log('in random.');
    var random_choice = Math.floor(Math.random() * arr.length);
    return arr[random_choice];
}