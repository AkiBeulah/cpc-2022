const express = require('express');
const router = express.Router()

const Information = require('../models/information')

router.post('/', (req, res) => {
    const {title, data} = req.body;
    const newInfo = new Information({
        title: title,
        data: data
    })
    newInfo.save()
        .then(() => {
            return res.status(201).json({
                message: "Info successfully logged!"
            })
        })
        .catch(err => {
            return res.status(400).json({
                "error": err,
                "message": "Something went wrong please try again!"
            })
        })
})

router.get('/:title', (req, res) => {
    const title= req.params.title

    Information.findOne({title: title}, (err, info) => {
        res.json(info)
    })
})

module.exports = router