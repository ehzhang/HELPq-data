(function (datasets) {

  var ctx = document.getElementById('responsexhour-all').getContext('2d');

  var set = {
    name: 'Overall',
    color: 'rgba(52, 152, 219,X)',
    data: datasets.reduce(function(prev, next){
      return prev.concat(next.data);
    },[])
  };

  var abandoned = set.data.filter(function(d){
    return d.status != 'CANCELLED' && (d.status == 'EXPIRED' || !d.claimTime || !d.completeTime);
  });

  document.getElementById('abandoned-count').innerHTML = abandoned.length;

  var stopWords = {};
  'help,need,up,+,/,(,),-,I,a,able,about,across,after,all,almost,also,am,among,an,and,any,are,as,at,be,because,been,but,by,can,cannot,could,dear,did,do,does,either,else,ever,every,for,from,get,got,had,has,have,he,her,hers,him,his,how,however,i,if,in,into,is,it,its,just,least,let,like,likely,may,me,might,most,must,my,neither,no,nor,not,of,off,often,on,only,or,other,our,own,rather,said,say,says,she,should,since,so,some,than,that,the,their,them,then,there,these,they,this,tis,to,too,twas,us,wants,was,we,were,what,when,where,which,while,who,whom,why,will,with,would,yet,you,your'
    .split(',')
    .forEach(function(word){
      stopWords[word] = true;
    });

  var wordFreq = {};

  abandoned
    .forEach(function(d){
      var words = d.topic.split(/[ ,.!?;:]/ig);
      words.forEach(function(word){
        var w = word.toLowerCase();
        if (!stopWords[w] && w.length > 0) {
          if (!wordFreq[w]) {
            wordFreq[w] = 0;
          }

          wordFreq[w] += 1;
        }
      });
    });

  var data = Object.keys(wordFreq).map(function(key){
    return {
      word: key,
      count: wordFreq[key],
    };
  });

  data.sort(function(a, b){
    return b.count - a.count;
  });

  data.splice(0,10).forEach(function(d){

    var n = document.createElement('li');
    n.innerHTML = '<b>'+ d.word + '</b>: ' + d.count;

    document
      .getElementById('abandoned-topics')
      .appendChild(n);
  });

})([
  {name: 'Blueprint 2015', data: data_blueprint2015, color: 'rgba(52, 152, 219,X)'},
  {name: 'Meteor Summer 2015', data: data_helpq2015, color: 'rgba(52, 73, 94,X)'},
  {name: 'HackMIT 2015', data: data_hackq2015, color: 'rgba(155, 89, 182,X)'},
  {name: 'WHACK 2015', data: data_whack2015, color: 'rgba(22, 160, 133,X)'},
]);