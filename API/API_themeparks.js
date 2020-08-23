// include the Themeparks library
const Themeparks = require("themeparks");
const NameParks = Object.keys(Themeparks.Parks);
var Park1 = new Themeparks.Parks.DisneylandParisMagicKingdom();
var Park2 = new Themeparks.Parks.DisneylandParisWaltDisneyStudios();


var express = require('express');
var server = express();
var port = process.env.port || 5000;
var cors = require('cors')
var bodyParser = require("body-parser");

///Autorisation CORS
server.use(cors())
// Body Parser Middleware
server.use(bodyParser.json());



const Park = function(park){
    if(park == 1)
    { return Park1; }
    else
    { return Park2; }
}


const getParkList = function(res) {
    var ParkList = NameParks
    res.send(ParkList);
};


const CheckWaitTimes = function(park, res) {
    Park(park).GetWaitTimes().then((rideTimes) => {
        var result = []
        rideTimes.forEach((ride) => {    
        var dlp = new class dlp{constructor(name, waitTime,status) { }};
        dlp.name = ride.name;
        dlp.waitTime = ride.waitTime;
        dlp.status = ride.status;
         result.push(dlp);
        });
        res.send(result);
    }).catch((error) => {
        console.error(error);
    });
};



server.get('/api/Themeparks/:Park', function (req, res)
{  
    CheckWaitTimes(req.params.Park, res);
})

server.get('/api/ParkList', function (req, res)
{  
    getParkList(res);   
})


server.listen(port, function(){
    var datetime = new Date();
    var Message = "Server running on port:- " + port + "  Started at:- " + datetime;
    console.log(Message);
})
