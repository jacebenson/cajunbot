var Chance = require('chance');
// Instantiate Chance so it can be used
var chance = new Chance();
module.exports = {
    command: function(bot, msg) {
        try{
        var phrase = '!job';
        if (msg.author.bot === false) {
            var wordsArr = msg.content.split(' ');
            wordsArr.map(function(word, index) {
                if (word.toLowerCase() === phrase) {

                    var message = [];
                    var parts = {};
                    parts.dip = {};
                    parts.dip.day = chance.pickone([
                        'hows',
                        'would you have time on',
                    ]);
                    parts.dip.suggest = chance.pickone([
                        'How about we',
                        'Lets'
                    ]);
                    parts.dip.to_chat = chance.pickone([
                        'and talk further',
                        'and chat some more',
                        'to discuss'
                    ]);
                    parts.dip.way = chance.pickone([
                        'hop on the phone',
                        'grab coffee'
                    ]);
                    parts.flatter = {};
                    parts.flatter.role = chance.pickone([
                        'Architect',
                        'Lead Developer',
                        'System Administrator',
                        '${job_title}',
                        'Implementation Specialist',
                        'Senior Developer over the other Senior Developer',
                        'Developer, full-stack',
                        'Developer, back-end',
                        'Developer, front-end',
                        'Developer, desktop or enterprise applications',
                        'Developer, mobile',
                        'Database administrator',
                        'Designer',
                        'System administrator',
                        'DevOps specialist',
                        'Developer, embedded applications or devices',
                        'Data scientist or machine learning specialist',
                        'Developer, QA or test',
                        'Data or business analyst',
                        'Academic researcher',
                        'Engineer, data',
                        'Educator',
                        'Developer, game or graphics',
                        'Engineering manager',
                        'Product manager',
                        'Scientist',
                        'Engineer, site reliability',
                    ]);
                    parts.flatter.skills = chance.pickset([
                        'jQuery',
                        'HTML',
                        'AJAX',
                        'AngularJS',
                        'JavaScript',
                        'CSS',
                        'Bootstrap',
                        'Angular/Angular.js',
                        'React.js',
                        'ASP.NET',
                        'Express',
                        'Spring',
                        'Vue.js',
                        'Django',
                        'Flask',
                        'Laravel',
                        'Ruby on Rails',
                        'Drupal',
                        'ITAM',
                        'ITIL',
                        'Agile Development',
                        'ITBM',
                        'SecOps',
                        'ITOM',
                        'CSM',
                        'ITSM'], 2);
                    parts.flatter.start = chance.pickone([
                        'With your considerable talents in',
                        'Based on your impressive skills with',
                        'Given your extensive experience in',
                        'Amazed by your knowledge of'
                    ]);
                    parts.flatter.suggest = chance.pickone([
                        'we thing you should join our stellar team as its',
                        'I think youd be a great fit for our',
                        'lets discuss your potiental future as our team\'s',
                        'I think youd make an incredible addition to our team as its'
                    ]);
                    parts.greet = {};
                    parts.greet.adjective = chance.pickone([
                        'a super',
                        'an awesome',
                        'a fantastic'
                    ]);
                    parts.greet.day = chance.pickone([
                        'weekend!',
                        chance.weekday({weekday_only: true}) + '!',
                        'day!'
                    ]);
                    parts.greet.end = chance.pickone([
                        'Super-pumped to meet you!',
                        'So awesome to e-meet you!'
                    ]);
                    parts.intro = {};
                    parts.intro.adjective = chance.pickone([
                        'de-centralized',
                        'sharing economy-inspired',
                        'deep learning-powered',
                        'AI-infused',
                        'blockchain-enabled',
                        'scalable'
                    ]);
                    parts.intro.change = chance.pickone([
                        'to re-design the boundaries of',
                        'to design the future of',
                        'to change the world of',
                        'to push the limits of'
                    ]);
                    parts.intro.company = chance.pickone([
                        'company',
                        'startup',
                        'employer'
                    ]);
                    parts.intro.company_flair = chance.pickone([
                        'Atom',
                        'Waste',
                        'Deep',
                        'Box',
                        'Xyz',
                        'Square',
                        'Garbage'
                    ]);
                    parts.intro.company_suffix = chance.pickone([
                        'Box',
                        'Cube',
                        '.ai',
                        'able'
                    ]);
                    parts.intro.funds = chance.pickone([
                        'millions',
                        '$600k on KickStarter',
                        '$50M in our series C',
                        '$1M in our seed round',
                        '103 DogeCoin',
                        '$10M in our series F',
                        '50 gold doubloons',
                        '4 million garlic coins',
                        '660 $100 Amazon gift cards',
                        '500 Points Thing points'
                    ]);
                    parts.intro.impact = chance.pickone([
                        'help desks',
                        'scoped apps',
                        'IT for IT',
                        'cloud services',
                        'integrations',
                        'hangover cures',
                        'human resources',
                        'using memes in the workplace'
                    ]);
                    parts.signature = chance.pickone([
                        'Regards,\n',
                        'Thanks! I look forward to hearing from you.\n',
                        'Let me know what you think, Thanks ' + msg.author,
                        'If interested, please reply back with an updated resume, and the best time for us to speak – I look forward to your reply!',
                        'I look forward to hearing from you. Have a great day!',
                        'Any help would be greatly appreciated. Have a great day!',
                        'Thanks so much!',
                        'Kind regards,'
                    ]);

                    if (Math.random() > 0.5) {
                        message.push('Hope you\'re having');
                        message.push(parts.greet.adjective);
                        message.push(parts.greet.day);
                    }
                    message.push(parts.greet.end);
                    message.push('My');
                    message.push(parts.intro.company);
                    message.push(parts.intro.company_flair + parts.intro.company_suffix + ', a');
                    message.push(parts.intro.adjective);
                    message.push(chance.company() + ', has just raised');
                    message.push(parts.intro.funds);
                    message.push(parts.intro.change);
                    message.push(parts.intro.impact + '.\n\n');
                    message.push(parts.flatter.start);
                    message.push(parts.flatter.skills.join(' and ') + ', ');
                    message.push(parts.flatter.suggest);
                    message.push(parts.flatter.role + '.  ');
                    message.push(parts.dip.suggest);
                    message.push(parts.dip.way);
                    message.push(parts.dip.to_chat + '—');
                    message.push(parts.dip.day);
                    message.push(chance.weekday({weekday_only: true}) + '?\n\n');
                    message.push(parts.signature + '\n');
                    //message.push(chance.first({ nationality: 'us' }));
                    message.push(chance.first());
                    var message = message.join(' ');
                    msg.channel.send(message);
                }
            });
        }
        } catch(e){
        console.log(e);
        }
    },
    help: '`!job` Creates a random message a SN Dev may receive from a recruiter.'
};
