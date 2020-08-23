// include the Themeparks library
const Themeparks = require("themeparks");
const NameParks = Object.keys(Themeparks.Parks);

var express = require('express');
var server = express();
var port = process.env.port || 5000;
var cors = require('cors')
var bodyParser = require("body-parser");

///Autorisation CORS
server.use(cors())
// Body Parser Middleware
server.use(bodyParser.json());



const getParkList = function(res) {
    ParkList = NameParks
    res.send(ParkList);
};

/* Disneyland Paris
DisneylandParisMagicKingdom, 6
DisneylandParisWaltDisneyStudios, 7
*/
/*
 Europa
  EuropaPark, 12
*/

var CheckWaitTimes = function(ParksId, res) {
    if(ParksId < 57){
        var Parks = new Themeparks.Parks[NameParks[ParksId]];
      //  console.log(ParksId + " | " + NameParks[ParksId]);
    }else{ return; }
    
    Parks.GetWaitTimes().then((rideTimes) => {
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



server.get('/api/Themeparks/:ParksId', function (req, res)
{  
    CheckWaitTimes(req.params.ParksId, res);
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
