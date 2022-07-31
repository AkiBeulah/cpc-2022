const mongoose = require('mongoose');
const connection = "mongodb+srv://head-of-tech:8F2FVl44XMWXBIfF@cluster0.1wfkzsd.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, console.log(`Database Connected Successfully`))
    .catch(err => console.log(err));