const express = require("express")
const connectDB = require('./config/db')

const app = express();
//connect databse
connectDB();
//init middleware
app.use(express.json({ extended: false}));
app.get('/', (req, res)=> res.send('API working'))
// define api endpin - troutes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/posts', require('./routes/api/posts'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/auth', require('./routes/api/auth'))



// listen to the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log( `Server started on port ${PORT}`))