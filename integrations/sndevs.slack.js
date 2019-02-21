
//const {SlackBot} = require('frozor-slackbot');
var { SlackBot } = require('frozor-slackbot');
var Eris = require('eris');
var discordBot = new Eris(process.env.DISCORD_BOT_TOKEN);


function registerEvents(slackBot) {
    var global = {};
    global.channels = {
        knowledge19: {
            slack: "CAQ2W3EE4",
            discord: "544970699026989056"
        }
    };
    
    slackBot.api.once('event', () => {
        //console.log(`Setting first event on bot slackBot.prefix)`);
        slackBot.firstEvent = Date.now() / 1000;
        /*var obj = slackBot.api.methods;
        console.log(obj);
        for (var prop in obj) {
            console.log(prop + ' ' + typeof obj[prop]);
            //console.log(JSON.stringify(obj,' ',' '));
        }//*/
    });

    slackBot.on('command', (msg) => {
        //commandHandler.process(msg, commandExtra, slackBot).catch(log.error);
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
            //console.log(msg);
            if (global.channels.knowledge19.slack === msg.channel && !msg.bot_id) {
                var channelName = '#knowledge19';
                var team = slackBot.api.storage.team.get().then(function (teamResult) {
                    //console.log(teamResult);
                    var teamName = teamResult.name || 'Unknown';
                    var user = slackBot.api.storage.users.get(msg.user).then(function (user) {
                        var userName = '@' + (user.profile.display_name_normalized || user.profile.real_name_normalized || 'Unknown');
                        var messageString = teamName + ' ' + channelName + ' ' + userName + ': ' + msg.text;
                        console.log(messageString);
                        discordBot.createMessage(global.channels.knowledge19.discord, userName + ': ' + msg.text);
                    });
                });
            }
        } catch (e) {
            console.log(e);
        }
        //}
    });
    
    discordBot.on("ready", () => {
        console.log("discordBot Ready!");
    });
    discordBot.on("messageCreate", function (msg) {
        try {
          // console.log(msg);
          var user = msg.member.nick || msg.author.username;
            if (global.channels.knowledge19.discord === msg.channel.id && !msg.author.bot) {
                var messageString = user + ': ' + msg.content;
                //console.log(msg.channel.guild.name + '#' + msg.channel.name + '[' + msg.channel.id + ']: ' + msg.author.username + ': ' + msg.content);
                  var messageObj = {
                      //channel: 'knowledge19', 
                      channel: global.channels.knowledge19.slack,
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
    //*/
    discordBot.connect();
}

module.exports = {
    connect: function () {
        // console.log(process.env.SLACK_TOKEN);
        var bot = new SlackBot(process.env.SLACK_TOKEN, true, "SNDEVS", {
            customCommandHandling: true
        });
        bot.init();
        registerEvents(bot);
    }
};