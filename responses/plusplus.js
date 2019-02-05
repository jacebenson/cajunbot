var MongoClient = require('mongodb').MongoClient;
var mongoURI = process.env.MONGOLAB_URI; // || require('./.env').uri;
var rand = function(arr) {
    //console.log('in random.');
    var random_choice = Math.floor(Math.random() * arr.length);
    return arr[random_choice];
}
var compliments = function(user, points) {
    var responses = [
        'Congrats! ' + user + '  has ' + points + ' points',
        'Good work! ' + user + ' has ' + points + ' points',
        'Good going! ' + user + ' has ' + points + ' points',
        'Nice work! ' + user + ' has ' + points + ' points',
        'Point!' + user + ' has ' + points + ' points',
        'Way to help out! ' + user + ' has ' + points + ' points',
        'Who has two thumbs and one more point? ' + user + ' does.  ' + user + ' has ' + points + ' points',
        'Do you want a point?  Because that\'s how you get points.  ' + user + ' has ' + points + ' points',
        //'https://memegen.link/ants/do_you_want_points~q/because_that\'s_how_' + user + '_get_points.jpg',
        //'https://memegen.link/api/templates/oprah/you_get_a_point/and_you_get_a_point',
        //'https://memegen.link/api/templates/buzz/points/points_everywhere'
        /*
        'I\'m just gonna sneak right up here and give this to ya, ' + user,
        'Nice work ' + user,
        'Do you want a point?  Because that\'s how you get points.  ' + user + ' has ' + points + ' points',
        'Point!'
        /*
      'I\'m just gonna sneak right up here and give this to ya, ' + user,
      'Nice work ' + user,
      
      'Point!'
      
      */
    ];
    return responses;
}
module.exports = {
    command: function(bot, msg) {
        var phrase = '++';
        if (msg.author.bot === false) {
            //console.log(msg)
            console.log(msg.channel.guild.name + '#' + msg.channel.name + ': ' + msg.author.username + ': ' + msg.content);
            //bot.createMessage(msg.channel.id, msg);
            //var regex = /((([^\s])+|([^\s])+(\s)+)(\+){2})/gm;
            var regex = /((([^\s])+|([^\s])+(\s)+)((\+){2})|(thanks|thank you)\s([^\s]+))/gmi;
            var m;
            while ((m = regex.exec(msg.content)) !== null) {
                // This is necessary to avoid infinite loops with zero-width matches
                if (m.index === regex.lastIndex) {
                    regex.lastIndex++;
                }
                // The result can be accessed through the `m`-variable.
                m.forEach(function(match, groupIndex) {
                    if (groupIndex === 0) {
                        var thing = match.replace(/(\+)+|(thanks|thank you)/gmi, '').trim();
                        var thingName = thing;
                        if (thing.indexOf('<@') >= 0) {
                            var userregex = /(\<\@)(\d+)(\>)/gm;
                            var subst = `$2`;
                            thingName = thingName.replace(userregex, subst);
                            msg.mentions.forEach(function(member) {
                                if (thingName == member.id) {
                                    thingName = member.username;
                                }
                            });
                        }
                        console.log(`Found match, group ${groupIndex}: ${match}`);
                        MongoClient.connect(mongoURI, {
                            useNewUrlParser: true
                        }, function(err, client) {
                            //console.log('connected to mongo');
                            if (err) console.log(err);
                            var db = client.db('cajonbot');
                            // look for user in db
                            //var queryObj = {'thing': thing};
                            //{$or:[{"groupA":data},{"groupB":data}]}
                            var queryObj = {
                                $or: [{
                                    "thing": thing
                                }, {
                                    "name": thing.toLowerCase()
                                }]
                            }

                            db.collection('points').findOne(queryObj, function(err, result) {
                                if (result) {
                                    //console.log(result);
                                    //console.log(result.thing + ': ' + result.points);
                                    if (result.thing != '<@' + msg.author.id + '>') {
                                        result.points = parseInt(result.points, 10) + 1;
                                        result.name = thingName.toLowerCase();
                                        result.display = thingName;
                                        console.log(result.thing + ': ' + result.points);
                                        db.collection('points').updateOne(queryObj, {
                                                $set: result
                                            },
                                            function(err, writeResult) {
                                                if (err) {
                                                    console.log(err);
                                                }
                                                client.close();
                                                console.log('Updating points: ' + thing);
                                                var message = rand(compliments(thing, result.points));
                                                console.log(message);
                                                bot.createMessage(msg.channel.id, message);
                                                msg.addReaction('💯');
                                            });
                                    } else {
                                        var message = 'You cant give points to yourself';
                                        bot.createMessage(msg.channel.id, message);
                                    }
                                } else {
                                    var myObj = {
                                        thing: thing,
                                        name: thingName.toLowerCase(),
                                        display: thingName,
                                        points: 1
                                    };
                                    db.collection('points').insertOne(myObj, function(err, res) {
                                        if (err) {
                                            console.log(err);
                                        }
                                        console.log('Insreting points: ' + thing);
                                        var message = rand(compliments(thing, 1));
                                        bot.createMessage(msg.channel.id, message);
                                        msg.addReaction('💯');

                                        client.close();
                                    });
                                }
                            });
                        });
                    }
                });
            }
        }
    },
    help: '` ++ string` Give points away'
};