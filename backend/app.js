var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

const MONGO_URI = require('./config/key');
const participantRouter = require('./routes/index');
const scheduleRouter = require('./routes/interview');

console.log(MONGO_URI);
const connect = mongoose.connect(MONGO_URI,{ useNewUrlParser: true,useUnifiedTopology: true });
connect.then(()=>{
  console.log('connected to database');
}).catch((err)=>{
  console.log("ERROR in connecting to DATABASE",err);
})

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(
  cors({
    origin: [/localhost/, /127\.0\.0\.1/, /0\.0\.0\.0/],
    credentials: true,
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(participantRouter);
app.use(scheduleRouter)

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
