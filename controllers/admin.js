

const express = require("express"),
    router = express.Router();
const mail = require('../utils/mail');
const modalAdmin = require('../modals/admin');


router.post("/fetch", async (req, res) => {

    if (Object.keys(req.body).length > 0) {
        let data = {};

        if (req.body.email) {
            data.email = req.body.email
        }

        let userList = await modalAdmin.fetch({ email: data.email });

        let found = false;

        let result = {};

        if (Array.isArray(userList.data) && userList.data.length > 0) {
            delete userList.data[0].pwd;

            result = userList.data[0];
            found = true;
        }

        if (found) {
            return res.json(result);
        }
    }

    res.json({ body: "Something went wrong" });
});



router.post("/login", async (req, res) => {

    if (Object.keys(req.headers).length > 0) {
        let data = {};
        if (req.headers.email && req.headers.pwd) {
            data.email = req.headers.email
            data.pwd = req.headers.pwd
        }

        let to = data.email;
        let subject = 'User SignIN';
        let message = `<br><br>, thankyou for signIN email : ${to} with password pass: ${data.pwd}`;

        let userList = await modalAdmin.fetch({ email: data.email, pwd: data.pwd });

        let found = false;
        let loginCount = 0;
        if (Array.isArray(userList.data) && userList.data.length > 0) {
            userList.data.forEach(async element => {
                if (element.email == data.email && element.pwd == data.pwd) {
                    found = true;
                    loginCount = element.loginCount + 1;
                }
            });
        }
        if (found) {
            let where = {
                email: data.email,
                pwd: data.pwd
            }

            let updateValue = {
                loginCount: loginCount,
                updatedAt: Date()
            }

            modalAdmin.update(where, updateValue);

            mail.send(to, subject, message)

            return res.json(userList.data[0]);
        }

        res.json({ body: "Something went wrong" });
    }
})


router.post("/signup", async (req, res) => {
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

        data.createAt = Date();
        data.updatedAt = Date();
        data.loginCount = 0;

        let userList = await modalAdmin.fetch({ email: data.email });

        let isNotFound = true;
        // console.log(Array.isArray(userList.dat));
        if (Array.isArray(userList.data) && userList.data.length > 0) {
            userList.data.forEach(element => {
                if (element.email == data.email) {
                    isNotFound = false;
                }
            });
        }

        if (isNotFound) {
            mail.send(to, subject, message);

            let result = await modalAdmin.insert(data);

            if (result.status == 200) {
                let finalData = {
                    name: data.name,
                    email: data.email,
                    lastLogin: data.createAt,
                    loginCount: data.loginCount
                }
                return res.json(finalData)
            }
            return res.json({ body: 'something went wrong' })
        }

        res.json({ body: "Something went wrong" });
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