/**
 * Created by bairnowl on 8/27/16.
 */

var twilio = require('twilio');

var express = require('express');
var app = express();


app.listen(3000, function () {
    console.log('HerStory app listening on port ' + 3000);
});

app.get('/', function(request, response){
   response.send("hellooooooooo world"); 
});

/*
app.get('/welcome', function(request, response){
   var welcomejson = {"read": "text for reading stories", "resources": "get resources"}; 
    response.send(welcomejson);
});

app.get('/list', function(request, response) {
    var countrycode = response.countrycode;
    var list;
    app.get('/liststories/' + countrycode, function(req, res){
        list = res;    
    });
   //var snippets = {"1": "snippet1", "2": "snippet2", "3": "snippet3"};
    response.send(list);
});

app.get('/storytext', function(req, res) {
    var storyid = res.storyid; 
    var storytext = "";
    app.get('/story/' + storyid, function(req, res){
        storytext = res.storyid //use key to get value i.e. story text    
    });
    //var story = {"storyid1": "storytext"};
    res.send(storytext);
});

app.get('/similarstory', function(req, res) {
    //make call to django app
    var similarstory = {"1": "snippet1", "2": "snippet2", "3": "snippet3"};
  res.send();
});

app.get('/matching', function(req, res) {
    //make call to django app
    var similarstory = {"1": "snippet1", "2": "snippet2", "3": "snippet3"};
  res.send('Hello World!');
});

app.get('/orginfo', function(req, res) {
    //make call to django app
  res.send('Hello World!');
}); */