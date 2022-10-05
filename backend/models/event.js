const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const event = new Schema({
    image_url: {
        type: String,
        index: true,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    link: {
      type: String,
      required: true,
      default: "/"  
    },
    date: {
        type: String,
        required: true,
        default: "..."
    },
    created_at: {
        type: String,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model("Event", event, "event")