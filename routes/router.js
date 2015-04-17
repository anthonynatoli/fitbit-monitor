var express = require('express');
var router = express.Router();

router.get('/first_route', function(req, res){
	res.send('Route was handled by a router!');
});

module.exports = router;