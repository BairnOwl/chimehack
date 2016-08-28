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

var userStates = {};
// Twilio interface

getStoryList(91);
app.post('/incoming', function(req, res) {
    var phoneNumber = req.body.From;
    var message = isNaN(parseInt(req.body.Body)) ? req.body.Body.toLowerCase() : parseInt(req.body.Body);

    if (message == 'her') {
        sendIntroMessage(phoneNumber);
        rememberUserState(phoneNumber, 'intro');

    }

    if (getUserState(phoneNumber) == 'intro') {
        if (message == 1) {
            var stories = getStoryList(91);
            //console.log(stories);
            rememberUserState(phoneNumber, 'stories');

        } else if (message == 2) {
            // get national orgs
            sendCityRequestMessage(phoneNumber);
            rememberUserState(phoneNumber, 'resources');
        }
    }

    if (getUserState(phoneNumber) == 'resources') {
        // get local orgs
        
    }


});

function rememberUserState(phoneNumber, state) {
    userStates[phoneNumber] = state;
}

function getUserState(phoneNumber) {
    return userStates[phoneNumber];
}

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

function sendCityRequestMessage(phoneNumber) {
    client.messages.create({
        body: 'Can you please tell me what city you are in so I can find you local resources? I won’t share this with anyone.',
        to: phoneNumber,
        from: '+14017533904'
    }, function (err, message) {
        if (err) {
            console.error(err.message);
        }
    });
}


function getStoryList(phone) {
    var countrycode = phone;

    console.log(phone);
    
    

    app.get('http://127.0.0.1:8000/stories/list/' + countrycode, function(req, res) {
        console.log("in django")
        console.log(res);
        req.send("hello world");
    });

    // var req = new XMLHttpRequest();
    // req.open('GET', 'http://127.0.0.1:8000/stories/list/' + countrycode, true);
    // req.addEventListener('load', function(e) {
    //     if (req.status == 200) {
    //         var data = JSON.parse(req.responseText);
    //         console.log(data);
    //
    //         return data;
    //     }
    // }, false);
    // req.send(null);
}

app.use(function(err, req, res, next) {
  // Do logging and user-friendly error message display
  console.error(err);
  res.status(500).send({status:500, message: 'internal error', type:'internal'}); 
})

function getStoryText(storyid) {
    app.get('/storytext', function(req, res) {
        var storyid = storyid;
        var storytext = "";
        req = new XMLHttpRequest();
        req.open('GET', 'http://127.0.0.1:8000/stories/TO DO FILL OUT/', true);
        req.addEventListener('load', function(e) {
            if (req.status == 200) {
                var data = JSON.parse(req.responseText);
                return data;
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
                return data;
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
                return data;
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
                return data;
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
                return data;
            }
        }, false);
        req.send(null);
    });
}

app.listen(process.env.PORT, function () {
    console.log('HerStory app listening on port ' + process.env.PORT);
});
