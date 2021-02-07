module.exports = {
    command: function (commandObj) {
        try{
        var disappointed = [
            "(－‸ლ)",
            "ಠ_ಠ",
            "(╥﹏╥)",
            "(◞‸◟；)",
            "òó",
            "┗[© ♒ ©]┛ ︵ ┻━┻",
            "https://cdn.pixabay.com/photo/2017/07/17/22/00/furious-2514031_960_720.jpg",//robin higgins furious
            "https://cdn.pixabay.com/photo/2018/02/02/21/41/crazy-3126441_960_720.jpg",//robin higgins angry
            "https://cdn.pixabay.com/photo/2017/06/09/05/21/sad-2385795_960_720.jpg",//robin higgins sad
            "https://cdn.pixabay.com/photo/2018/02/02/21/42/bored-3126445_960_720.jpg",//robin higgins eyeroll
            "https://cdn.pixabay.com/photo/2018/02/02/21/41/angry-3126438_960_720.jpg",//robin higgins upset
            "https://cdn.pixabay.com/photo/2017/08/25/21/43/upset-2681482_960_720.jpg",//robin higgins upset with hands
            "https://cdn.pixabay.com/photo/2018/02/02/21/40/angry-3126437_960_720.jpg",//robin higgins furious
            "https://cdn.pixabay.com/photo/2017/07/17/22/01/eye-roll-2514034_960_720.jpg"//robin higgins annoyed
        ];
        var phrases = {
            'dom manipulation':     disappointed,
            'global business rule': disappointed,
            'global br':            disappointed,
            'current.update':       disappointed,
            'global ui script':     disappointed,
            //'window.':              disappointed,//people don't like this...
            'top.':                 disappointed,
            'document.':            disappointed,
            'facepalm':             ["(－‸ლ)"],
            //'(╯°□°）╯︵ ┻━┻':        ["┬─┬ ノ( ゜-゜ノ)"],
            '┻━┻':                   ["┬─┬ ノ( ゜-゜ノ)", "┬─┬ ノ( ^_^ノ)","┬─┬︵ ლ(⌒-⌒ლ)"],
            ':open_mouth:':         ["https://i.kym-cdn.com/entries/icons/original/000/027/475/Screen_Shot_2018-10-25_at_11.02.15_AM.png","https://i.imgflip.com/2w241p.jpg"],
            '😮':                   ["https://i.kym-cdn.com/entries/icons/original/000/027/475/Screen_Shot_2018-10-25_at_11.02.15_AM.png","https://i.imgflip.com/2w241p.jpg"],
            '!xplore':              ["https://github.com/thewhitespace/Xplore/tree/master/dist"],
            'well it works':        ["http://i.imgur.com/vSaxB.jpg"],
        };
        if (commandObj.msg.author.bot === false) {
            for(var phrase in phrases){
                if(commandObj.msg.content.toLowerCase().indexOf(phrase)>-1){
                    var message = rand(phrases[phrase]);
                    commandObj.msg.channel.send(message);
                }
            }
        }
    }catch(e){
        console.error(e);
    }
    },
    help: 'Some strings have custom responses (try `facepalm`)'
};

var rand = function(arr) {
    var random_choice = Math.floor(Math.random() * arr.length);
    return arr[random_choice];
}
