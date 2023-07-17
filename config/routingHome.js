const express    = require('express')
const router     = express.Router()
const errHandler = require('../lib/error-handler')
const { URL }    = require('../models/enums')

router.get("/", errHandler(getHome))

function getHome(req, res) {
    res.redirect(URL.HOME)
}

module.exports = router