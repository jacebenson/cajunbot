module.exports = {
  react: function(reaction) {
    var watchingEmoji = "🤖";

    if (reaction._emoji == watchingEmoji) {
		//regex for emotes in message 
		var regex = /<(?:[^\d>]+|:[A-Za-z0-9]+:)\w+>/gm;
		var messageContent = reaction.message.content;
		var replacedContent = messageContent.replace(regex, '');
      reaction.message.reply(
        "Here\'s your solution! \n" +
        "https://lmddgtfy.net/?q=" +
          "servicenow%20" +
          encodeURI(replacedContent).substring(0, 70) +
          "%20!g"
      );
    }
  },
  help: "React with :robot: to help a friendly bot out (; "
};