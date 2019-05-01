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

var postToDB = function (content, user, type) {
    var now = new Date();
    var timeTableObj = {
        type: type,
        user: user,
        date: now,
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
                            if(day !== yesterday){
                                //msg.channel.send('a' + output.toString());
                            }
                            output.push(d);
                        }
                        var m = entry.comment.replace(/What\'s up\?\s+/g, '').trim();
                        if (m.length > 0) {
                            //msg.channel.send(hour + ' ' + m);
                            var mlEntry = m.split('\n');
                            mlEntry.forEach(function(mm){                            
                                output.push(hour + ' ' + mm.trim());
                            });
                            //output.push(hour + ' ' + m);
                        }
                        // return d + ': ' + m + '\n';
                    });
                    //message = JSON.stringify(messages);//.substring(0,100);
                    //if (index === result.length) {
                    output.push('```');
                    var outputStr = output.join('\n');
                    if(outputStr.length>2000){
                        var subString = outputStr.substring(0,1997) + '```'
                        var secondSubString = '```' + outputStr.substring(1997, outputStr.length); 
                        msg.channel.send(subString);
                        msg.channel.send(secondSubString);
                        
                    }else {
                        msg.channel.send(outputStr);
                    }
                    //}
                }
                //msg.channel.send(message);
                client.close();
            });
        });
    } catch (e) {
        msg.channel.send('```' + JSON.stringify(e,'','  ') + '```');
    }
};

var jace = '190324801821212672';
module.exports = {
    start: function (bot) {
        bot.on("message", function (msg) {
            if (msg.author.id === jace) {
                var now = new Date();
                now.setHours(0, 0, 0, 0);
                var date = {
                    today: new Date(now.setDate(now.getDate() - 0)),
                    yesterday: new Date(now.setDate(now.getDate() - 1)),
                    thisweek: new Date(now.setDate(now.getDate() - 7))
                }
                var phrases = {
                    '!today':       {query: { date: { "$gt": date.today } }},
                    '!t':           {query: { date: { "$gt": date.today } }},
                    '!yesterday':   {query: { date: { "$gt": date.yesterday, "$lt": date.today } }},
                    '!y':           {query: { date: { "$gt": date.yesterday, "$lt": date.today } }},
                    '!thisweek':    {query: { date: { "$gt": date.thisweek, "$lte": date.today } }},
                    '!tw':          {query: { date: { "$gt": date.thisweek, "$lte": date.today } }},
                    '!log': null 
                };
                if (msg.author.bot === false) {
                    var wordsArr = msg.content.split(' ');
                    msg.channel.send(wordArr[0]);
                        switch (word[0]) {
                            case '-':
                                postToDB(msg.content.replace(wordArr[0],jace, 'note'));
                                msg.react('📓');
                                break;
                            case '.':
                                postToDB(msg.content.replace(wordArr[0],jace, 'task'));
                                try {msg.react('☑');}catch(e){console.error(e);}
                                try {msg.react('✅');}catch(e){console.error(e);}
                            case 'o':
                                postToDB(msg.content.replace(wordArr[0],jace, 'event'));
                                try {msg.react('🎟️');}catch(e){console.error(e);}
                                try {msg.react('🎫');}catch(e){console.error(e);}
                                break;
                            default:
                                //
                        }
                    wordsArr.map(function (word, index) {
                        for (var phrase in phrases) {
                            if (word.toLowerCase() === phrase) {
                                if(phrases[phrase].query){
                                    getFromDB(phrases[phrase], msg);
                                }
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
                            postToDB(messages.toString(), jace, 'note');
                            user.send("Awesome, logged.");
                        }
                    });
                });
            });
        });
    }
};
