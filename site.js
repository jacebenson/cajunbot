module.exports = (function () {
  var port = process.env.PORT || 80;
  var translate = require('moji-translate');
  var MongoClient = require('mongodb').MongoClient;
  var mongoURI = process.env.MONGODB_URI; // || require('./.env').uri;
  var express = require("express");
  var app = express();
  app.use(express.static('public')); //use static files in ROOT/public folder
  app.get("/discord", function (request, response) {
    response.sendFile(__dirname + '/public/index.html');
  });
  app.get("/discord/install", function (request, response) {
    response.redirect('https://discordapp.com/oauth2/authorize?&client_id=' + process.env.DISCORD_CLIENT_ID + '&scope=bot&permissions=0');
  });
  app.get("/discord/emoji", function (request, response) {
    console.log(request.query.text);
    response.set('Content-Type', 'application/json');
    response.send(JSON.stringify({text:translate.translate(request.query.text)}));
    //response.redirect('https://discordapp.com/oauth2/authorize?&client_id=' + process.env.DISCORD_CLIENT_ID + '&scope=bot&permissions=0');
  });
  app.get("/discord/scores", function (request, response) {
    MongoClient.connect(mongoURI, function (err, client) {
      console.log('connected to mongo');
      if (err) console.log(err);
      var db = client.db('cajonbot');
      // look for user in db
      db.collection('points').find({}).toArray(function (err, result) {
        response.send(result);
      });
    });
  });
  var listener = app.listen(port, function () {
    console.log('Your app is listening on port ' + listener.address().port);
  });
  return app;
})();
