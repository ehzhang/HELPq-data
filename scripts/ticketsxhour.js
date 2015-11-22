(function (datasets) {

  var ctx = document.getElementById('ticketsxhour').getContext('2d');

  var labels = '12am,1am,2am,3am,4am,5am,6am,7am,8am,9am,10am,11am,12pm,1pm,2pm,3pm,4pm,5pm,6pm,7pm,8pm,9pm,10pm,11pm'.split(',');

  var sets = [];

  datasets.forEach(function(set){

    var hours = set.data.map(function(point){
      return (new Date(point.timestamp)).getHours();
    });

    var data = [];
    for (var i = 0; i < 24; i++){
      data.push((hours.filter(function(h){
        return h == i;
      }).length / hours.length * 100).toPrecision(2));
    }

    var d = {
      label: set.name,
      data: data,
      fillColor: set.color.replace('X', '.2'),
      strokeColor: set.color.replace('X', '1'),
      pointColor: set.color.replace('X', '1'),
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
    };

    sets.push(d);
  });

  var data = {
    labels: labels,
    datasets: sets
  };

  var chart = new Chart(ctx).Line(data);

})([
  {name: 'Blueprint 2015', data: data_blueprint2015, color: 'rgba(52, 152, 219,X)'},
  {name: 'Meteor Summer 2015', data: data_helpq2015, color: 'rgba(52, 73, 94,X)'},
  {name: 'HackMIT 2015', data: data_hackq2015, color: 'rgba(155, 89, 182,X)'},
  {name: 'WHACK 2015', data: data_whack2015, color: 'rgba(22, 160, 133,X)'},
]);