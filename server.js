/**
 * Created by bairnowl on 8/27/16.
 */

var twilio = require('twilio');
var express = require('express');
var app = express();


app.listen(process.env.PORT, function () {
    console.log('HerStory app listening on port ' + process.env.PORT);
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

app.get('/similar', function(req, res) {
    var storyid = res.storyid; 
    var similarlist;
    app.get('/similarstory/' + storyid, function(req, res)){
        //may have to send only 3 stories
        similarlist = res;
    });
    res.send(similarlist);
});

app.get('/matching', function(req, res) {
    var countrycode = res.countrycode; 
    var orglist;
    app.get('/matchorg', function(request, response)){
        //may have to only send 3 orgs
        orglist = response;
    });
    res.send(orglist);
});

app.get('/org', function(req, res) {
    var orgid = res.orgid;
    var orginfo;
    app.get('/orginfo', function(request, response)){
        orginfo = response;
    }
    //make call to django app
  res.send(orginfo);
}); 

app.get('/localorgs', function(req, res) {
    var orgcity = res.orgcity;
    var orginfo;
    app.get('/orginfo/' + orgcity, function(request, response)){
        orginfo = response;
    }
    //make call to django app
  res.send(orginfo);
}); 