const mongoose = require("mongoose");

const schema = mongoose.Schema

const portraitSchema = new schema({
    Image : {
        type : Image,
        required : true,
    },
    MatricNo : {
        type : String,
        required : true
    },
    Status : {},
    Location : {},
    
}, {timestamps : true});

module.exports = mongoose.model('Portrait',portraitSchema);