const express          = require('express')
const router           = express.Router() 
const tiendaController = require('../controllers/tienda')
const errHandler       = require('../lib/error-handler')

router.get("/Principal",       errHandler(tiendaController.getPrincipal))
router.get("/Productos/:cat?", errHandler(tiendaController.getProductos))
      
module.exports = router