var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./app/routes/index');
var Clientes = require('./app/routes/Clientes'); 
var Peliculas = require('./app/routes/Peliculas');
var Alquiler = require('./app/routes/Alquiler');
var NumeroAlquiler = require('./app/routes/NumeroAlquileres');
var users = require('./app/routes/users'); 

var app = express();

//cargamos el modelo de la base de datos
var db = require('./app/models/db.js');
//hacemos el modelo visible al enrutador
app.use(function(req,res,next){    
    req.db = db;
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'app', 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/Clientes', Clientes);
app.use('/Peliculas', Peliculas);
app.use('/Alquiler', Alquiler);
app.use('/NumeroAlquileres', NumeroAlquiler);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
