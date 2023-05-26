const mongoose = require('mongoose')

const categoriaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    path:   { type: String, required: true }
})
module.exports = mongoose.model('Categoria', categoriaSchema, 'categorias')