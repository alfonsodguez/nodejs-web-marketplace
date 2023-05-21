const mongoose = require('mongoose')

const productoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    ean:    { type: String , default:'' },
    precio:     { type: Number, required: true },
    precioKilo: { type: Number, required: true },
    pathCategoria:    { type: String, required: true },
    marcaProveedor:   { type: String, required: true },
    infoIngredientes: { type: String , default:'' },
    infoNutricional:  { type: String , default:'' }
})
module.exports = mongoose.model('Producto', productoSchema, 'productos')