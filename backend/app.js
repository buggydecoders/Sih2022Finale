const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors');
// const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const path = require('path');
const hpp = require('hpp');
const session = require('express-session')
var cookieParser = require('cookie-parser')
const globalErrorHandler = require('./middlewares/globalErrorHandler');
const AppError = require('./utils/appError');
const authRoute = require('./routes/auth-route')
const reqRoute = require('./routes/request-route')
const resRoute = require('./routes/resource-route');
const chatRoomRouter = require('./routes/chatRoom-route');
const requirementroute = require('./routes/requirement-route')
const contractRoute = require('./routes/contract-route')
const adminRoute = require('./routes/admin-route')
// view engine setup

// var whitelist = ['http://example1.com', 'http://example2.com']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
// app.use(cors(corsOptions))

var allowCrossDomain = function (req, res, next) {
    let allowedOrigins = ["http://localhost:3000", "http://localhost:5000"]
    origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', true);
    next();
}

app.use(allowCrossDomain);

app.use(express.json());
app.use(cookieParser())
app.use(session({
    secret: 'somethingsecretgoeshere',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true }
}));


// set security http headers
app.use(helmet());
app.use(bodyParser.json());

// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'));
// }

//  CORS
// app.use(cors());

//  set limit request from same API in timePeroid from same ip
const limiter = rateLimit({
    max: 15000, //   max number of limits
    windowMs: 60 * 60 * 1000, // hour
    message: ' Too many req from this IP , please Try  again in an Hour ! ',
});

app.use('/api', limiter);

//  Body Parser  => reading data from body into req.body protect from scraping etc
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSql query injection
app.use(mongoSanitize()); //   filter out the dollar signs protect from  query injection attact

// Data sanitization against XSS
app.use(xss()); //    protect from molision code coming from html

// testing middleware
app.use((req, res, next) => {
    next();
});


// routes
app.use('/api/auth', authRoute)
app.use('/api/request', reqRoute)
app.use('/api/resource', resRoute)
app.use('/api/chat-room', chatRoomRouter);
app.use('/api/requirement', requirementroute);
app.use('/api/contract', contractRoute);
app.use('/api/admin', adminRoute)



// handling all (get,post,update,delete.....) unhandled routes
app.all('*', (req, res, next) => {
    next(
        new AppError(`Can't find ${req.originalUrl} on the server`, 404)
    );
});

// error handling middleware
app.use(globalErrorHandler);

module.exports = app;