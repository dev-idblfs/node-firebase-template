

const express = require("express"),
    router = express.Router();
const mail = require('../utils/mail');


router.post("/login", (req, res) => {

    if (Object.keys(req.headers).length > 0) {
        let data = {};
        if (req.headers.email && req.headers.pwd) {
            data.email = req.headers.email
            data.pwd = req.headers.pwd
        }

        let to = data.email;
        let subject = 'User SignIN';
        let message = `<br><br>, thankyou for signIN email : ${to} with password pass: ${data.pwd}`;

        mail.send(to, subject, message).then((v) => {
            if (v.accepted.length > 0) {
                res.json({ email: to })
            } else {
                res.json({ body: 'something went wrong' })
            }
        }).catch(e => {
            res.json({ body: 'something went wrong' })
        })

    }
})


router.post("/signup", (req, res) => {
    if (Object.keys(req.headers).length > 0 && Object.keys(req.body).length > 0) {
        let data = {};
        if (req.headers.email && req.headers.pwd) {
            data.email = req.headers.email
            data.pwd = req.headers.pwd
        }
        if (req.body.name) {
            data.name = req.body.name
        }
        let to = data.email;
        let subject = 'User SignUP';
        let message = `hey ${data.name} <br><br>, thankyou for signUp email : ${to} with password pass: ${data.pwd}`;


        mail.send(to, subject, message).then((v) => {
            if (v.accepted.length > 0) {


                res.json({ email: to })

            } else {
                res.json({ body: 'something went wrong' })
            }
        }).catch(e => {
            res.json({ body: 'something went wrong' })
        })

    }
})


const setCookies = (req = {}, res = {}, name = '', value = '') => {
    let key = name;
    let val = value;
    res.cookie(key, val, { maxAge: 600000, httpOnly: true }); // expaire after  10 mins
}

const getCookies = (req = {}, res = {}, name = '') => {
    let key = name;
    if (req.cookies[key]) {
        return req.cookies[key]
    }
    return false
}


module.exports = router;