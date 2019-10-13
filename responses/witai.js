const { Wit, log } = require('node-wit');
var clientToken = 'RIKH2DXKGM7HMWUI25VN5WWZLIHIPEWI';//publicly client side available
const client = new Wit({
  accessToken: process.env.witAIToken || clientToken,
  logger: new log.Logger(log.INFO)
});
module.exports = {
  command: function (bot, msg, responses) {
    if (msg.author.bot === false) {
      if (msg.content.charAt(0) != '!') {
        var mentionsCajunBot = (function () {
          var bool = false;//default false;
          var lowerCaseMsg = msg.content.toLowerCase().trim();
          if (
            lowerCaseMsg.startsWith('bot') ||
            lowerCaseMsg.startsWith('robot') ||
            lowerCaseMsg.startsWith('machine') ||
            lowerCaseMsg.startsWith('cajon') ||
            lowerCaseMsg.startsWith('cajun') ||
            lowerCaseMsg.startsWith('<@490235035627028511>')
          ) {
            bool = true;
          }
          return bool;
        })();
        if (mentionsCajunBot || msg.channel.type === 'dm') {
          //only send messages to wit.ai if to cajunbot
          console.log('message is for cajunbot');
          client.message(msg.content, {})
            .then((data) => {
              console.log('yay, got wit.ai response: ', JSON.stringify(data, '', ' '));
              for (var prop in data.entities) {
                if (prop === "intent") {
                  data.entities[prop].forEach(function (intent) {
                    console.log(intent);
                    if (intent.value === 'dad-joke' && intent.confidence > 0.9) {
                      responses['joke.js']._command(msg, 1);
                    }
                    if (intent.value === 'quote' && intent.confidence > 0.9) {
                      if (data.entities.contact) {
                        var mentionsChuck = data.entities.contact.filter(function (contact) {
                          if (contact.value.toLowerCase() === 'chuck') {
                            return true;
                          }
                          if (contact.value.toLowerCase() === 'norris') {
                            return true;
                          }
                          if (contact.value.toLowerCase() === 'chuck norris') {
                            return true;
                          }
                        });
                        var mentionsRon = data.entities.contact.filter(function (contact) {
                          if (contact.value.toLowerCase() === 'ron') {
                            return true;
                          }
                          if (contact.value.toLowerCase() === 'swanson') {
                            return true;
                          }
                          if (contact.value.toLowerCase() === 'ron swanson') {
                            return true;
                          }
                        });
                        if (mentionsChuck.length > 0) {
                          console.log('chuck meme incoming');
                          responses['chuck-norris.js']._command(msg);
                        } else if (mentionsRon.length > 0) {
                          console.log('ron meme incoming');
                          responses['ron-swanson.js']._command(msg);
                        } else {
                          console.log('quote about who? ', data.entities.contact[0].value);
                        }

                      } else {
                        console.log('tell me a quote...', JSON.stringify(data, '', ' '));
                      }
                    }
                  });
                }
              }
            })
        } else {
          console.log("Msg not for cajunbot");
        }
      } else {
        console.log('predefined commaned detected (starts with !)');
      }
    }
  }
};