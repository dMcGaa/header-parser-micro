var express = require('express');
var app = express();

var browserInfo = {
  ipaddress: null,
  language: null,
  software: null
}
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Give Views/Layouts direct access to data.
app.use(function(req, res, next) {
  res.locals.browserInfo = browserInfo;
  next();
});


app.get('/', function(request, response) {
  getBrowserInfo(request.headers);
  // browserInfo.ipaddress = request.headers['x-forwarded-for'];
  // browserInfo.language = request.headers['accept-language'];
  // browserInfo.software = request.headers['user-agent'];
  // console.log(browserInfo.ipaddress);
  // console.log(request.headers['accept-language']);
  // console.log(request.headers['user-agent']);
  response.render('pages/index')
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

function getBrowserInfo(headers){
  var tempVar;
  
  browserInfo.ipaddress = headers['x-forwarded-for'];
  
  tempVar = headers['accept-language'].split(",");
  tempVar = tempVar[0];
  browserInfo.language = tempVar;
  
  
 tempVar = headers['user-agent'].match(/\([^)]*/); // /((\().+(\))){1}/
 tempVar = tempVar[0].slice(1);
  browserInfo.software = tempVar;
  console.log(browserInfo.ipaddress);
  console.log(browserInfo.language);
  console.log(browserInfo.software);
}