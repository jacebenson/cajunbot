$(function() {
  var scores = [];
function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}
  $.getJSON(
    "./scores",
    function(data) {
      data = data.sort(dynamicSort("-points"))
      console.log(data);
      data.forEach(function(thing, index){
        
      $("#socreboard tbody").append(
          "<tr>"+
          "  <td>" + (index + 1) +
          "  </td>" + 
          "  <td>" + thing.display +
          "  </td>"+
          "  <td>" + thing.points +
          "  </td>" +
          "</tr>"
        );
      });
    }
  );
});