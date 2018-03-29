'use strict';

// imports
const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const path = require('path');
const api = require('./app_server/routes/api');
const user = require('./app_server/routes/user');
const index = require('./app_server/routes/index');
// handle bars setup
app.engine('hbs', hbs({
    extname: 'hbs', defaultLayout: 'layout',
    layoutsDir: __dirname+'app_server/views',
}));

// set custom templating engine to handlebars
app.set('view engine', 'hbs');

// all middleware for express
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set(express.static(path.join(__dirname, 'public')));

// end points handlers

app.use('/', index);
app.use('/user', user);
app.use('/api', api);


// catch 404 and forward to error handlers
app.use(function(req, res, next) {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page

    res.status(err.status || 500);
    res.send('error');
});

const server = app.listen(3000, function() {
    const port = server.address().port;
    console.log(`example app listening on ${port}`);
});
