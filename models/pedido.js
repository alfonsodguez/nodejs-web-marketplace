const mongoose = require('mongoose')
const Producto = require('./producto')

const pedidoSchema = new mongoose.Schema({
    clienteId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' },
    fecha:       { type: Date,   required: true, default: Date.now() },
    estado:      { type: String, required: true, default: 'pendiente' },
    gastosEnvio: { type: Number, required: true, default: 5 },
    subtotal:    { type: Number, required: true, default: 0 },
    total:       { type: Number, required: true, default: 0 },
    articulos: [{
        productoItem: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
        cantidadItem: { type: Number, required: true  },
    }]
}, { timestamps: true})

pedidoSchema.methods.calcularTotalPedido = async function() {
    const articulosExpanded = await Producto.populate(this.articulos, { path: 'productoItem' })
    const subtotal = 0

    articulosExpanded.forEach((articulo) => {
            subtotal += articulo.productoItem.precio * articulo.cantidadItem
        }
    )
    this.subtotal = Math.round(subtotal * 100)/100
    this.total = subtotal + this.gastosDeEnvio
}

module.exports = mongoose.model("Pedido", pedidoSchema, "pedidos")