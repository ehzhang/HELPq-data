(function (datasets) {

  var ctx = document.getElementById('powermentors').getContext('2d');

  var sets = [];

  datasets.forEach(function(set){

    var mentors = {};

    var completedCount = set.data.filter(function(d){
      return d.status == 'COMPLETE';
    }).length;

    set.data
      .filter(function(d){
        return d.claimTime && d.status == 'COMPLETE' && d.rating >= 4;
      })
      .forEach(function(d){
        var id = d.claimId;
        if (!mentors[id]) {
          mentors[id] = {
            count: 0,
            responseTimes: []
          };
        }

        mentors[id].count += 1;
        mentors[id].responseTimes.push(d.claimTime - d.timestamp);
    });

    var d = {
      label: set.name,
      strokeColor: set.color.replace('X', '1'),
      pointColor: set.color.replace('X', '.7'),
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      data: Object.keys(mentors)
        .map(function(key){
          // Statistical outliers
          if (mentors[key].count > 50 || stats.mean(mentors[key].responseTimes) / 60000 > 30) {
            return {
              x: 0,
              y: 0,
              r: 0.00000001
            };
          }
          return {
            x: mentors[key].count,
            // x: ((mentors[key].count / completedCount) * 100).toPrecision(2),
            y: stats.mean(mentors[key].responseTimes) / 60000,
            // r: (mentors[key].count) / 2
            r: 2.5
          };
        })
    };

    sets.push(d);
  });

  var data = {
    datasets: sets
  };

  var chart = new Chart(ctx).Scatter(data, {
    datasetStroke: false
  });

})([
  {name: 'Blueprint 2015', data: data_blueprint2015, color: 'rgba(52, 152, 219,X)'},
  {name: 'Meteor Summer 2015', data: data_helpq2015, color: 'rgba(52, 73, 94,X)'},
  {name: 'HackMIT 2015', data: data_hackq2015, color: 'rgba(155, 89, 182,X)'},
  {name: 'WHACK 2015', data: data_whack2015, color: 'rgba(22, 160, 133,X)'},
]);
