const express = require('express');
const app = express();
const hbs = require('hbs');
const port = 9090;

var PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.set('view engine', 'hbs');

const routes = require('./routes/routes.js');

app.use('/', routes);

app.listen(PORT, function () {
    console.log('Listening at port ' + PORT);
});
