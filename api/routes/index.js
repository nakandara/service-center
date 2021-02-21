var express = require('express');
var router = express.Router();

router.get('/', function(req, res){    
    res.send("Welcome to API!");
});
require('./SuperagentRoutes')(router);
require('./CustomerRoutes')(router);
require('./AgentRoutes')(router);

module.exports.router = router;