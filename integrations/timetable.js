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
                    var output = ['```', '\n'];
                    result.forEach(function (entry, index) {
                        //console.log(entry);
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
                        output.push(hour + ' ' + entry.comment);
                          
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

var user = '190324801821212672';//jace
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
                    '!today':       {query: { date: { "$gt": date.today } }},
                    '!t':           {query: { date: { "$gt": date.today } }},
                    '!t tasks' :           {query: { $and:[{date: { "$gt": date.today } }, {type: "task"}]}},
                    '!t notes' :           {query: { date: { "$gt": date.today } }},
                    '!t events':           {query: { date: { "$gt": date.today } }},
                    '!yesterday':   {query: { date: { "$gt": date.yesterday, "$lt": date.today } }},
                    '!y':           {query: { date: { "$gt": date.yesterday, "$lt": date.today } }},
                    '!thisweek':    {query: { date: { "$gt": date.thisweek}}},//, "$lte": date.today } }},
                    '!tw':          {query: { date: { "$gt": date.thisweek}}}//, "$lt": date.today } }}
                };
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
                                try {msg.react('☑');}catch(e){console.error(e);}
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
                                if(phrases[phrase].query){
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
