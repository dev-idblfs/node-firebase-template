
const express = require('express')
const path = require('path')
const bodyParser = require("body-parser")
const cors = require("cors")

const cookieParse = require('cookie-parser');

// setting up global variables
global.ROOT_DIR = path.resolve(__dirname);

var port = process.env.PORT || 8080;

// init express
var app = module.exports = express()

// server static files
// app.use('/public', express.static(path.join(__dirname, 'public')))


// parse request bodies (req.body)
app.use(express.urlencoded({ extended: true }))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse applilcation/json
app.use(bodyParser.json());

app.use(cookieParse())

app.use(cors());


app.use((req, res, next) => {
    const OY_ENV = process.env.NODE_ENV || 'development'

    next();
})

app.use(require('./config/routes'));

app.use((err, req, res, next) => {

    console.log(err);
    // res.status(500).render('error');
    res.status(500)
})

app.use((req, res, next) => {
    res.status(404);
})

app.listen(port, () => console.log(`I'm running @ ${port}`))
