const express = require('express')
const router = express.Router()

router.get("/", getHome)

function getHome(req, res) {
    const urlHome = 'http://localhost:3000/Tienda/Principal'

    res.redirect(urlHome)
}

module.exports = router