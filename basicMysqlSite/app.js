const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
let swig = require('swig');

const index = require('./controllers/index');
// inject band, user controller
const bands = require('./controllers/Band');
const users = require('./controllers/User');

const app = express();

// view engine setup
swig = new swig.Swig();
app.set('views', path.join(__dirname, 'views/pages'));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index.show);

// Defining route to list and post
app.get('/bands', bands.list);
app.get('/band/:id', bands.byId);
app.post('/bands', bands.create);
app.put('/band/:id', bands.update);
app.delete('/band/:id', bands.delete);

// Defining route to list and post users
app.get('/users', users.list);
app.post('/users', users.create);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
