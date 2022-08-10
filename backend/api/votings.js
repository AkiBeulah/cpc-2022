const express = require('express');
const router = express.Router()

const Voting = require('../models/voting');
const nodemailer = require("nodemailer");

const emailRegEx = new RegExp('[a-zA-Z]+.[a-zA-Z]+@(stu.cu.edu.ng|covenantuniversity.edu.ng)')
// const matricNoRegEx = new RegExp("[0-9]{2}[a-zA-Z]{2}[0-9]{5,6}\\b")
router.post('/', (req, res) => {
    console.log("voting")
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
        .then((res) => {
            mailer([email], "Confirmation on submitted votes!", "", () => htmlRender(res.data.id))
                .then((resp) => {
                    return resp.status(201).json({
                        message: "Your votes have been successfully submitted!"
                    })
                })
        })
        .catch(err => {
            console.log(err)

            return res.status(400).json({
                "error": err,
                "message": "Something went wrong please try again!"
            })
        })
})

router.patch('/:id', (req, res) => {
    const id = req.params.id
    console.log('updating')
    Voting.findByIdAndUpdate(id, {
        confirmation: true
    }, {new: true}, (e, i) => {
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
        html: html, // html body
    });
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

mailer().catch(console.error);

module.exports = router

const htmlRender = (id) => {
    return `
    <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>THANKS FOR VOTING AT THE WINGS AWARDS</title>
              <style>
              .container {
              width: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }
            
            .container > div {
              border: solid 24px #9333EA;
              width: 100%;
              max-width: 720px;
              margin: auto;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              text-align: center;
                padding: 24px 0;
            }
            
            .container > div > div > span {
              color: black;
              width: 20px;
            }
            
            .container > div > div > span > svg {
              font-size: 36px;
            }
            
            .container > div > div > p {
              color: black;
              font-size: 24px;
            }
            
            .button {
              display: block;
              padding: 8px 12px;
              background: #9333EA;
              outline: none;
              border: none;
              color: #fff;
              text-decoration: none;
              width: fit-content;
            }
              </style>
            </head>
            <body class="container">
              <div>
                <img src="https://cpc-2022-alpha-testing.herokuapp.com/favicon.ico" alt="CPC Logo">
                
                <div>
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
                  </span>
                  
                  <p>
                    Thanks for Voting in the 2022 Wings Awards!
                    <br/>
                    Please click the link below to confirm your votes and have them counted.
                  </p>
                  
                  <a href="https://cpc-2022-alpha-testing.herokuapp.com/wings_confirmation/${id}" class="button">
                    Confirm Votes
                  </a>
                </div>
              </div>
            </body>
            </html>
    `.toString()
}