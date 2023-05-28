const express = require('express')
const router = express.Router()
const pedidoController = require('../controllers/pedido')

router.get("/FinalizarPedido", pedidoController.mostrarPedido)

module.exports = router