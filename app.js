// external imports
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');

// internal imports
const { notFoundHandler, errorHandler } = require('./middlewares/common/errorHandler');
const loginRouter = require('./routes/loginRouter');
const usersRouter = require('./routes/usersRouter');
const inboxRouter = require('./routes/inboxRouter');

const app = express();
dotenv.config();

// database connection

const dbConnection = () => {
 mongoose
   .connect(process.env.DB_CONNECT_STRING, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
   })
   .then(function () {
     console.log("Database connected");
     return true;
   })
   .catch(function (err) {
     console.log(err);
   });
};


 // request parser 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view engine
app.set('view engine', 'ejs');

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// routing setup
app.use('/',loginRouter);
app.use('/users',usersRouter);
app.use('/inbox',inboxRouter);


// 404 not found handler
app.use(notFoundHandler);

// default or common error handler
app.use(errorHandler);


// server setup
app.listen(process.env.PORT, function () { 
 console.log(`Server running at port ${process.env.PORT}`);
 dbConnection();
});
