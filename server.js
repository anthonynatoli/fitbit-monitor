var express = require('express');
var http = require('http');
var exhbs = require( 'express3-handlebars' );
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var router = require('./routes/router');
//var OAuth = require('oauthio');

var PORT = process.env.PORT || 3000; //for localhost testing
var URI = 'http://localhost:' + PORT;
if( process.env.PORT ){
  URI = 'http://fitbitmonitor.herokuapp.com';
}

var client_key = '943e4f12e00b951032e553e41978aedc';
var client_secret = 'ee62b24ff77d33b05ae2b8abc7c268f6';
var fitbitClient = require('fitbit-js')(client_key, client_secret, URI, 'en_US');

var app = express();

var server = http.createServer(app);

//OAuth.initialize('v59jTrCUjdvuOJ1UrBVKbQmcw4M', 'nedqdXU5cBVlKdS63DH87nZcEm4')

app.engine( 'handlebars', exhbs( { defaultLayout: 'master' } ) );
app.set( 'view engine', 'handlebars' );

app.use( express.static( __dirname ) );

app.use(cookieParser());
app.use(bodyParser.json());
/*app.use(session({
                secret: 'keyboard cat',
                resave: false,
                saveUninitialized: true
}));

app.use(csrf());
app.use(function(req, res, next) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  next();
});
*/
var token;

app.use('/router', router);	//use router for all routes under /router/*

app.get('/', function(req, res){
  //res.render( 'home' ); 		//renders the views/home.handlebars view
  fitbitClient.getAccessToken(req, res, function (error, newToken) {
    console.log('In callback');
    if(newToken) {
      token = newToken;
      res.writeHead(200, {'Content-Type':'text/html'});
      res.end('<html>Now <a href="/getStuff">get stuff</a></html>');
    }
    //console.log('SUCCESS!!!!');
  });
});

app.get('/sample_route', function(req, res){
	res.render( 'route' );
});


app.get('/signin', function(req, res){
  fitbitClient.getAccessToken(req, res, function (error, newToken) {
    console.log('In callback');
    if(newToken) {
      token = newToken;
      res.writeHead(200, {'Content-Type':'text/html'});
      //res.send('<html>Now <a href="/getStuff">get stuff</a></html>');
    }
    //console.log('SUCCESS!!!!');
  });
  console.log("Here");
});

app.get('/getStuff', function (req, res) {
  fitbitClient.apiCall('GET', '/user/-/profile.json',
    {token: {oauth_token_secret: token.oauth_token_secret,
             oauth_token: token.oauth_token}},
    function(err, resp, json) {
      if (err) return res.send(err, 500);
      res.json(json);
  });
});

/*app.get('/oauth/redirect', OAuth.redirect(function(result, req, res) {
  if (result instanceof Error) {
      res.status(500).send("FUCKIN error: " + result.message);
  }
  //res.send('Success?' + JSON.stringify(result));
  result.me().done(function(me) {
      //console.log(me);
      res.send(JSON.stringify(me));
  });
}));
app.get('/signin', OAuth.auth('fitbit', 'http://localhost:3000/oauth/redirect'));
*/

server.listen( PORT, function(){
  console.log('listening on *:3000');
  console.log( __dirname );
});
