module.exports = {
    command: function(bot) {
        var phrase = '!insult';
        bot.on('ready', () => { // When the bot is ready
            console.log(phrase + ' Ready!'); // Log "Ready!"
        });
        bot.on("messageCreate", function(msg) {

            var wordsArr = msg.content.split(' ');
            wordsArr.map(function(word, index) {
                if (word.toLowerCase() === phrase) {
                    var insults = [
                        'You so dumb you thought dom manipulation was S&M',
                        'You so dumb you put all your business rules in one big global business rule with a huge if statement',
                        'You so dumb you use window. instead of g_navigation, hahahhaa pleb',
                        'You so dumb all your before business rules end with current.update();',
                        'You so dumb you advocate for domain separation',
                        'You so dumb you implemented team development for two developers',
                        'You so dumb you use gs.print() to debug your business rules',
                        'You so dumb you thought working with timezones would be easy',
                        'You so dumb you use `gr.get(current.sys_id);`',
                        'You so dumb you made a bot that does servicenow-related insults',
                        'You so dumb you tried to call an astrogliderecord',
                        'You so dumb your entire portal is an iframe to the backend',
                        'You so dumb you heard Workflow Editor had a memory leak so you put plastic under your laptop',
                        'You so dumb you created a custom widget instead of using the new oob table variable',
                        'You so dumb you prefix your scoped app tables with u_',
                        'You so dumb you use client-side open gliderecords'
                    ];
                    var random = Math.floor(Math.random() * insults.length);
                    var message = insults[random];
                    bot.createMessage(msg.channel.id, message);
                }
            });
        });
    },
    help: '`!insult` Says an SN-related insult.'
};