module.exports = {
  react: function(reaction) {
    var watchingEmoji = "🤖";

    if (reaction._emoji == watchingEmoji) {
      reaction.message.reply(
        "Here\'s your solution! \n" +
        "https://lmddgtfy.net/?q=" +
          "servicenow%20" +
          encodeURI(reaction.message.content).substring(0, 70) +
          "%20!g"
      );
    }
  },
  help: "React with :robot: to help a friendly bot out (; "
};