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

var request = require('request');
var Promise = require('promise');

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

    if (isNaN(message) && message == 0) {
        sendIntroMessage(phoneNumber);
        rememberUserState(phoneNumber, 'intro');
    }

    if (getUserState(phoneNumber) == 'intro') {
        if (message == 1) {
            getStoryList(91).then(function(val) {
                console.log(val);
                sendStoryListMessage(phoneNumber, val);
            });

            rememberUserState(phoneNumber, 'stories');

        } else if (message == 2) {
            getMatchingOrg(91).then(function(val) {
                sendMatchingOrgMessage(phoneNumber, val);
            });
            sendCityRequestMessage(phoneNumber);
            rememberUserState(phoneNumber, 'resources');
        }
    }

    if (getUserState(phoneNumber) == 'resources') {
        getOrgsInCity(message);
        rememberUserState('resourceList');
    }

    if (getUserState(phoneNumber) == 'resourceList') {
        if (isNaN(message)) {
            getOrgAdditional(message);
        }
    }

    if (getUserState(phoneNumber) == 'stories') {
        if (isNaN(message)) {
            getStoryText(message);
            rememberUserState('storyDetail');
        }
    }

    if (getUserState(phoneNumber) == 'storyDetail') {
        if (isNaN(message)) {
            getSimilarStory(message);
        }
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
        body: 'You came to the right place. We want you to know you are not alone. Other women have gone through this...\nPress\n(1) to read their stories\n(2) to find local resources',
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

function sendStoryListMessage(phoneNumber, stories) {
    for (var key in stories) {
        client.messages.create({
            body: stories[key] + '...Press [' + key + '] to read her story.',
            to: phoneNumber,
            from: '+14017533904'
        }, function (err, message) {
            if (err) {
                console.error(err.message);
            }
        });
    }
}

function sendMatchingOrgMessage(phoneNumber, list) {
    for (var key in list) {
        client.messages.create({
            body: list[key],
            to: phoneNumber,
            from: '+14017533904'
        }, function (err, message) {
            if (err) {
                console.error(err.message);
            }
        });
    }
}

function getStoryList(phone) {
    var countrycode = phone;

    console.log(countrycode);

    return new Promise(function(resolve, reject) {
        request('http://localhost:8000/stories/list/' + countrycode, function(error, res, body) {
            if (!error && res.statusCode == 200) {
                resolve(body);
            }
        });
    });
}

app.use(function(err, req, res, next) {
  // Do logging and user-friendly error message display
  console.error(err);
  res.status(500).send({status:500, message: 'internal error', type:'internal'}); 
});

function getStoryText(storyid) {
    var storyid = storyid;
    var storytext = "";

    return new Promise(function(resolve, reject) {
        request('http://127.0.0.1:8000/stories/single/' + storyid, function (error, res, body) {
            if (!error && res.statusCode == 200) {
                resolve(body);
            }
        });
    });
}

function getSimilarStory(storyid) {

    var storyid = storyid;
    var storytext = "";

    return new Promise(function(resolve, reject) {
        request('http://127.0.0.1:8000/stories/similar/' + storyid, function(error, res, body) {
            if (!error && res.statusCode == 200) {
                resolve(body);
            }
        });
    });
}

function getMatchingOrg(phone) {
    var countrycode = phone;

    return new Promise(function(resolve, reject) {
        request('http://127.0.0.1:8000/resources/matchorg/?country=' + countrycode, function (error, res, body) {
            if (!error && res.statusCode == 200) {
                resolve(body);
            }
        });
    });
}

function getOrgAdditional(orgid) {
    var id = orgid;

    return new Promise(function(resolve, reject) {
        request('http://127.0.0.1:8000/resources/info/' + id, function (error, res, body) {
            if (!error && res.statusCode == 200) {
                resolve(body);
            }
        });
    });
}

function getOrgsInCity(city) {
    var orgcity = city;

    return new Promise(function(resolve, reject) {
        request('http://127.0.0.1:8000/resources/matchorg/?city=' + orgcity, function (error, res, body) {
            if (!error && res.statusCode == 200) {
                resolve(body);
            }
        });
    });
}

function getEmergencyNumber(phone){
	var countrycode = phone;
	
	return new Promise(function(resolve, reject) {
        request('http://127.0.0.1:8000/basic/emergency/' + orgcity, function (error, res, body) {
            if (!error && res.statusCode == 200) {
                resolve(body);
            }
        });
    });
}

app.listen(process.env.PORT, function () {
    console.log('HerStory app listening on port ' + process.env.PORT);
});

getStoryList(91).then(function(val) {
    console.log(val)
});