const Categoria = require('../models/categoria')
const Producto = require('../models/producto')

module.exports = {
    getPrincipal: async (req, res) => {
        const categorias = await _findCategorias()

        res.status(200).render('Tienda/Principal.hbs', { listaCategorias: categorias })
    },
    getProductos: async (req, res) => {
        const pathCategoria = req.params.cat
        const productos  = await Producto.find({pathCategoria}).lean()
        const categorias = await _findCategorias()
        
        res.status(200).render('Tienda/Productos.hbs', { listaCategorias: categorias, listaProductos: productos })
    }
}

async function _findCategorias() {
    return Categoria.find().lean()
}
