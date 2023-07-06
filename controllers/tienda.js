const Categoria = require('../models/categoria')
const Producto = require('../models/producto')
const {RENDER_PATH} = require('../models/enums')

module.exports = {
    getPrincipal: async (req, res) => {
        const categorias = await _findCategorias()
        const serializeCategorias = JSON.stringify(categorias)

        res.status(200).render(RENDER_PATH.HOME, { listaCategorias: serializeCategorias })
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

        res.status(200).render(RENDER_PATH.TIENDA, { listaCategorias: serializeCategorias, listaProductos: productos })
    }
}

async function _findCategorias() {
    return Categoria.find().lean()
}
