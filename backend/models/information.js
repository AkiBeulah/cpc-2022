const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const information = new Schema({
    title: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    data: {
        type: String,
        required: true
    },
    created_at: {
        type: String,
        default: Date.now
    }
})
module.exports = mongoose.model("Information", information, "information")