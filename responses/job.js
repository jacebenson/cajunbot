module.exports = {
    command: function(bot, msg) {
        var phrase = '!job';
        if (msg.author.bot === false) {
            var wordsArr = msg.content.split(' ');
            wordsArr.map(function(word, index) {
                if (word.toLowerCase() === phrase) {

                    var message = [];
                    var parts = {};
                    parts.clown = {};
                    parts.clown.name = [
                        '${recruiter_name}',
                        'Christine',
                        'Jane',
                        'Kimberly',
                        'Matt',
                        'Todd',
                    ];
                    parts.clown.signature = [
                        'Best,',
                        'Cheers,',
                        'Have a good one!',
                        'Regards,'
                    ];
                    parts.dip = {};
                    parts.dip.day = [
                        'hows',
                        'would you have time on',
                    ];
                    parts.dip.suggest = [
                        'How about we',
                        'Lets'
                    ];
                    parts.dip.time = [
                        'Monday',
                        'Tuesday',
                        'Wednesday',
                        'Thursday',
                        'Friday',
                    ];
                    parts.dip.to_chat = [
                        'and talk further',
                        'and chat some more',
                        'to discuss'
                    ];
                    parts.dip.way = [
                        'hop on the phone',
                        'grab coffee'
                    ];
                    parts.flatter = {};
                    parts.flatter.role = [
                        'Architect',
                        'Lead Developer',
                        'System Administrator',
                        '${job_title}',
                        'Implementation Specialist',
                        'Senior Developer over the other Senior Developer'
                    ];
                    parts.flatter.skill_one = [
                        'jQuery',
                        'HTML',
                        'AJAX',
                        'AngularJS',
                        'JavaScript',
                        'CSS',
                        'Bootstrap'
                    ];
                    parts.flatter.skill_two = [
                        'ITAM',
                        'ITIL',
                        'Agile Development',
                        'ITBM',
                        'SecOps',
                        'ITOM',
                        'CSM',
                        'ITSM'
                    ];
                    parts.flatter.start = [
                        'With your considerable talents in',
                        'Based on your impressive skills with',
                        'Given your extensive experience in',
                        'Amazed by your knowledge of'
                    ];
                    parts.flatter.suggest = [
                        'we thing you should join our stellar team as its',
                        'I think youd be a great fit for our',
                        'lets discuss your potiental future as our team\'s',
                        'I think youd make an incredible addition to our team as its'
                    ];
                    parts.greet = {};
                    parts.greet.adjective = [
                        'a super',
                        'an awesome',
                        'a fantastic'
                    ];
                    parts.greet.day = [
                        'weekend!',
                        'Monday!',
                        'day!'
                    ];
                    parts.greet.end = [
                        'Super-pumped to meet you!',
                        'So awesome to e-meet you!'
                    ];
                    parts.intro = {};
                    parts.intro.adjective = [
                        'de-centralized',
                        'sharing economy-inspired',
                        'deep learning-powered',
                        'AI-infused',
                        'blockchain-enabled',
                        'scalable'
                    ];
                    parts.intro.change = [
                        'to re-design the boundaries of',
                        'to design the future of',
                        'to change the world of',
                        'to push the limits of'
                    ];
                    parts.intro.company = [
                        'company',
                        'startup',
                        'employer'
                    ];
                    parts.intro.company_flair = [
                        'Atom',
                        'Waste',
                        'Deep',
                        'Box',
                        'Xyz',
                        'Square',
                        'Garbage'
                    ];
                    parts.intro.company_suffix = [
                        'Box',
                        'Cube',
                        '.ai',
                        'able'
                    ];
                    parts.intro.example = [
                        'Pets.com',
                        'Enron',
                        'Zenefits',
                        'Theranos',
                        'Lehman Brothers',
                        'Juicero'

                    ];
                    parts.intro.funds = [
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
                    ];
                    parts.intro.impact = [
                        'help desks',
                        'scoped apps',
                        'IT for IT',
                        'cloud services',
                        'integrations',
                        'hangover cures',
                        'human resources',
                        'using memes in the workplace'
                    ];

                    if (Math.random() > 0.5) {
                        message.push('Hope you\'re having');
                        message.push(rand(parts.greet.adjective));
                        message.push(rand(parts.greet.day));
                    }
                    message.push(rand(parts.greet.end));
                    message.push('My');
                    message.push(rand(parts.intro.company));
                    message.push(rand(parts.intro.company_flair) + rand(parts.intro.company_suffix) + ', a');
                    message.push(rand(parts.intro.adjective));
                    message.push(rand(parts.intro.example) + ', has just raised');
                    message.push(rand(parts.intro.funds));
                    message.push(rand(parts.intro.change));
                    message.push(rand(parts.intro.impact) + '.\n\n');
                    message.push(rand(parts.flatter.start));
                    message.push(rand(parts.flatter.skill_one) + ' and');
                    message.push(rand(parts.flatter.skill_two) + ',');
                    message.push(rand(parts.flatter.suggest));
                    message.push(rand(parts.flatter.role) + '.');
                    message.push(rand(parts.dip.suggest));
                    message.push(rand(parts.dip.way));
                    message.push(rand(parts.dip.to_chat) + '—');
                    message.push(rand(parts.dip.day));
                    message.push(rand(parts.dip.time) + '?\n\n');
                    message.push(rand(parts.clown.signature) + '\n');
                    message.push(rand(parts.clown.name));
                    var message = message.join(' ');
                    msg.channel.send(message);
                }
            });
        }
    },
    help: '`!job` Creates a random message a SN Dev may receive from a recruiter.'
};

var rand = function(arr) {
    //console.log('in random.');
    var random_choice = Math.floor(Math.random() * arr.length);
    return arr[random_choice];
}