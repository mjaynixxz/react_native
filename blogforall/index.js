const express = require('express');
const cors = require('cors')

const connectDB = require('./config/db');
const User = require('./Routes/users');
const Blog = require('./Routes/blogs');
const Auth = require('./Routes/auth');

const app = express();





app.use(cors())
app.use(express.json({ extended: false }));
app.use('/api/users', User);
app.use('/api/auth', Auth);
app.use('/api/blogs', Blog);
require('./prod')(app)




app.get('/', (req, res) => {
    res.send('Connected to server')
})

connectDB();

const port = process.env.PORT || 3500;


app.listen(port, () => console.log(`Server Listening on port ${port}`));