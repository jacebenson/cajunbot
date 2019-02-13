
//const {SlackBot} = require('frozor-slackbot');
var { SlackBot } = require('frozor-slackbot');
var Eris = require('eris');



function registerEvents(slackBot) {
    var global = {};
    global.channels = {
        random: {
            slack: "C0EHD6JTH",
            discord: "544087896924356610"
        }
    };
    
    slackBot.api.once('event', () => {
        console.log(`Setting first event on bot slackBot.prefix)`);
        slackBot.firstEvent = Date.now() / 1000;
        var obj = slackBot.api.methods;
        console.log(obj);
        for (var prop in obj) {
            console.log(prop + ' ' + typeof obj[prop]);
            //console.log(JSON.stringify(obj,' ',' '));
        }
    });

    slackBot.on('command', (msg) => {
        commandHandler.process(msg, commandExtra, slackBot).catch(log.error);
    });

    slackBot.api.on('rtmClose', () => {
        console.log(`slackBot.prefix disconnected from slack. Attempting to restart it...`);
        slackBot.api.rtm.start();
    });

    // Update preferences as they change
    slackBot.api.on('pref_change', (e) => {
        slackBot.self.prefs[e.name] = e.value;
    });
    slackBot.api.on('message', (msg) => {
        if (msg.subtype || msg.hasOwnProperty('edited')) return;
        if (msg.ts <= slackBot.firstEvent) return;
        //if(msg.text.toLowerCase().indexOf('jace')>=0){
        try {
            console.log(msg);
            if (global.channels.random.slack === msg.channel && !msg.bot_id) {
                var channelName = '#random';
                var team = slackBot.api.storage.team.get().then(function (teamResult) {
                    //console.log(teamResult);
                    var teamName = teamResult.name || 'Unknown';
                    var user = slackBot.api.storage.users.get(msg.user).then(function (user) {
                        var userName = '@' + (user.profile.display_name_normalized || 'Unknown');
                        var messageString = teamName + ' ' + channelName + ' ' + userName + ': ' + msg.text;
                        console.log(messageString);
                        discordBot.createMessage(global.channels.random.discord, userName + ': ' + msg.text);
                    });
                });
            }
        } catch (e) {
            console.log(e);
        }
        //}
    });
    var discordBot = new Eris(process.env.DISCORD_BOT_TOKEN);
    discordBot.on("ready", () => {
        console.log("discordBot Ready!");
    });
    discordBot.on("messageCreate", function (msg) {
        try {
            console.log(msg);
            if (global.channels.random.discord === msg.channel.id && !msg.author.bot) {
                var messageString = '#' + msg.channel.name + ' ' +msg.author.username + ': ' + msg.content;
                //console.log(msg.channel.guild.name + '#' + msg.channel.name + '[' + msg.channel.id + ']: ' + msg.author.username + ': ' + msg.content);
                  var messageObj = {
                      //channel: 'random', 
                      channel: global.channels.random.slack,
                      text: messageString, 
                        as_user: true
                    };
                slackBot.api.methods.chat.postMessage(messageObj).then(function(response){
                    console.log(response);
                });
            }
        } catch (error) {
            console.log(error);
        }
    });

    discordBot.connect();
}

module.exports = {
    connect: function () {
        console.log(process.env.SLACK_TOKEN);
        var bot = new SlackBot(process.env.SLACK_TOKEN, true, "JACETEST", {
            customCommandHandling: true
        });
        bot.init();
        registerEvents(bot);
    }
};