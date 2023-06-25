const Categoria = require('../models/categoria')
const Producto = require('../models/producto')

module.exports = {
    getPrincipal: async (req, res) => {
        const categorias = await _findCategorias()
        const serializeCategorias = JSON.stringify(categorias)

        res.status(200).render('Tienda/Principal.hbs', { listaCategorias: serializeCategorias })
    },
    getProductos: async (req, res) => {
        const pathCategoria = req.params.cat 
        let criteria = {}

        if (pathCategoria) {
            criteria.pathcategoria = pathCategoria 
        }
        
        const productos  = await Producto.find(criteria).lean()
        const categorias = await _findCategorias()
        const serializeCategorias = JSON.stringify(categorias)

        res.status(200).render('Tienda/Productos.hbs', { listaCategorias: serializeCategorias, listaProductos: productos })
    }
}

async function _findCategorias() {
    return Categoria.find().lean()
}
