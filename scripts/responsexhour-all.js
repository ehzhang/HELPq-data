(function (datasets) {

  var ctx = document.getElementById('responsexhour-all').getContext('2d');

  var labels = '12am,1am,2am,3am,4am,5am,6am,7am,8am,9am,10am,11am,12pm,1pm,2pm,3pm,4pm,5pm,6pm,7pm,8pm,9pm,10pm,11pm'.split(',');

  var set = {
    name: 'Overall',
    color: 'rgba(52, 152, 219,X)',
    data: datasets.reduce(function(prev, next){
      return prev.concat(next.data);
    },[])
  };

  var hours = set.data
    .filter(function(point){
      return point.claimTime;
    })
    .map(function(point){
      return {
        hour: (new Date(point.timestamp)).getHours(),
        responseTime: point.claimTime - point.timestamp
      };
    });

  var hourData = [];
  for (var i = 0; i < 24; i++){
    hourData.push(
      stats.mean(
        hours.filter(function(hour){
          return hour.hour == i && hour.responseTime < 3600000;
        })
        .map(function(hour){
          return hour.responseTime / (1000 * 60);
        })
      ).toPrecision(2)
    );
  };

  var d = {
    label: set.name,
    data: hourData,
    fillColor: set.color.replace('X', '.2'),
    strokeColor: set.color.replace('X', '1'),
    pointColor: set.color.replace('X', '1'),
    pointStrokeColor: "#fff",
    pointHighlightFill: "#fff",
  };

  var data = {
    labels: labels,
    datasets: [d]
  };

  var chart = new Chart(ctx).Line(data);

})([
  // {name: 'Blueprint 2015', data: data_blueprint2015, color: 'rgba(52, 152, 219,X)'},
  {name: 'Meteor Summer 2015', data: data_helpq2015, color: 'rgba(52, 73, 94,X)'},
  {name: 'HackMIT 2015', data: data_hackq2015, color: 'rgba(155, 89, 182,X)'},
  {name: 'WHACK 2015', data: data_whack2015, color: 'rgba(22, 160, 133,X)'},
]);