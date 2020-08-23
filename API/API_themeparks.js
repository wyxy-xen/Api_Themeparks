// include the Themeparks library
const Themeparks = require("themeparks");

var result;
// configure where SQLite DB sits
// optional - will be created in node working directory if not configured
// Themeparks.Settings.Cache = __dirname + "/themeparks.db";

// access a specific park
//  Create this *ONCE* and re-use this object for the lifetime of your application
//  re-creating this every time you require access is very slow, and will fetch data repeatedly for no purpose
const DisneyWorldMagicKingdom = new Themeparks.Parks.WaltDisneyWorldMagicKingdom();

// Access wait times by Promise
const CheckWaitTimes = () => {
    DisneyWorldMagicKingdom.GetWaitTimes().then((rideTimes) => {
        result = []
        rideTimes.forEach((ride) => {    
        var dlp = new class dlp{constructor(name, waitTime,status) { }};
        dlp.name = ride.name;
        dlp.waitTime = ride.waitTime;
        dlp.status = ride.status;
         result.push(dlp);
        });
    }).catch((error) => {
        console.error(error);
    }).then(() => {
        setTimeout(CheckWaitTimes, 1000 * 60 * 5); // refresh every 5 minutes
    });
};

CheckWaitTimes();

// you can also call GetOpeningTimes on themeparks objects to get park opening hours



var express = require('express');
var server = express();
var port = process.env.port || 5000;
var cors = require('cors')
var sql = require("mssql");
var bodyParser = require("body-parser");

///Autorisation CORS
server.use(cors())

// Body Parser Middleware
server.use(bodyParser.json());




server.get('/api/Themeparks', function (req, res)
{  
    res.send(result);
})


server.listen(port, function(){
    var datetime = new Date();
    var Message = "Server running on port:- " + port + "  Started at:- " + datetime;
    console.log(Message);
})
