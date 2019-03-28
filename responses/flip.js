module.exports = {
    command: function(bot, msg) {
        var phrases = ['!flip', '!invert'];
        if (msg.author.bot === false) {
            var wordsArr = msg.content.split(' ');
            wordsArr.map(function(word, index) {
                phrases.map(function(phrase) {
                    if (word.toLowerCase() === phrase) {
                        //zʎxʍʌuʇsɹqdouɯʃʞɾıɥƃɟǝpɔqɐ
                        var flipTable = {
                            'a': 'ɐ',//'\u0250',
                            'b': 'q',
                            'c': 'ɔ',//'\u0254', //open o -- from pne
                            'd': 'p',
                            'e': 'ǝ',//'\u01DD',
                            'f': 'ɟ',//'\u025F', //from pne
                            'g': 'ƃ',//'\u0183',
                            'h': 'ɥ',//'\u0265',
                            'i': 'ı',//'\u0131', //from pne
                            'j': 'ɾ',//'\u027E',
                            'k': 'ʞ',//'\u029E',
                            'l': 'ʃ',//'ʃ', //'\u0283',
                            'm': 'ɯ',//'\u026F',
                            'n': 'u',
                            'o': 'o',
                            'p': 'd',
                            'q': 'b',
                            'r': 'ɹ',//'\u0279',
                            's': 's',
                            't': 'ʇ',//'\u0287',
                            'u': 'n',
                            'v': 'ʌ',//'\u028C',
                            'w': 'ʍ',//'\u028D',
                            'x': 'x',
                            'y': 'ʎ',//'\u028E',
                            'z': 'z',
                            '.': '˙',//'\u02D9',
                            '[': ']',
                            '(': ')',
                            '{': '}',
                            '?': '¿',//'\u00BF', //from pne
                            '!': '¡',//'\u00A1',
                            "\'": ',',
                            '<': '>',
                            '_': '‾',//'\u203E',
                            ';': '؛',//'\u061B',
                            '\u203F': '\u2040',
                            '\u2045': '\u2046',
                            '\u2234': '\u2235',
                            '\r': '\n',
                            ' ': ' '
                        };
                        var arrOfThings = msg.content.replace('!flip', '').split('');
                        var flipped = arrOfThings.map(function(char) {
                            return flipTable[char.toLowerCase()];
                        });
                        var flipper = ['┗[© ♒ ©]┛', '(╯°□°)╯','(ノ ゜Д゜)ノ','(╯°□°）╯'];
                        var message = rand(flipper) + '︵ ' + flipped.reverse().join('');
                        bot.createMessage(msg.channel.id, message);
                    }

                });
            });
        }
    },
    help: '`!flip string` Or !invert, flips the string upside down.'
};

var rand = function(arr) {
    //console.log('in random.');
    var random_choice = Math.floor(Math.random() * arr.length);
    return arr[random_choice];
}
