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
    //cronString: "0 7-16 * * 1-5",//at min 0 past hour from 7 to 16
    cronString: "0 7-16/4 * * *",//at min 0 past every 4th hour from 7 to 16
    devCronString: "* * * * 1-5"
}

var postToDB = function (content, user, logType) {
    var now = new Date();
    var timeTableObj = {
        type: logType,
        user: user,
        date: now,
        comment: content
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
                    var returnObj = {};
                    result.forEach(function (entry, index) {
                        if(index > 0){
                            yesterday = days[new Date(result[index-1].date).getDay() + ''];
                        } else {
                            yesterday = false
                        }
                        var day = days[new Date(entry.date).getDay() + ''];
                        var d = day + ' ' + new Date(entry.date).toLocaleString().split(',')[0];
                        if(yesterday != day){
                            returnObj[d] = [];
                        }
                        var hour = new Date(entry.date).getHours();
                        if (hour < 12) {
                            hour = + hour + ' AM: ';
                        } else {
                            if (hour !==12) {
                                hour = (hour - 12);
                           }
                            hour = hour + ' PM: ';
                        }
                        if(hour.length == 6){
                            hour = '0' + hour;
                        }
                        //msg.channel.send('```'+d + ' - ' + hour+' '+ entry.comment+'```');
                        //returnArr.push(day + ': ' + yesterday + '| ' + hour + ' ' + entry.comment);
                        returnObj[d].push(hour + ' ' + entry.comment)
                    });
                }
                for(var prop in returnObj){
                    var outputArr = [];
                    outputArr.push(prop);
                    returnObj[prop].forEach(function(thing){
                        outputArr.push(thing);
                    });
                    var message = outputArr.join('\n');
                    if(message.length>1900){
                        var n = message.lastIndexOf("\n", 1900);
                        msg.channel.send('```' + message.substring(0,n) + '```');
                        msg.channel.send('```' + message.substring(n, message.length) + '```');
                    }else {
                        msg.channel.send('```' + outputArr.join('\n') + '```');
                    }
                }
                //msg.channel.send('```' + returnArr.join('\n') + '```');
                //msg.channel.send(message);
                client.close();
            });
        });
    } catch (e) {
        msg.channel.send('```' + JSON.stringify(e,'','  ') + '```');
    }
};

var user = process.env.DISCORD_USER;
module.exports = {
    start: function (bot) {
        bot.on("message", function (msg) {
            if (msg.author.id === user) {
                var now = new Date();
                now.setHours(0, 0, 0, 0);
                var date = {
                    today: new Date(now.setDate(now.getDate() - 0)),
                    yesterday: new Date(now.setDate(now.getDate() - 1)),
                    thisweek: new Date(now.setDate(now.getDate() - 7))
                }
                var phrases = {
                    '!today':              {query:           { date: { "$gt": date.today                        } }                         },
                    '!t':                  {query:           { date: { "$gt": date.today                        } }                         },
                    '!t-tasks' :           {query: { "$and":[{ date: { "$gt": date.today                        } }, { type: "task"}    ] } },
                    '!t-notes' :           {query: { "$and":[{ date: { "$gt": date.today                        } }, { type: "note"}    ] } },
                    '!t-events':           {query: { "$and":[{ date: { "$gt": date.today                        } }, { type: "event"}   ] } },
                    '!yesterday':          {query:           { date: { "$gt": date.yesterday, "$lt": date.today } }                         },
                    '!y':                  {query:           { date: { "$gt": date.yesterday, "$lt": date.today } }                         },
                    '!y-tasks' :           {query: { "$and":[{ date: { "$gt": date.yesterday, "$lt": date.today } }, { type: "task"}    ] } },
                    '!y-notes' :           {query: { "$and":[{ date: { "$gt": date.yesterday, "$lt": date.today } }, { type: "note"}    ] } },
                    '!y-events':           {query: { "$and":[{ date: { "$gt": date.yesterday, "$lt": date.today } }, { type: "event"}   ] } },
                    '!thisweek':           {query:           { date: { "$gt": date.thisweek                     } }                         },
                    '!tw':                 {query:           { date: { "$gt": date.thisweek                     } }                         },
                    '!tw-tasks' :          {query: { "$and":[{ date: { "$gt": date.thisweek                     } }, { type: "task"}    ] } },
                    '!tw-notes' :          {query: { "$and":[{ date: { "$gt": date.thisweek                     } }, { type: "note"}    ] } },
                    '!tw-events':          {query: { "$and":[{ date: { "$gt": date.thisweek                     } }, { type: "event"}   ] } },
                };
                phrases['!s'] = true;
                //https://www.petitemelanie.com/en/the-bullet-journal-method-how-it-works/
                //https://bulletjournal.com/pages/book
                if (msg.author.bot === false) {
                    var wordsArr = msg.content.split(' ');
                        switch (wordsArr[0]) {
                            case '-':
                                postToDB(msg.content, msg.author.id, 'note');
                                msg.react('📓');
                                break;
                            case '.':
                                postToDB(msg.content, msg.author.id, 'task');
                                try {msg.react('✅');}catch(e){console.error(e);}
                                break;
                            case 'x':
                                postToDB(msg.content, msg.author.id, 'task');
                                try {msg.react('✅');}catch(e){console.error(e);}
                                break;
                            case 'o':
                                postToDB(msg.content, msg.author.id, 'event');
                                try {msg.react('🎫');}catch(e){console.error(e);}
                                break;
                            default:
                                //
                        }
                    wordsArr.map(function (word, index) {
                        for (var phrase in phrases) {
                            if (word.toLowerCase() === phrase) {
                                if(phrase == '!s'){
                                    var regex = /.*.*/i
                                    phrases[phrase] = {query: { "$and":[{ comment : '/.*' +wordsArr[index+1]+ '.*/i'}]}};;
                                    console.log(JSON.stringify(phrases[phrase],'','  '));
                                }
                                if(phrases[phrase].query){
                                    console.log('in query');
                                    getFromDB(phrases[phrase].query, msg);
                                }
                            }
                        }
                    });
                }
            }
        });
        schedule.scheduleJob(props.cronString, function () {
            bot.fetchUser(user).then(function (user) {
                user.send('What\'s up?');
            });
        });
    }
};