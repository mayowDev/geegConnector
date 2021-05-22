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
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));//default is true

app.use(cors({ 
  origin: "http://localhost:3000",
  credentials: true,     
  allowHeaders:"Origin, X-Requested-With, Content-Type, Accept"
}))
app.set("trust proxy", 1);
app.use(
  session({
    secret: "keyboardcat",
    resave: true,
    saveUninitialized: true,
    cookie: {
      sameSite: "none",
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7 // One Week
    }
  }))
// Sessions
// app.use(
//   session({
//     // secret: process.env.EXPRES_SESSION_SECRET,
//     secret: 'keyboardcat',
//     resave: true,
//     saveUninitialized: true,
//     // cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
//   })
// )
app.use(cookieParser('keyboardcat'))//SECRET must be the same as express Sessions
app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)

app.use('*', function(req, res, next) {
  //replace localhost:8080 to the ip address:port of your server
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next(); 
});
  
  //enable pre-flight
// app.options('*', cors());

app.use('/auth', require('./routes/auth.route'))
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

module.exports = app