var express = require('express')
var app = express()
var moment = require('moment')
var path = require('path')

var port = process.env.PORT || 1337;


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/:timestamp', function (req, res) {
  var timestamp = req.params.timestamp;
  var dateTime;
  if (!isNaN(timestamp)) {
    dateTime = moment(timestamp, 'X');
  } else {
    dateTime = moment(timestamp, 'MMMM D, YYYY', true);
  }

  if (dateTime.isValid()) {
    res.json({
      unix: dateTime.format('X'),
      natural: dateTime.format('MMMM D, YYYY')
    })
  } else {
    res.json({
      unix: null,
      natural: null
    })
  }
})

app.listen(port, function () {
	 console.log("express server running on port : " + port);
});
