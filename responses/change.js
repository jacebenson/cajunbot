var chance = require('chance');
module.exports = {
    command: function (bot, msg) {
        try {
            if (msg.author.bot === false) {
                var allowedDice = {
                    "4": true,
                    "6": true,
                    "8": true,
                    "10": true,
                    "12": true,
                    "20": true,
                    "30": true,
                    "100": true
                };
                wordsArr = msg.content.toLowerCase().split(' ');
                wordsArr.forEach(function (word) {
                    if (word.indexOf('d') > -1) {
                        //try dice
                        var dice = word.split('d');
                        var num = parseInt(dice[0]);
                        if (isNaN(num) === false) {
                            if (allowedDice[dice[1]]) {
                                var message = chance.rpg(word);
                                msg.channel.send(message);
                            }
                        }
                    }
                });
            }
        } catch (e) {
            console.log(e);
        }
    },
    help: '#d4,6,8,10,12,20,30,100 roll dice'
};