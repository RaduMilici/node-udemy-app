var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var setupController = require('./controllers/setupController');
var apiController = require('./controllers/apiController');

app.use('/assets', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

setupController.SetupTodos(app);
apiController.SetupApi(app);
app.listen(port);