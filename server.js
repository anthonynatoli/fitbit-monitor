var express = require('express');
var http = require('http');
var exhbs = require( 'express3-handlebars' );
/*var csrf = require('csurf');
var cookieParser = require('cookie-parser');
var session = require('express-session');
*/
var router = require('./routes/router');
//var OAuth = require('oauthio');

var app = express();

var server = http.createServer(app);
var port = 3000; //for localhost testing

//OAuth.initialize('v59jTrCUjdvuOJ1UrBVKbQmcw4M', 'nedqdXU5cBVlKdS63DH87nZcEm4')

app.engine( 'handlebars', exhbs( { defaultLayout: 'master' } ) );
app.set( 'view engine', 'handlebars' );

app.use( express.static( __dirname ) );

/*app.use(cookieParser());
app.use(session({
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

app.use('/router', router);	//use router for all routes under /router/*

app.get('/', function(req, res){
  res.render( 'home' ); 		//renders the views/home.handlebars view
});

app.get('/sample_route', function(req, res){
	res.render( 'route' );
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

server.listen(process.env.PORT || port, function(){
  console.log('listening on *:3000');
  console.log( __dirname );
});
