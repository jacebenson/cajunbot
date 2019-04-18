var MongoClient = require('mongodb').MongoClient;
var mongoURI = process.env.MONGODB_URI;
var schedule = require('node-schedule');

/**
 * Prod string
 * "0 7-16 * * 1-5"
 * “At minute 0 past every hour from 7 through 16 on every day-of-week from Monday through Friday.” 
 * 
 * Testing string
 * "* * * * 1-5"
 * “At every minute on every day-of-week from Monday through Friday.” 
 */
var props = {
    minutesToWait: 5,
    cronString: "0 7-16 * * 1-5",
    devCronString: "* * * * 1-5"
}

var postToDB = function (content, user) {
    var now = new Date();
    var timeTableObj = {
        user: user,
        date: now,
        lodaldate: now.toLocaleString(),
        comment: content.replace(/,/gm, '\n')
    };
    MongoClient.connect(mongoURI, {
        useNewUrlParser: true
    }, function (err, client) {
        if (err) console.log(err);
        var db = client.db('cajonbot');
        db.collection('timetable').insertOne(timeTableObj, function (err, result) {
            if (err) {
                console.log(err);
                client.close();
            } else {
                if (result) {
                    console.log('inserted entry');
                } else {
                    console.log('result falsy');
                }
                client.close();
            }
        });
    });
}
var getFromDB = function (filter, msg) {
    try {
        MongoClient.connect(mongoURI, {
            useNewUrlParser: true
        }, function (err, client) {
            if (err) console.log(err);
            var db = client.db('cajonbot');
            db.collection('timetable').find(filter).toArray(function (err, result) {
                if (result) {
                    var days = {
                        "0": "Sun",
                        "1": "Mon",
                        "2": "Tue",
                        "3": "Wed",
                        "4": "Thur",
                        "5": "Fri",
                        "6": "Sat",
                    };
                    var output = ['```', '\n'];
                    result.forEach(function (entry, index) {
                        if(index > 0){
                            yesterday = days[new Date(result[index-1].date).getDay() + ''];
                        } else {
                            yesterday = false
                        }
                        var day = days[new Date(entry.date).getDay() + ''];
                        var d = day + ' ' + new Date(entry.date).toLocaleString().split(',')[0];
                        var hour = new Date(entry.date).getHours();
                        if (hour < 13) {
                            hour = + hour + ' AM: ';
                        } else {
                            hour = (hour - 12);
                            hour = hour + ' PM: ';
                        }
                        if(hour.length == 6){
                            hour = '0' + hour;
                        }
                        if (index === 0 || day !== yesterday) {
                            //msg.channel.send('**' + d + '**');
                            output.push(d);
                        }
                        var m = entry.comment.replace(/What\'s up\?\s+/g, '').trim();
                        if (m.length > 0) {
                            //msg.channel.send(hour + ' ' + m);
                            var mlEntry = m.split('\n');
                            mlEntry.forEach(function(mm){                            
                                output.push(hour + ' ' + trim(mm));
                            });
                            //output.push(hour + ' ' + m);
                        }
                        // return d + ': ' + m + '\n';
                    });
                    //message = JSON.stringify(messages);//.substring(0,100);
                    //if (index === result.length) {
                    output.push('```');
                    msg.channel.send(output.join('\n'));
                    //}
                }
                //msg.channel.send(message);
                client.close();
            });
        });
    } catch (e) {
        msg.channel.send('```' + JSON.stringify(e,'','  ') + '````');
    }
};
/**
 * command: function(bot, msg) {
        var phrase = '!jace';
        if (msg.author.bot === false) {
            var wordsArr = msg.content.split(' ');
            wordsArr.map(function(word, index) {
                if (word.toLowerCase() === phrase) {
                    var term = wordsArr[index + 1];
                    var message = 'https://blog.jacebenson.com/' + encodeURI(wordsArr.join(' ').replace(word, '').trim());
                    msg.channel.send(message);
                }
            });
        }
    },
    help: '`!jace string` Searchs jaces blog for the string provided.'
 */

var jace = '190324801821212672';
module.exports = {
    start: function (bot) {
        bot.on("message", function (msg) {
            if (msg.author.id === jace) {
                var now = new Date();
                now.setHours(0, 0, 0, 0);
                var date = {
                    today: new Date(now.setDate(now.getDate() - 0)),
                    t: new Date(now.setDate(now.getDate() - 0)),
                    yesterday: new Date(now.setDate(now.getDate() - 1)),
                    y: new Date(now.setDate(now.getDate() - 1)),
                    thisweek: new Date(now.setDate(now.getDate() - 7)),
                    tw: new Date(now.setDate(now.getDate() - 7)),
                }
                var phrases = {
                    '!today': { date: { "$gt": date.today } },
                    '!t': { date: { "$gt": date.t } },
                    '!yesterday': { date: { "$gt": date.yesterday, "$lt": date.today } },
                    '!y': { date: { "$gt": date.yesterday, "$lt": date.today } },
                    '!thisweek': { date: { "$gt": date.thisweek, "$lt": date.today } },
                    '!tw': { date: { "$gt": date.thisweek, "$lt": date.today } },
                    '!all': {}
                };
                if (msg.author.bot === false) {
                    var wordsArr = msg.content.split(' ');
                    wordsArr.map(function (word, index) {
                        for (var phrase in phrases) {
                            if (word.toLowerCase() === phrase) {
                                //var message = JSON.stringify(phrases[phrase]);
                                //msg.channel.send(message);
                                getFromDB(phrases[phrase], msg);
                            }
                        }
                    });
                }
            }
        });
        schedule.scheduleJob(props.cronString, function () {
            bot.fetchUser(jace).then(function (user) {
                user.send('What\'s up?').then(function (message) {
                    //collection = new bot.MessageCollector(message.channel,function(){},{max:1});
                    var collector = message.channel.createMessageCollector(function () { return true }, { time: 50 * 20 * 1000 });
                    collector.on('collect', m => {
                        if (m.author.id === jace) {
                            console.log(`Collected ${m.content}`);
                            collector.stop();
                        }
                    });

                    collector.on('end', collected => {
                        var e = new Date();
                        console.log(`Collected ${collected.size} items ${e}`);
                        var messages = collected.map(function (message) {
                            return message.content;
                        });
                        if (messages.length > 0) {
                            console.log(messages.toString());
                            /**
                             * Make connection to DB and post.
                             */
                            postToDB(messages.toString());
                        }
                        user.send("Awesome, logged.");
                    });
                });
            });
        });
    }
};
