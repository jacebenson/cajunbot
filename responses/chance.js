var Chance = require('chance');

// Instantiate Chance so it can be used
var chance = new Chance();

module.exports = {
    command: function (bot, msg) {
            if (msg.author.bot === false) {
                wordsArr = msg.content.toLowerCase().split(' ');
                wordsArr.forEach(function (word) {
                    if (word.indexOf('d') > -1) {
                        //try dice
                        var dice = word.split('d');
                        var num = parseInt(dice[0]);
                        if (isNaN(num) === false) {
                            var message;
                            if(num>100){
                                message = 'Come on, I can\'t roll that many dice at once.';
                                msg.channel.send(message);
                            } else {
                                
        try {
                                    var diceArr = chance.rpg(word);
                                    message = diceArr.join(', ');
                                    var sum = diceArr.reduce(function(a, b) { return a + b; });
                                    var avg = sum / diceArr.length;
                                    var max = Math.max.apply(Math, diceArr);
                                    var min = Math.min.apply(Math, diceArr);
                                    message += '\nSum: ' + sum;
                                    message += '\nAvg: ' + avg;
                                    message += '\nMax: ' + max;
                                    message += '\nMin: ' + min;
                                    msg.channel.send(message);
            
        } catch (e) {
            console.log(e);
        }
                                }
                            }
                        }
                    }
                });
            }
    },
    help: '`#d4,6,8,10,12,20,30,100` rolls dice'
};
