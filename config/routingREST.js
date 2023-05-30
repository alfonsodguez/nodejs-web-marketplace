const express = require('express')
const router = express.Router()
const restController = require('../controllers/rest')

router.get("/getMunicipios/:codpro", restController.getMunicipios)
router.post("/finalizarCompra",      restController.postFinalizarCompra)

module.exports = router