const express = require('express');
const router = express.Router()

const Voting = require('../models/voting');
const nodemailer = require("nodemailer");

const emailRegEx = new RegExp('[a-zA-Z]+.[a-zA-Z]+@(stu.cu.edu.ng|covenantuniversity.edu.ng)')
// const matricNoRegEx = new RegExp("[0-9]{2}[a-zA-Z]{2}[0-9]{5,6}\\b")
router.post('/', (req, res) => {
    const {email, data} = req.body;
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
        .then(() => {
            mailer([email], "Confirmation on submitted votes!", "", "SUBMIT VOTES")
                .then(() => {
                    return res.status(201).json({
                        message: "Your votes have been successfully submitted!"
                    })
                })
        })
        .catch(err => {
            return res.status(400).json({
                "error": err,
                "message": "Something went wrong please try again!"
            })
        })
})

router.patch('/:id', (req, res) => {
    const id = req.params.id

    Voting.findByIdAndUpdate(id, {
        confirmation: true
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id

    Voting.findById(id, (err, info)=> {
        res.json(info)
    })
})

// async..await is not allowed in global scope, must use a wrapper
async function mailer(recipient, subject, text, html) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Akindele Beulah O." <headtechcpc@covenantuniversity.edu.ng>', // sender address
        to: recipient, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        html: '<!DOCTYPE html>\n' +
            '<html lang="en">\n' +
            '<head>\n' +
            '  <meta charset="UTF-8">\n' +
            '  <meta http-equiv="X-UA-Compatible" content="IE=edge">\n' +
            '  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
            '  <title>THANKS FOR VOTING AT THE WINGS AWARDS</title>\n' +
            '  <style>\n' +
            '  .container {\n' +
            '  width: 100%;\n' +
            '  display: flex;\n' +
            '  flex-direction: column;\n' +
            '  justify-content: center;\n' +
            '  align-items: center;\n' +
            '}\n' +
            '\n' +
            '.container > div {\n' +
            '  border: solid 24px #9333EA;\n' +
            '  width: 100%;\n' +
            '  max-width: 720px;\n' +
            '  margin: auto;\n' +
            '  display: flex;\n' +
            '  flex-direction: column;\n' +
            '  justify-content: center;\n' +
            '  align-items: center;\n' +
            '  text-align: center;\n' +
            '    padding: 24px 0;\n' +
            '}\n' +
            '\n' +
            '.container > div > div > span {\n' +
            '  color: black;\n' +
            '  width: 20px;\n' +
            '}\n' +
            '\n' +
            '.container > div > div > span > svg {\n' +
            '  font-size: 36px;\n' +
            '}\n' +
            '\n' +
            '.container > div > div > p {\n' +
            '  color: black;\n' +
            '  font-size: 24px;\n' +
            '}\n' +
            '\n' +
            '.button {\n' +
            '  display: block;\n' +
            '  padding: 8px 12px;\n' +
            '  background: #9333EA;\n' +
            '  outline: none;\n' +
            '  border: none;\n' +
            '  color: #fff;\n' +
            '  text-decoration: none;\n' +
            '  width: fit;\n' +
            '}\n' +
            '  </style>\n' +
            '</head>\n' +
            '<body class="container">\n' +
            '  <div>\n' +
            '    <img src="" alt="CPC Logo">\n' +
            '    \n' +
            '    <div>\n' +
            '      <span>\n' +
            '        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">\n' +
            '  <path stroke-linecap="round" stroke-linejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />\n' +
            '</svg>\n' +
            '      </span>\n' +
            '      \n' +
            '      <p>\n' +
            '        Thanks for Voting in the 2022 Wings Awards!\n' +
            '        <br/>\n' +
            '        Please click the link below to confirm your votes and have them counted.\n' +
            '      </p>\n' +
            '      \n' +
            '      <a href="" class="button">\n' +
            '        Confirm Votes\n' +
            '      </a>\n' +
            '    </div>\n' +
            '  </div>\n' +
            '</body>\n' +
            '</html>', // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

mailer().catch(console.error);

module.exports = router