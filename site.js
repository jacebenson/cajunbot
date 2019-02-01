module.exports = (function(){
  var express = require("express");
  var app = express();
  app.use(express.static('public')); //use static files in ROOT/public folder

  app.get("/", function (request, response) {
    response.sendFile(__dirname + '/public/index.html');
  });

  var listener = app.listen(process.env.PORT, function () {
    console.log('Your app is listening on port ' + listener.address().port);
  });
  
})();