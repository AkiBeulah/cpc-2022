const express = require('express');
const router = express.Router()

const Event = require('../models/event');

// Endpoint for creating events
// POST request
// [url]/api/events/

router.post('/', (req, res) => {
    const { image_url, title, subtitle } = req.body;

    const newEvent = new Event({
        image_url: image_url,
        title: title,
        subtitle: subtitle,
    })

    newEvent.save()
        .then((resp) => {
            return res.status(201).json({
                message: "Created Sucessfully"
            })
            console.log(resp)
        })
})

router.get('/', (req, res) => {
    Event.find()
    .then((resp) => {
        return res.status(200).json({
            events: resp
        })
    })
})

module.exports = router