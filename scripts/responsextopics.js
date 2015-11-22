(function (datasets) {

  var ctx = document.getElementById('ratingsxhour-all').getContext('2d');

  var set = {
    data: datasets.reduce(function(prev, next){
      return prev.concat(next.data);
    },[])
  };

  var stopWords = {};
  '+,/,(,),-,I,a,able,about,across,after,all,almost,also,am,among,an,and,any,are,as,at,be,because,been,but,by,can,cannot,could,dear,did,do,does,either,else,ever,every,for,from,get,got,had,has,have,he,her,hers,him,his,how,however,i,if,in,into,is,it,its,just,least,let,like,likely,may,me,might,most,must,my,neither,no,nor,not,of,off,often,on,only,or,other,our,own,rather,said,say,says,she,should,since,so,some,than,that,the,their,them,then,there,these,they,this,tis,to,too,twas,us,wants,was,we,were,what,when,where,which,while,who,whom,why,will,with,would,yet,you,your'
    .split(',')
    .forEach(function(word){
      stopWords[word] = true;
    });

  var wordFreq = {};

  set.data
    .filter(function(d){
      return d.claimTime;
    })
    .forEach(function(d){
      var words = d.topic.split(/[ ,.!?;:]/ig);
      words.forEach(function(word){
        var w = word.toLowerCase();
        if (!stopWords[w] && w.length > 0) {
          if (!wordFreq[w]) {
            wordFreq[w] = {
              count: 0,
              responseTimes: []
            };
          }

          wordFreq[w].count += 1;
          wordFreq[w].responseTimes.push(d.claimTime - d.timestamp);
        }
      });
    });

  var data = Object.keys(wordFreq).map(function(key){
    return {
      word: key,
      count: wordFreq[key].count,
      meanResponse: (stats
        .mean(wordFreq[key]
        .responseTimes) / (60 * 1000)).toPrecision(3)
    };
  });

  data.sort(function(a, b){
    return b.count - a.count;
  });

  var data20 = data.slice(0, 20);

  data20.forEach(function(d){

    var n = document.createElement('li');
    n.innerHTML = '<b>'+ d.word + '</b>: ' + d.count;

    document
      .getElementById('responsesxtopics')
      .appendChild(n);
  });

  data20.sort(function(a, b){
    return a.meanResponse - b.meanResponse;
  });

  data20.forEach(function(d){

    var n = document.createElement('li');
    n.innerHTML = '<b>'+ d.word + '</b>: '+ d.meanResponse + ' minutes';

    document
      .getElementById('responsesxtopics-time')
      .appendChild(n);
  });

  var setFreq = {};
  var data200 = data.slice(0, 100);

  set.data
    .filter(function(d){
      return d.claimTime;
    })
    .forEach(function(d){
    var topic = d.topic.toLowerCase();
    topic = topic.split(/[ ,.!?;:]/ig);
    var wordIndex = 1;
    data200
      .map(function(w){return w.word; })
      .forEach(function(word1){
        for (var i = wordIndex; i < data200.length; i++) {
          var word2 = data200[i].word;
          if (word1.indexOf(word2) < 0 && word2.indexOf(word1) < 0) {
            if (topic.indexOf(word1) > -1 && topic.indexOf(word2) > -1) {
              var key = word1 + ' ' + word2;
              if (!setFreq[key]) {
                setFreq[key] = {
                  count: 0,
                  responseTimes: []
                };
              }
              setFreq[key].count += 1;
              setFreq[key].responseTimes.push(d.claimTime - d.timestamp);
            }
          }
        }
        wordIndex++;
    });
  });

  var dataWordSets = Object.keys(setFreq).map(function(key){
    return {
      word: key,
      count: setFreq[key].count,
      meanResponse: (stats
        .mean(setFreq[key]
        .responseTimes) / (60 * 1000)).toPrecision(3)
    };
  });

  dataWordSets.sort(function(a, b){
    return b.count - a.count;
  });

  var dataWordSetsTop20 = dataWordSets.slice(0, 20);

  dataWordSetsTop20.forEach(function(d){

    var n = document.createElement('li');
    n.innerHTML = '<b>'+ d.word + '</b>: '+ d.count;

    document
      .getElementById('responsetopicsets')
      .appendChild(n);
  });

  dataWordSetsTop20.sort(function(a, b){
    return a.meanResponse - b.meanResponse;
  });

  dataWordSetsTop20.forEach(function(d){

    var n = document.createElement('li');
    n.innerHTML = '<b>'+ d.word + '</b>: '+ d.meanResponse + ' minutes';

    document
      .getElementById('responsetopicsets-time')
      .appendChild(n);

  });

})([
  {name: 'Blueprint 2015', data: data_blueprint2015, color: 'rgba(52, 152, 219,X)'},
  {name: 'Meteor Summer 2015', data: data_helpq2015, color: 'rgba(52, 73, 94,X)'},
  {name: 'HackMIT 2015', data: data_hackq2015, color: 'rgba(155, 89, 182,X)'},
  {name: 'WHACK 2015', data: data_whack2015, color: 'rgba(22, 160, 133,X)'},
]);
