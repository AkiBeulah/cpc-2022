const mongoose = require("mongoose");
const schema = mongoose.Schema

const nominee = new schema({
    category: {
        type: String,
        required: true,

    },
    fullname: {
        type: String,
        required: true
    },
    twitter: {
        type: String,
        required: true
    },
    instagram: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    created_at: {
        type: String,
        default: Date.now
    }

});

module.exports = mongoose.model('Nominee', nominee, "nominee");