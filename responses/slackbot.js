module.exports = {
    command: function (bot, msg) {
        try{
        var disappointed = ["(－‸ლ)","ಠ_ಠ","(╥﹏╥)","(◞‸◟；)", "òó", "┗[© ♒ ©]┛ ︵ ┻━┻"];
        var phrases = {
            'dom manipulation':     disappointed,
            'global business rule': disappointed,
            'global br':            disappointed,
            'current.update':       disappointed,
            'global ui script':     disappointed,
            'window.':              disappointed,
            'top.':                 disappointed,
            'document.':            disappointed,
            'facepalm':             ["(－‸ლ)"],
            '(╯°□°）╯︵ ┻━┻':        ["┬─┬ ノ( ゜-゜ノ)"],
            ':open_mouth:':         ["https://i.kym-cdn.com/entries/icons/original/000/027/475/Screen_Shot_2018-10-25_at_11.02.15_AM.png","https://i.imgflip.com/2w241p.jpg"],
            '😮':                   ["https://i.kym-cdn.com/entries/icons/original/000/027/475/Screen_Shot_2018-10-25_at_11.02.15_AM.png","https://i.imgflip.com/2w241p.jpg"],
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
