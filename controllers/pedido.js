const Pedido = require('../models/pedido')
const {RENDER_PATH} = require('../models/enums')

module.exports = {
    mostrarPedido: (req,res) => {
        const pedido = req.session.cliente.pedidoActual

        res.status(200).render(RENDER_PATH.FIN_PEDIDO, { pedido })
    }
}
