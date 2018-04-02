var friendsData = require("../data/friends");

module.exports = function(app){
  app.get("/api/friends", function(req, res){
    res.json(friendsData);
  });

  app.post("/api/friends", function(req, res){
    var s = req.body.scores;
    var matchScoresArr = [];

    req.body.scores = s.map((val, i, s) => {
      return parseInt(val);
    });

    friendsData.forEach(function(answer){
      var userScores = answer.scores;
      var result = userScores.map(function (num, index){
        return Math.abs(num - req.body.scores[index]);
      });

      var diffScore = result.reduce((accumulator, currentValue) => accumulator + currentValue);

      matchScoresArr.push(diffScore);
    });

    var bestMatch = matchScoresArr.reduce((a,b) => Math.min(a,b));
    var friendIndex = matchScoresArr.indexOf(bestMatch);
    var friendMatch = friendsData[friendIndex];

    friendsData.push(req.body);
    res.json(friendMatch);

  });
}
