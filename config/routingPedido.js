const express = require('express')
const router = express.Router()
const pedidoController = require('../controllers/pedido')

router.get("/MostrarPedido", pedidoController.mostrarPedido)

module.exports = router