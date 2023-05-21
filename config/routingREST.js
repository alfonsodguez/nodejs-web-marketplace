const express = require('express')
const router = express.Router()
const restController = require('../controllers/rest')

router.get("/getMunicipios/:codpro", restController.getMunicipios)

module.exports = router