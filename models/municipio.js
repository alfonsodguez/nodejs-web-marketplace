const mongoose = require('mongoose')

const municipioSchema = new mongoose.Schema({
    CodPro: { type: Number, required: true },
    CodMun: { type: Number, required: true },
    NombreMunicipio: { type:String,  required: true }
})

module.exports = mongoose.model('Municipio', municipioSchema)
