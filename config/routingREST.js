const _                   = require('lodash')
const express             = require('express')
const router              = express.Router()
const restController      = require('../controllers/rest')
const checkSessionCliente = require('../middlewares/check-session')
const errHandler          = require('../lib/error-handler')
const { URL }             = require('../models/enums')

router.get("/municipios/:id", errHandler(restController.getMunicipios))
router.post("/finalizarCompra", checkSessionCliente, errHandler(restController.postFinalizarCompra))

function _checkSessionCliente(req, res, next) {  
    const session = req.session?.cliente
    if (session) {
        next()
    } else {
        res.redirect(URL.LOGIN)
    }
}

module.exports = router