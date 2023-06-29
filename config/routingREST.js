const _ = require('lodash')
const express = require('express')
const router = express.Router()
const restController = require('../controllers/rest')

router.get("/municipios/:id", restController.getMunicipios)
router.post("/finalizarCompra", _checkSessionCliente, restController.postFinalizarCompra)

function _checkSessionCliente(req, res, next) {  
    const session = req.session?.cliente
    if (session) {
        next()
    }
    res.redirect('http://localhost:3000/Cliente/Login')
}

module.exports = router