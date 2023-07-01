const Pedido = require('../models/pedido')

module.exports = {
    mostrarPedido: (req,res) => {
        const pedido = req.session.cliente.pedidoActual

        res.status(200).render('Pedido/FinalizarPedido.hbs', { pedido })
    }
}
