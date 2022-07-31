const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
const app = express();
require('./database');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

// API
const events = require('./api/events')
const portraits = require('./api/portraits')
const souvenirs = require('./api/souvenirs')
const votings = require('./api/votings')

// app.use('/api/events', events)
// app.use('/api/portraits', portraits)
// app.use('/api/souvenirs', souvenirs)
// app.use('/api/votings', votings)

app.use(express.static(path.join(__dirname, '../build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'))
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});