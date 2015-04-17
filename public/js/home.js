define( function( require ){
	'use strict';

	var $ = require( 'jquery' );

	$( '#start' ).click( function(){
		console.log( 'button clicked' );
		OAuth.popup('fitbit').done(function(result){
			result.me().done(function(me){
				console.log(me.firstname);
			})
			.fail(function(err){
				console.log("error: " + err);
			});
		})
		.fail(function(err){
			console.log("GOD DAMMIT: " + err);
		});
	});
});
