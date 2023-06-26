const mongoose = require('mongoose')

const direccionSchema = new mongoose.Schema({
    clienteId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
    esPrincipal: { type: Boolean, default: false },
    tipo:     { type: String, required: true },
    nombre:   { type: String, required: true },
    numero:   { type: String, required: true },
    piso:     { type: String, default: '' },
    puerta:   { type: String, default: '' },
    bloque:   { type: String, default: '' },
    escalera: { type: String, default: '' },
    urbanizacion:  { type: String, default: '' },
    observaciones: { type :String, default: '' },
    provincia: { type: mongoose.Schema.Types.ObjectId, ref: 'Provincia', required: true },
    municipio: { type: mongoose.Schema.Types.ObjectId, ref: 'Municipio', required: true },
    cp:        { type: Number, required: true },
})
module.exports = mongoose.model('Direccion', direccionSchema, 'direcciones')