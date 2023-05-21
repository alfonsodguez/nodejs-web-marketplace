const express = require('express');
const router = express.Router(); 
const tiendaController = require('../controllers/tienda');

router.get("/Principal",      tiendaController.getPrincipal);
router.get("/Productos/:cat", tiendaController.getProductos);
      
module.exports = router;