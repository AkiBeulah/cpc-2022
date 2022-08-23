const mongoose = require("mongoose");

const schema = mongoose.Schema;

const souvenirSchema = new schema({
    MatricNo : {
        type : String,
        required : true
    },
    Status : {
        
    },
    Location : {},
},{ timestamps : true});

module.exports = mongoose.model("Souvenir", souvenirSchema);