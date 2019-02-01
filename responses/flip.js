module.exports = {
    command: function(bot) {
        var phrases = ['!flip', '!invert'];
        bot.on('ready', () => { // When the bot is ready
            console.log(phrases + ' Ready!'); // Log "Ready!"
        });
        bot.on("messageCreate", function(msg) {
if(msg.author.bot === false){
            var wordsArr = msg.content.split(' ');
            wordsArr.map(function(word, index) {
                phrases.map(function(phrase) {
                    if (word.toLowerCase() === phrase) {
                        var flipTable = {
                            'a': '\u0250',
                            'b': 'q',
                            'c': '\u0254', //open o -- from pne
                            'd': 'p',
                            'e': '\u01DD',
                            'f': '\u025F', //from pne
                            'g': '\u0183',
                            'h': '\u0265',
                            'i': '\u0131', //from pne
                            'j': '\u027E',
                            'k': '\u029E',
                            'l': 'l', //'\u0283',
                            'm': '\u026F',
                            'n': 'u',
                            'o': 'o',
                            'p': 'd',
                            'q': 'b',
                            'r': '\u0279',
                            's': 's',
                            't': '\u0287',
                            'u': 'n',
                            'v': '\u028C',
                            'w': '\u028D',
                            'x': 'x',
                            'y': '\u028E',
                            'z': 'z',
                            '.': '\u02D9',
                            '[': ']',
                            '(': ')',
                            '{': '}',
                            '?': '\u00BF', //from pne
                            '!': '\u00A1',
                            "\'": ',',
                            '<': '>',
                            '_': '\u203E',
                            ';': '\u061B',
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
                        var message = flipped.join('');
                        bot.createMessage(msg.channel.id, message);
                    }

                });
            });
}
        });
    },
    help: '`!flip string` Or !invert, flips the string upside down.'
};