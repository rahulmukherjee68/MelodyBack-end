var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var songRouter=require('./routes/songs');
var artistRouter=require('./routes/artists');
var mapRouter=require('./routes/maps');
var starRouter=require('./routes/stars');
var getAllRouter=require('./routes/getAll');





var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// routes //
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/addSong',songRouter);
app.use('/addArtist',artistRouter);
app.use('/addMap',mapRouter);
app.use('/rate',starRouter);
app.use('/getAllTopTenSongs',getAllRouter);
// End of routes //





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;