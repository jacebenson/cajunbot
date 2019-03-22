$(function () {
  var scores = [];

  function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    }
  }
  window.page = 0;
  window.scores = [];
  window.getScores = function(){
    window.html = [];
  
    $.getJSON(
      "./discord/scores",
      function (data) {
        data = data.sort(dynamicSort("-points"))
        window.scores = data;
        console.log(data);
        var pagesize = 5;
        data.forEach(function (thing, index) {
          //console.log(index + '/' + pagesize);
          if(parseInt(index+pagesize,10)<parseInt(window.page,10)){
          window.html.push('<li>');
          window.html.push('<mark>' + thing.display + '</mark>');
          window.html.push('<small>' + thing.points + '</small>');
          window.html.push('</li>');
        }
        if(index === pagesize ){
          window.html.push('<button onclick="window.getScores()" >next</button>')
        }
        });
      }
    ).then(function(){
      window.page += 5;
      $("#list").html(window.html.join('\n'));
    });
  }
  
  window.getScores(page);
  var backgrounds = [
    'https://media.giphy.com/media/vvbGMpbhZMcHSsD50w/giphy.gif', //napoleon dynomite
    'https://media.giphy.com/media/mp1JYId8n0t3y/giphy.gif', //the office
    'https://media.giphy.com/media/5GoVLqeAOo6PK/giphy.gif', //happy jonah hill
    'https://media.giphy.com/media/Is1O1TWV0LEJi/giphy.gif', //the office raise the roof
    'https://media.giphy.com/media/t3Mzdx0SA3Eis/giphy.gif', //the office yes w/pen
  ]; $('body').css({
    'background-image': 'url(' + backgrounds[Math.floor(Math.random() * backgrounds.length)] + ')'
  });
});
