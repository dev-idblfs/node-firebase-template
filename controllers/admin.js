

const express = require("express"),
    router = express.Router();
const mail = require('../utils/mail');



router.get("/", async (req, res) => {
    res.json({ body: "working" });
})

router.get("/a", async (req, res) => {
    res.json({ body: req.url });
})


router.get("/b", async (req, res) => {
    res.json({ body: req.url });
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