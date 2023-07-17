const _         = require('lodash')
const Municipio = require('../models/municipio')
const Producto  = require('../models/producto')
const Pedido    = require('../models/pedido')
const { DataNotFoundError } = require('../errors/custom')
const { ERROR_MESSAGE } = require('../models/enums')

module.exports = {
    getMunicipios: async (req, res) => {
        const codProvincia = req.params.id
        const municipios = await Municipio.find({ codProvincia }).lean()

        if (!municipios) {
            throw new DataNotFoundError(ERROR_MESSAGE.MUNICIPIOS)
        }

        res.status(200).json(municipios)
    },
    postFinalizarCompra: async (req, res) => {
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

        if (!articulos) {
            throw new DataNotFoundError(ERROR_MESSAGE.ARTICULOS)
        }

        pedido.articulos = articulos
        pedido.estado = "en curso"
        await pedido.calcularTotalPedido()
        await pedido.save()

        // actualizamos session con el producto expandido 
        pedido.articulos = await Producto.populate(articulos, { path: 'productoItem' })
        
        if (!pedido?.articulos) {
            throw new DataNotFoundError(ERROR_MESSAGE.PRODUCTOS)
        } 
        
        req.session.cliente.pedidoActual = pedido
        
        res.status(204).send()
    }
}
