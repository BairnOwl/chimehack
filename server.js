/**
 * Created by bairnowl on 8/27/16.
 */

var twilio = require('twilio');

var express = require('express');
var app = express();


app.listen(process.env.PORT, function () {
    console.log('HerStory app listening on port ' + process.env.PORT);
});