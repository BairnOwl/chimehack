/**
 * Created by bairnowl on 8/27/16.
 */

var accountSid = 'ACd11cce760ddc05c7eef7fe3448030342'; // Your Account SID from www.twilio.com/console
var authToken = '6b7dfc77a039c8d60461a562441fdeb0';   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio.RestClient(accountSid, authToken);
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Twilio interface

app.post('/incoming', function(req, res) {
    var phoneNumber = req.body.From;
    var message = isNaN(parseInt(req.body.Body)) ? str.toLowerCase(req.body.Body) : parseInt(req.body.Body);

    console.log(message);

    if (message == 'her') {
        sendIntroMessage(phoneNumber);
    }
});


function sendIntroMessage(phoneNumber) {
    client.messages.create({
        body: 'I\'m here to help. I won\'t share any personal information that you share with me. ' +
        'Other women have gone through this.\nPress\n(1) to read their stories\n(2) to find local resources',
        to: phoneNumber,
        from: '+14017533904'
    }, function (err, message) {
        if (err) {
            console.error(err.message);
        }
    });
}

app.get('/home', function(request, response){
   response.send("hellooooooooo world"); 
});


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


app.listen(process.env.PORT, function () {
    console.log('HerStory app listening on port ' + process.env.PORT);
});
