const express = require('express');
const router = express.Router()
require('dotenv').config();

const Voting = require('../models/voting');
const Nominee = require('../models/nominee');
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

const emailRegEx = new RegExp('[a-zA-Z]+.[a-zA-Z]+@(cu.edu.ng|stu.cu.edu.ng|covenantuniversity.edu.ng)')
// const matricNoRegEx = new RegExp("[0-9]{2}[a-zA-Z]{2}[0-9]{5,6}\\b")
router.post('/', (req, res) => {
    const { email, data } = req.body;
    if (!emailRegEx.test(email)) {
        return res.status(400).json({
            "message": "This is not a Covenant University Email"
        })
    }

    const newVote = new Voting({
        email: email,
        data: data
    })

    newVote.save()
        .then((resp) => {
            try {
                mailer([email], "Confirmation on submitted votes!", resp._id.toString())
                return res.status(201).json({
                    message: "Your votes have been successfully submitted!"
                })
            } catch (err) {
                console.log(err)

                return res.status(400).json({
                    "error": err,
                    "message": "Something went wrong please try again!"
                })

            }
        })
        .catch(err => {
            console.log(err)

            return res.status(400).json({
                "error": err,
                "message": "Something went wrong please try again!"
            })
        })
})

router.post("/nominee", ((req, res) => {
    const { category, image_url, fullname, twitter, instagram } = req.body

    const newNominee = new Nominee({
        category: category,
        image_url: image_url,
        fullname: fullname,
        twitter: twitter,
        instagram: instagram,
    })

    newNominee.save()
        .then(() => {
            return res.status(201).json({
                message: "Your votes have been successfully submitted!"
            })
        })
        .catch(err => {
            console.log(err)

            return res.status(400).json({
                "error": err,
                "message": "Something went wrong please try again!"
            })
        })
}))

router.patch('/:id', (req, res) => {
    const id = req.params.id
    console.log('updating')
    Voting.findByIdAndUpdate(id, {
        confirmation: true
    }, { new: true }, (e, i) => {
        if (e) return res.status(400).json({
            "message": "Sorry Something went wrong!"
        })
        else res.json(i)
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id

    Voting.findById(id, (err, info) => {
        res.json(info)
    })
})

const mailer = async (recipient = "headtechcpc@covenantuniversity.edu.ng", subject, id) => {
    const filePath = path.join(__dirname, '../templates/voting_confirmation_mail_template.html');
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = handlebars.compile(source);
    const replacements = {
        id: id
    };
    const htmlToSend = template(replacements);

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            name: "Akindele Beulah O.",
            user: process.env.MAILER_EMAIL,
            pass: process.env.MAILER_PSSWD,
        },
    });

    let info = await transporter.sendMail({
        from: '"Akindele Beulah O." <headtechcpc@covenantuniversity.edu.ng>',
        to: recipient,
        subject: "Confirmation on Submitted Votes!",
        text: "https://cpc-2022-alpha-testing.herokuapp.com/wings_confirmation/" + id,
        html: htmlToSend
    });
    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

mailer().catch(console.error);

module.exports = router