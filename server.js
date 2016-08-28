/**
 * Created by bairnowl on 8/27/16.
 */
var accountSid = 'ACd11cce760ddc05c7eef7fe3448030342'; // Your Account SID from www.twilio.com/console
var authToken = '6b7dfc77a039c8d60461a562441fdeb0'; // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio.RestClient(accountSid, authToken);
var express = require('express');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
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
    }, function(err, message) {
        if (err) {
            console.error(err.message);
        }
    });
}

app.get('/home', function(request, response) {
    response.send("hellooooooooo world");
});


app.get('/welcome', function(request, response) {
    var welcomejson = {
        "read": "text for reading stories",
        "resources": "get resources"
    };
    response.send(welcomejson);
});

function getStoryList(phone) {
    app.get('/list', function(request, response) {
        var countrycode = phone;
        req = new XMLHttpRequest();
        req.open('GET', 'http://127.0.0.1:8000/stories/list/' + countrycode, true);
        req.addEventListener('load', function(e) {
            if (req.status == 200) {
                var data = JSON.parse(req.responseText);
                return response.json(data);
            }
        }, false);
        req.send(null);
    });
}


function getStoryText(storyid) {
    app.get('/storytext', function(req, res) {
        var storyid = storyid;
        var storytext = "";
        req = new XMLHttpRequest();
        req.open('GET', 'http://127.0.0.1:8000/stories/TO DO FILL OUT/', true);
        req.addEventListener('load', function(e) {
            if (req.status == 200) {
                var data = JSON.parse(req.responseText);
                return response.json(data);
            }
        }, false);
        req.send(null);
    });
}

function getSimilarStory(storyid) {
    app.get('/similar', function(req, res) {
        var storyid = storyid;
        var storytext = "";
        req = new XMLHttpRequest();
        req.open('GET', 'http://127.0.0.1:8000/stories/SIMILAR STORY/', true);
        req.addEventListener('load', function(e) {
            if (req.status == 200) {
                var data = JSON.parse(req.responseText);
                return response.json(data);
            }
        }, false);
        req.send(null);
    });
}

function getMatchingOrg(phone) {
    app.get('/matching', function(req, res) {
        var countrycode = phone;
        req = new XMLHttpRequest();
        req.open('GET', 'http://127.0.0.1:8000/stories/MATCH ORG/', true);
        req.addEventListener('load', function(e) {
            if (req.status == 200) {
                var data = JSON.parse(req.responseText);
                return response.json(data);
            }
        }, false);
        req.send(null);
    });
}

function getOrgAdditional(orgid) {
    app.get('/org', function(req, res) {
        var orgid = orgid;
        req = new XMLHttpRequest();
        req.open('GET', 'http://127.0.0.1:8000/stories/ORG INFO/', true);
        req.addEventListener('load', function(e) {
            if (req.status == 200) {
                var data = JSON.parse(req.responseText);
                return response.json(data);
            }
        }, false);
        req.send(null);
    });
}

function getOrgsInCity(city) {
    app.get('/localorgs', function(req, res) {
        var orgcity = city;
        req = new XMLHttpRequest();
        req.open('GET', 'http://127.0.0.1:8000/stories/LOCAL ORGS/', true);
        req.addEventListener('load', function(e) {
            if (req.status == 200) {
                var data = JSON.parse(req.responseText);
                return response.json(data);
            }
        }, false);
        req.send(null);
    });
}


app.listen(3000, function() {
    console.log('HerStory app listening on port ' + 3000);
});