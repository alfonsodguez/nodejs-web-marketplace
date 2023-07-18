const Categoria = require('../models/categoria')
const Producto  = require('../models/producto')
const cache     = require('../lib/cache')
const { DataNotFoundError } = require('../errors/custom')
const { RENDER_PATH, ERROR_MESSAGE } = require('../models/enums')

module.exports = {
    getPrincipal: async (req, res) => {
        const categorias = await _findCategorias()

        if (!categorias) {
            throw new DataNotFoundError(ERROR_MESSAGE.CATEGORIAS)
        }
        
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
        if (!productos) {
            throw new DataNotFoundError(ERROR_MESSAGE.PRODUCTOS)
        }
        
        const categorias = await _findCategorias()
        if (!categorias) {
            throw new DataNotFoundError(ERROR.CATEGORIAS)
        }

        const serializeCategorias = JSON.stringify(categorias)

        res.status(200).render(RENDER_PATH.TIENDA, { listaCategorias: serializeCategorias, listaProductos: productos })
    }
}

async function _findCategorias() {
    const key = 'catg'
    let categorias = cache.get(key)

    if (!categorias) {
        categorias = await Categoria.find().lean()

        cache.set(key, categorias)
    }

    return categorias
}
