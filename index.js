const express = require('express');
const app = express();
const hbs = require('hbs');
const port = 9090;

app.use(express.static('public'));
app.set('view engine', 'hbs');

const routes = require('./routes/routes.js');

app.use('/', routes);

app.listen(port, function () {
    console.log('Listening at port ' + port);
});