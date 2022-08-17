const mongoose = require('mongoose');
require("dotenv").config()
const connection = `mongodb+srv://${process.env.DB_USERNM}:${process.env.DB_PSSWRD}@cluster0.1wfkzsd.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, console.log(`Database Connected Successfully`))
    .catch(err => console.log(err));