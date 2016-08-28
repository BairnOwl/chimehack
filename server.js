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

app.post('/incoming', function(req, res) {
    var phoneNumber = req.body.From;
    var message = isNaN(parseInt(req.body.Body)) ? req.body.Body.toLowerCase() : parseInt(req.body.Body);

    if (message == 'her') {
        sendIntroMessage(phoneNumber);
        rememberUserState(phoneNumber, 'intro');
    }

    if (!isNaN(message) && message == 0) {
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
        getOrgsInCity(message).then(function(val) {
            sendOrgsInCityMessage(val);
        });
        rememberUserState('resourceList');
    }

    if (getUserState(phoneNumber) == 'resourceList') {
        if (!isNaN(message)) {
            getOrgAdditional(message).then(function(val) {
                sendOrgAdditionalMessage(val);
            });
        }
    }

    if (getUserState(phoneNumber) == 'stories') {
        if (!isNaN(message)) {
            getStoryText(message).then(function(val) {
                sendStoryTextMessage(val);
            });
            rememberUserState('storyDetail');
        }
    }

    if (getUserState(phoneNumber) == 'storyDetail') {
        if (!isNaN(message)) {
            getSimilarStory(message).then(function(val) {
                sendSimilarStoryMessage(val);
            });
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
	getEmergencyNumber(phoneNumber).then(function(number) {
        client.messages.create({
            body: 'I\'m here to help. If this is an emergency or you are not safe, dial this emergency number ' + number,
            to: phoneNumber,
            from: '+14017533904'
        }, function(err, message) {
            if (err) {
                console.error(err.message);
            }
        });

		client.messages.create({
			body: 'I want you to know you are not alone. I wont share any personal information that you give me. Other women have gone through this...\n' +
            'Press [1] to read their stories\nPress [2] to see a list of local resources\n**If this phone is not private, please delete these messages for your own protection.',
			to: phoneNumber,
			from: '+14017533904'
		}, function(err, message) {
			if (err) {
				console.error(err.message);
			}
		});
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

function sendOrgsInCityMessage(phoneNumber, list) {
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

function sendOrgAdditionalMessage(phoneNumber, org) {
    client.messages.create({
        body: org,
        to: phoneNumber,
        from: '+14017533904'
    }, function (err, message) {
        if (err) {
            console.error(err.message);
        }
    });

}

function sendStoryTextMessage(phoneNumber, story) {
    client.messages.create({
        body: story + '\nWhat would you like to do now?\nPress [1] to hear another story\nPress [2] to message ' +
        'the person in the story\nPress [3] to see a list of local resources',
        to: phoneNumber,
        from: '+14017533904'
    }, function (err, message) {
        if (err) {
            console.error(err.message);
        }
    });

}

function sendSimilarStoryMessage(phoneNumber, story) {
    client.messages.create({
        body: story,
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

    console.log(countrycode);

<<<<<<< HEAD
    return {"1": "She was beaten by her husband but strangers helped her divorce and find shelter\u2026", "3": "She almost lost both her children to domestic violence but NGOs helped her divorce and get custody", "4": "She was raped by a stranger and her husband stood by her\u2026"};
=======
    return new Promise(function(resolve, reject) {
        request('http://chimehack-herstory.appspot.com/stories/list/' + countrycode, function(error, res, body) {
            if (!error && res.statusCode == 200) {
                resolve(body);
            }
        });
    });
>>>>>>> fe4b8aa5cb750556cad1b47d19430a578f42e032
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
        request('http://chimehack-herstory.appspot.com/stories/single/' + storyid, function (error, res, body) {
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
        request('http://chimehack-herstory.appspot.com/stories/similar/' + storyid, function(error, res, body) {
            if (!error && res.statusCode == 200) {
                resolve(body);
            }
        });
    });
}

function getMatchingOrg(phone) {
    return {"1": ["9122266244", "Society for Nutrition, Education & Health Action"], "2": ["9164684742", "Apne Aap"]};
}

function getOrgAdditional(orgid) {
    return {"phone_number": "9122266244", "services": "Legal, counseling", "description": "Provides a safe space, free legal counseling, emotional counseling", "name": "Society for Nutrition, Education & Health Action", "location": ""};
}

function getOrgsInCity(city) {
    return {"1": ["9122266244", "Society for Nutrition, Education & Health Action"], "2": ["9164684742", "Apne Aap"]};

}

function getEmergencyNumber(phone){
	
	return new Promise(function(resolve, reject) {
        request('http://chimehack-herstory.appspot.com/basic/emergency/' + phone, function (error, res, body) {
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