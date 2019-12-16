var MongoClient = require('mongodb').MongoClient;
var mongoURI = process.env.MONGODB_URI;
var rand = function (arr) {
    var random_choice = Math.floor(Math.random() * arr.length);
    return arr[random_choice];
}
var compliments = function (user, points) {
    try {
        var responses = [
            '<3',
            'All I want for Christmas is you!',
            'All of your ideas are brilliant!',
            'Being awesome is hard, but you\'ll manage.',
            'Congrats!',
            'Do you want a point?  Because that\'s how you get points.',
            'Don\'t worry about procrastinating on your studies, I know you\'ll do great!',
            'Even my cat likes you.',
            'Even though this goes against everything I know, I think I\'m in love with you.',
            'Every other country is super jealous you\'re a citizen in this country.',
            'Good going!',
            'Good work!',
            'Have you been working out?',
            'Hello, good looking.',
            'Hi, I\'d like to know why you\'re so beautiful.',
            'I am grateful to be blessed by your presence.',
            'I am having trouble coming up with a compliment worthy enough for you.',
            'I am utterly disarmed by your wit.',
            'I appreciate all of your opinions.',
            'I appreciate you more than Santa appreciates chimney grease.',
            'I bet even your farts smell good.',
            'I bet you could take a punch from Mike Tyson.',
            'I could hang out with you for a solid year and never get tired of you.',
            'I dig you.',
            'I disagree with anyone who disagrees with you.',
            'I don\'t speak much English, but with you all I really need to say is beautiful.',
            'I enjoy you more than a good sneeze. A GOOD one.',
            'I find you to be a fountain of inspiration.',
            'I heard you make really good French Toast.',
            'I just want to gobble you up!',
            'I like the way your nostrils are placed on your nose.',
            'I like you more than the smell of Grandma\'s home-made apple pies.',
            'I like your face.',
            'I like your style!',
            'I like your style.',
            'I love the way you click.',
            'I love the way your eyes crinkle at the corners when you smile.',
            'I love what you\'ve done with the place.',
            'I love you more than a drunk college student loves tacos.',
            'I love you more than bacon! ',
            'I Love you!',
            'I named all my appliances after you.',
            'I support all of your decisions.',
            'I support all of your decisions.',
            'I think about you while I\'m on the toilet.',
            'I told all my friends about how cool you are.',
            'I wish I could move your furniture.',
            'I wish I was your mirror.',
            'I would do your taxes any day.',
            'I would enjoy a roadtrip with you.',
            'I would enjoy spending time with you.',
            'I would hold the elevator doors open for you if they were closing.',
            'I would love to visit you, but I live on the Internet.',
            'I would share my dessert with you.',
            'I would share my fruit Gushers with you.',
            'I would trust my children with you.',
            'I would trust you to pick out a pet fish for me.',
            'I would volunteer to take your place in the Hunger Games.',
            'I\'d like to kiss you. Often.',
            'I\'d trust you to perform open heart surgery on me... blindfolded!',
            'I\'d wake up for an  a.m. class just so I could sit next to you.',
            'I\'m jealous of the other websites you visit, because I enjoy seeing you so much!',
            'I\'ve had the time of my life, and I owe it all to you!',
            'If I could count the seconds I think about you, I will die in the process!',
            'If I freeze, it\'s not a computer virus.  I was just stunned by your beauty.',
            'If I had a nickel for everytime you did something stupid, I\'d be broke!',
            'If I had to choose between you or Mr. Rogers, it would be you.',
            'If we were playing kickball, I\'d pick you first.',
            'If you broke your arm, I would carry your books for you.',
            'If you really wanted to, you could probably get a bird to land on your shoulder and hang out with you.',
            'If you were around, I would enjoy doing my taxes.',
            'If you were in a movie you wouldn\'t get killed off.',
            'Is it hot in here or is it just you?',
            'Just knowing someone as cool as you will read this makes me smile.',
            'Last night I had the hiccups, and the only thing that comforted me to sleep was repeating your name over and over.',
            'Looking at you makes my foot cramps go away instantaneously.',
            'Me without you is like a nerd without braces, a shoe with out laces, asentencewithoutspaces.',
            'My camera isn\'t worthy to take your picture.',
            'My mom always asks me why I can\'t be more like you.',
            'Nice butt! - According to your toilet seat',
            'Nice work!',
            'Perfume strives to smell like you.',
            'Playing video games with you would be fun.',
            'Point!',
            'Say, aren\'t you that famous model from TV?',
            'Shall I compare thee to a summer\'s day?  Thou art more lovely and more temperate.',
            'Take a break; you\'ve earned it.',
            'The Force is strong with you.',
            'The kid you passed on the street today wants to grow up to be like you.',
            'The only difference between exceptional and amazing is you.',
            'There isn\'t a thing about you that I don\'t like.',
            'There isn\'t a thing about you that I don\'t like.',
            'They should name an ice cream flavor after you.',
            'Treat yourself to another compliment!',
            'Way to go!',
            'Way to help out!',
            'We should start a band.',
            'Well done!',
            'When I grow up, I want to be just like you.',
            'Who has two thumbs and one more point? ' + user + ' does.',
            'With your creative wit, I\'m sure you could come up with better compliments than me.',
            'You are a bucket of awesome.',
            'You are a champ!',
            'You are as fun as a hot tub full of chocolate pudding.',
            'You are better than unicorns and sparkles combined!',
            'You are full of youth.',
            'You are infatuating.',
            'You are like a spring flower; beautiful and vivacious.',
            'You are more fun than a Japanese steakhouse.',
            'You are quite strapping.',
            'You are so charming.',
            'You are the gravy to my mashed potatoes.',
            'You are the star of my daydreams.',
            'You are the sugar on my rice krispies.',
            'You are the watermelon in my fruit salad. Yum!',
            'You are the wind beneath my wings.',
            'You are the world\'s greatest hugger.',
            'You are warmer than a Snuggie.',
            'You are well groomed.',
            'You complete me.',
            'You could invent words and people would use them.',
            'You could probably lead a rebellion.',
            'You could survive a zombie apocalypse.',
            'You deserve a compliment! ',
            'You deserve a promotion.',
            'You don\'t need make-up, make-up needs you.',
            'You get an A+!',
            'You have a good taste in websites.',
            'You have a good web-surfing stance.',
            'You have a perfectly symmetrical face.',
            'You have good taste.',
            'You have perfect bone structure.',
            'You have powerful sweaters.',
            'You have the best laugh ever.',
            'You have the moves like Jagger.',
            'You intrigue me.',
            'You listen to the coolest music.',
            'You look better whether the lights are on or off.',
            'You look like you like to rock.',
            'You look so perfect.',
            'You make babies smile.',
            'You make me :)',
            'You make me feel like I am on top of the world.',
            'You make me think of beautiful things, like strawberries.',
            'You make me want to be the person I am capable of being.',
            'You make me want to frolic in a field.',
            'You make my data circuits skip a beat.',
            'You make the gloomy days a little less gloomy.',
            'You pick the best radio stations when you\'re riding shotgun.',
            'You should be a poster child for poster children.',
            'You should try out for everything.',
            'You smell nice.',
            'You will still be beautiful when you get older.',
            'You\'re #1 in my book!',
            'You\'re a beautiful person!',
            'You\'re a tall glass of water!',
            'You\'re cooler than ice on the rocks.',
            'You\'re cooler than ice-skating Fonzi.',
            'You\'re invited to my birthday party.',
            'You\'re more cuddly than the Downy Bear.',
            'You\'re more fun than a barrel of monkeys.',
            'You\'re more fun than bubble wrap.',
            'You\'re nicer than a day on the beach.',
            'You\'re pretty groovy, dude.',
            'You\'re pretty high on my list of people with whom I would want to be stranded on an island.',
            'You\'re real happening in a far out way.',
            'You\'re so beautiful, you make me walk into things when I look at you.',
            'You\'re so cool, that on a scale of from 1-2, you\'re elevendyseven.',
            'You\'re so hot that you denature my proteins.',
            'You\'re so rad.',
            'You\'re so smart!',
            'You\'re spontaneous, and I love it!',
            'You\'re sweeter than than a bucket of bon-bons!',
            'You\'re the bee\'s knees.',
            'You\'re the bee\'s knees.',
            'You\'re the salsa to my tortilla chips. You spice up my life!',
            'You\'re tremendous!',
            'Your cousins refer to you as \'the cool cousin\'.',
            'Your every thought and motion contributes to the beauty of the universe.',
            'Your eyebrows really make your pretty eyes stand out.',
            'Your glass is the fullest.',
            'Your life is so interesting!',
            'Your mind is a maze of amazing!',
            'Your mouse told me that you have very soft hands.',
            'Your pet loves you too much to ever run away.',
            'Your prom date still thinks about you all the time.',
            'Your skin is radiant.',
            'Your smile makes me smile.',
            'Can you teach me how to be as awesome as you?',
            'Don\'t worry about anything in life. You\'ll do great.',
            'You are more fun than a Japanese steakhouse.',
            'You are the rare catalyst to my volatile compound.'
        ];
        responses = responses.map(function (compliment) {
            return compliment + ' ' + user + ' (' + points + ' points)';
        });
        return responses;
    } catch (e) {
        console.error(e);
    }
}


module.exports = {
    command: function (bot, msg) {
        var phrase = '++';
        if (msg.author.bot === false) {
            var regex = /(([^\s])+|([^\s])+(\s)+)((\+){2})/gmi;
            var m;
            while ((m = regex.exec(msg.content)) !== null) {
                if (msg.channel.name) {
                    // This is necessary to avoid infinite loops with zero-width matches
                    if (m.index === regex.lastIndex) {
                        regex.lastIndex++;
                    }
                    // The result can be accessed through the `m`-variable.
                    m.forEach(function (match, groupIndex) {
                        if (groupIndex === 0) {
                            var thing = match.replace(/(\+)+/gmi, '').trim();
                            var thingName = thing;
                            if (thing.indexOf('<@') >= 0) {
                                var userregex = /(\<\@\!)(\d+)(\>)/gm;
                                var subst = `$2`;
                                thingName = thingName.replace(userregex, subst);
                                msg.mentions.members.forEach(function (member) {
                                    if (thingName == member.user.id) {
                                        thingName = member.user.username;
                                    }
                                });
                            }
                            
                          MongoClient.connect(mongoURI, {
                                useNewUrlParser: true
                            }, function (err, client) {
                                if (err) console.error(err);
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

                                db.collection('points').findOne(queryObj, function (err, result) {
                                    if (result) {
                                        if (result.thing != '<@!' + msg.author.id + '>') {
                                            result.points = parseInt(result.points, 10) + 1;
                                            result.name = thingName.toLowerCase();
                                            result.display = thingName;
                                            db.collection('points').updateOne(queryObj, {
                                                $set: result
                                            },
                                                function (err, writeResult) {
                                                    if (err) {
                                                        console.error(err);
                                                    }
                                                    client.close();
                                                    var message = rand(compliments(thing, result.points));
                                                    msg.channel.send(message);
                                                    msg.react('💯');
                                                });
                                        } else {
                                            var message = 'You cant give points to yourself';
                                            msg.channel.send(message);
                                        }
                                    } else {
                                        var myObj = {
                                            thing: thing,
                                            name: thingName.toLowerCase(),
                                            display: thingName,
                                            points: 1
                                        };
                                        db.collection('points').insertOne(myObj, function (err, res) {
                                            if (err) {
                                                console.error(err);
                                            }
                                            var message = rand(compliments(thing, 1));
                                            msg.channel.send(message);
                                            msg.react('💯');
                                            client.close();
                                        });
                                    }
                                });
                            });
                        }
                    });
                }
                if (!msg.channel.name) {
                    msg.channel.send('I can\'t give points in PMs');
                }
            }
        }
    },
    help: '` ++ string` Give points away'
};
