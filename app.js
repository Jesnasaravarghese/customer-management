var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose  = require('mongoose');
const fs = require('fs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const { appModules } = require('./app.config');

const env = process.env.NODE_ENV || 'development';


// mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/customer-management", { useNewUrlParser: true,  useUnifiedTopology: true });

mongoose.connection.on("error", err => {
  console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected")
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


// =======================
// Dynamic route loading
// =======================
if (Array.isArray(appModules)) {
    for (let mod of appModules) {
        let modPath = `./modules/${mod}/${mod}.router.js`;

        console.log('modPath',modPath)

        if (!fs.existsSync(modPath)) {
            throw new Error(`Dependency module '${modPath}' not found`);
        }

        let parts = require(modPath);
        let basepath = parts.path || mod;

        console.log('basepath',basepath)

        app.use(`/${basepath}`, parts.routes());
    }
}

app.get('*', (req, res) => res.send(404));



/*// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
*/
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
