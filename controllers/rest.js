const _         = require('lodash')
const Municipio = require('../models/municipio')
const Producto  = require('../models/producto')
const Pedido    = require('../models/pedido')

module.exports = {
    getMunicipios: async (req, res) => {
        try {
            const codProvincia = req.params.id
            const municipios = await Municipio.find({ codProvincia }).lean()

            res.status(200).json(municipios)
        } catch (err) {
            res.status(500).send()
            console.log('Error al recuperar los municipios', err)
        }
    },
    postFinalizarCompra: async (req, res) => {
        try {
            /** 
             * req.body = [
             *      {ean: "...", nombre: "...", precio: "...", cantidad: ...},
             *      {ean: "...", nombre: "...", precio: "...", cantidad: ...},
             *      ...
             *    ]  
             */
            const pedidoEnCrudo = req.body;
            const pedido = new Pedido(req.session.cliente.pedidoActual)
            
            const articulos = await Promise.all(
                pedidoEnCrudo.map(async(itemPedido) => {
                    const producto = await Producto.findOne({ ean: itemPedido.ean }).select('_id cantidad').lean()

                    return {
                        productoItem: producto._id,
                        cantidadItem: itemPedido.cantidad
                    }
                })
            )

            pedido.articulos = articulos
            pedido.estado = "en curso"
            await pedido.calcularTotalPedido()
            await pedido.save()

            // actualizamos session con el producto expandido 
            pedido.articulos = await Producto.populate(articulos, { path: 'productoItem' })
            req.session.cliente.pedidoActual = pedido
           
            res.status(204).send()
        } catch (error) {
            res.status(500).send()
        }
    }
}
