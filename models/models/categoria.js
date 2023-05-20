const mongoose = require('mongoose')

const categoriaSchema = new mongoose.Schema({
    categoria:     { type: String, required: true },
    pathCategoria: { type: String, required: true }
})
module.exports = mongoose.model('Categoria', categoriaSchema, 'categorias')