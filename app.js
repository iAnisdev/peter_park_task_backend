var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const cors = require("cors");
var logger = require('morgan');

var indexRouter = require('./routes/index');
var permitRoutes = require('./routes/permits');

const db = require("./models");

var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


db.sequelize.sync({ force: true }).then(() => {
    console.log("Synced db.");
})
.catch((err) => {
    console.log("Failed to sync db: " + err.message);
});

app.use('/', indexRouter);
app.use('/permits', permitRoutes);

module.exports = app;
