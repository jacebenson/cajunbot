var MongoClient = require('mongodb').MongoClient;
//var mongoURI = process.env.MONGOLAB_URI; // || require('./.env').uri;
var mongoURI = process.env.MONGODB_URI;

function upsertPoint(term, bot, msg) {
    // replace the uri string with your connection string.
    MongoClient.connect(mongoURI, { useNewUrlParser: true }, function(err, client) {
        if (err) {
            console.log('Error occurred while connecting to MongoDB Atlas...\n', err);
        } else {
            console.log('Connected...');
            var collection = client.db("cajonbot").collection("points");
            // perform actions on the collection object
            //console.log(collection);//
          var queryObj = {
                  $or: [{
                      "thing": term
                  }, {
                      "name": term.toLowerCase()
                  }]
              }
            collection.findOne(queryObj, function(err, result) {
                if (result) {
                  result.points = parseInt(result.points, 10) + 1;
                        collection.updateOne(queryObj, {
                            $set: result
                        }, function(err, writeResult) {
                            if (err) {
                                console.log(err);
                            }
                            client.close();
                            // console.log('Updating points: ' + thing);
                            var message = '...';
                            // console.log(message);
                            bot.createMessage(msg.channel.id, message);
                            msg.addReaction('💯');
                          
            client.close();
                        });
                    } else {
                        var myObj = {
                            thing: term,
                            name: term.toLowerCase(),
                            display: term,
                            points: 1
                        };
                        collection.insertOne(myObj, function(err, res) {
                            if (err) {
                                console.log(err);
                            }
                            // console.log('Inserting points: ' + thing);
                            var message = '...added it...';
                            bot.createMessage(msg.channel.id, message);
                            msg.addReaction('💯');
                          
            client.close();
                        });
                    }
            });
        }
    });
}
module.exports = {
    command: function(bot, msg) {
        var phrase = '!db';
        if (msg.author.bot === false) {
            var wordsArr = msg.content.split(' ');
            wordsArr.map(function(word, index) {
                if (word.toLowerCase() === phrase) {
                    var term = wordsArr[index + 1];
                    var message = 'Connecting to ' + term;
                    upsertPoint(term, bot, msg);
                    bot.createMessage(msg.channel.id, message);
                }
            });
        }
    },
    help: '`!db` TEST DB styff'
};

/*
  MongoClient.connect(mongoURI, {
                useNewUrlParser: true
            }, function(err, client) {
                //console.log('connected to mongo');
                if (err) console.log(err);
              console.log(client);
                var db = client.db('cajonbot');
                // look for user in db
                //var queryObj = {'thing': thing};
                //{$or:[{"groupA":data},{"groupB":data}]}
                var queryObj = {};
                db.collection('points').findOne(queryObj, function(err, result) {
                    if (result) {
                        db.collection('points').updateOne(queryObj, {
                            $set: result
                        }, function(err, writeResult) {
                            if (err) {
                                console.log(err);
                            }
                            client.close();
                            // console.log('Updating points: ' + thing);
                            var message = '...';
                            // console.log(message);
                            bot.createMessage(msg.channel.id, message);
                            msg.addReaction('💯');
                        });
                    } else {
                        var myObj = {
                            thing: '...',
                            name: '...'.toLowerCase(),
                            display: '...',
                            points: 1
                        };
                        db.collection('points').insertOne(myObj, function(err, res) {
                            if (err) {
                                console.log(err);
                            }
                            // console.log('Inserting points: ' + thing);
                            var message = '...added it...';
                            bot.createMessage(msg.channel.id, message);
                            msg.addReaction('💯');
                            client.close();
                        });
                    }
                });
            });
  */