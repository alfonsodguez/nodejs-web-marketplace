const express           = require('express')
const router            = express.Router()
const clienteController = require('../controllers/cliente')
const errHandler        = require('../lib/error-handler')

router.route("/Registro")
      .get(errHandler(clienteController.getRegistro))
      .post(errHandler(clienteController.postRegistro))

router.route("/Login")
      .get(errHandler(clienteController.getLogin))
      .post(errHandler(clienteController.postLogin))
      
module.exports = router