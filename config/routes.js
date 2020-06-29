const express = require("express"),
    router = express.Router();

router.use("/", require(ROOT_DIR + '/controllers/admin'))

module.exports = router;
