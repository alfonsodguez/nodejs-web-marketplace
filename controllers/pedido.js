var Producto = require('../models/producto'); 

module.exports = {
    mostrarPedido: (req,res) => {
        res.status(200).render('Pedido/FinalizarPedido.hbs',{pedido: req.session.cliente.pedidoActual });
    }
}
