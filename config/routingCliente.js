const express = require('express')
const router = express.Router()
const clienteController = require('../controllers/cliente')

router.route("/Registro")
      .get(clienteController.getRegistro)
      .post(clienteController.postRegistro)

router.route("/Login")
      .get(clienteController.getLogin)
      .post(clienteController.postLogin)
      
module.exports = router