var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');
var mysql = require('mysql');
var csv = require('fast-csv');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/items');

var app = express();
var models = require('./models/index.js');

models.sequelize.sync().then( () => {
  console.log(" DB 연결 성공");
  let stream = fs.createReadStream("courses.csv");
  let myData = [];
  let csvStream = csv
      .parse()
      .on("data", function (data) {
          myData.push(data);
      })
      .on("end", function () {
        myData.shift();
      
      // create a new connection to the database
        const connection = mysql.createConnection({
          host: 'localhost',
          user: 'root',
          password: '000000',
          database: 'my_database'
        });

          // open the connection
      connection.connect((error) => {
        if (error) {
          console.error(error);
        } else {
          let query = 'INSERT INTO courses (code, lecture, professor, location, start_time, end_time , dayofweek) VALUES ?';
          connection.query(query, [myData], (error, response) => {
            console.log(error || response);
          });
        }
      });
   	});

  stream.pipe(csvStream);
}).catch(err => {
  console.log("연결 실패");
  console.log(err);
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
