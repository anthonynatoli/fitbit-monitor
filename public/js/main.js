requirejs.config({
	baseUrl: '/',
	paths:{
    	'jquery': '/bower_components/jquery/dist/jquery.min',
    	'handlebars': '/bower_components/handlebars/handlebars',
    	'underscore': '/bower_components/underscore/underscore',
    	'home': 'public/js/home'
  	}
});

define( ['home'], function( require ){
	OAuth.initialize('v59jTrCUjdvuOJ1UrBVKbQmcw4M');
	console.log("initialized");
});
