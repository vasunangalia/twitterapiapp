var express = require("express");
var router = express.Router();
var Twit = require('twit');
var Sentiment = require('sentiment');
var config =    require('../config/config');


var sentiment = new Sentiment();    
var T = new Twit(config);


router.get("/",function(req, res) {
     res.redirect("/twitter");
});

var tweet=[ ];

router.get("/twitter",function(req, res) {
    
     var search =  req.query.search;
     var params =  { q: search, count: 100};
     
     T.get('search/tweets', params, gotData);

function gotData(err, data, response) {
    if(err){
        console.log(err);
    } else {
            var tweets = data.statuses;
            for(var i = 0; i < tweets.length ; i++) {
        
                var result = sentiment.analyze(tweets[i].text);
  //            console.dir(result.score);
    
                var twet = {
                    text: tweets[i].text,
                    score: result.score
                }   

                tweet[i]= twet;
    
    
            }           
//console.log(tweet);
        }
        
 res.render("index",{tweet : tweet});
 
    }
});



module.exports = router;