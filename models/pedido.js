const mongoose = require('mongoose')
const Producto = require('./producto')

const pedidoSchema = new mongoose.Schema({
    fecha:   { type: Date,   required: true, default: Date.now() },
    estado:  { type: String, required: true, default: 'pendiente' },
    cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' },
    gastosEnvio: { type: Number, required: true, default: 5 },
    subtotal:    { type: Number, required: true, default: 0 },
    total:       { type: Number, required: true, default: 0 },
    elementosPedido: [{
        productoItem: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
        cantidadItem: { type: Number, required: true  },
    }]
})

pedidoSchema.methods.calcularTotalPedido = async function() {
    const elementosPedidoExpanded = await Producto.populate(this.elementosPedido, { path: 'productoItem' })
    const subtotal = 0

    elementosPedidoExpanded.forEach((itemPedido) => {
            subtotal += itemPedido.productoItem.precio * itemPedido.cantidadItem
        }
    )
    this.subtotal = Math.round(subtotal * 100)/100
    this.total = subtotal + this.gastosDeEnvio
}

module.exports = mongoose.model("Pedido", pedidoSchema, "pedidos")