const express          = require('express')
const router           = express.Router()
const pedidoController = require('../controllers/pedido')
const errHandler       = require('../lib/error-handler')

router.get("/MostrarPedido", errHandler(pedidoController.mostrarPedido))

module.exports = router