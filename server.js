const express = require("express")
const sanitize = require("express-mongo-sanitize")
const xss = require("xss-clean");
const helmet = require("helmet");
const hpp = require("hpp");
const rateLimit = require('express-rate-limit')
const cors = require('cors');
const path = require('path')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const connectDB = require('./config/db')

const app = express();
connectDB();
// app.use(express.json({ extended: false}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(sanitize());
// app.use(helmet());
// app.use(xss());
// app.use(hpp());
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, //10mins
  max: 100
});
// app.use(limiter);

app.use(cors({
  origin: "http://localhost:3000", //location of react app
  credentials:true
}));
// Sessions
app.use(
  session({
    // secret: process.env.EXPRES_SESSION_SECRET,
    secret: 'keyboardcat',
    resave: true,
    saveUninitialized: true,
    // cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
  })
)
app.use(cookieParser('keyboardcat'))//SECRET must be the same as express Sessions
app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)

app.use('/auth', require('./routes/auth.route'))
// app.use('/users', require('./routes/users.route'))
app.use('/profile', require('./routes/profile.route'))
app.use('/posts', require('./routes/posts.route'))

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    // redirect users with other endpoints
    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log( `Server started on port ${PORT}`))