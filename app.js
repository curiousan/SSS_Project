'use strict';

// imports
require('dotenv').config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const api = require('./app_server/routes/api');
const index = require('./app_server/routes/index');
const https = require('https');
const http = require('http');
const DB = require('./app_server/config/db');

const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const MongodbStore = require('connect-mongo')(session);


// ssl setup
const sslkey = fs.readFileSync('./ssl-key.pem');
const sslcert = fs.readFileSync('./ssl-cert.pem');
const options = {
    key: sslkey,
    cert: sslcert,
    requestCert: false,
    rejectUnauthorized: false,
};
const mongoUser = process.env.MLAB_USER;
const mongoPass = process.env.MLAB_PASS;
const mongoStore = process.env.MLAB_STORE;

// connect to database and start listening on port 3000
// TODO: .env for URL of db server?
DB.connect(`mongodb://${mongoUser}:${mongoPass}@ds163119.mlab.com:63119/${mongoStore}`, app, options, https);


// set up express app
// TODO: candidate for .env
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// passport js setup
app.use(session({
    name: 'app.sess',
    store: new MongodbStore({
        mongooseConnection: mongoose.connection,
        touchAfter: 24 * 36000,
    }),
    secret: 'somesecret', resave: false, saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 15},
}
));
app.use(flash());

// handle bars setup
app.engine('hbs', hbs({
    extname: 'hbs', defaultLayout: 'layout',
    layoutsDir: __dirname+'/app_server/views',
}));

// set custom templating engine to handlebars
app.set('view engine', 'hbs');

// all middleware for express
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.use('/static', express.static('public'));

// end points handlers

app.use('/', index);
app.use('/api', api);


// catch 404 and forward to error handlers
app.use((req, res, next) =>{
    const err = new Error('Not found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page

    res.status(err.status || 500);
    res.send(err.message);
});


http.createServer((req, res) => {
res.writeHead(301, {
    'Location': 'https://localhost:3000'+req.url});
    res.end();
}).listen(8080);
