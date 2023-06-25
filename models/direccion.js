const mongoose = require('mongoose')

const direccionSchema = new mongoose.Schema({
    clienteId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' },
    esPrincipal: { type: Boolean, required: true, default: false },
    tipo:   { type: String, required: true },
    nombre: { type: String, required: true },
    numero: { type: String, default: '' },
    piso:   { type: String, default: '' },
    puerta: { type: String, default: '' },
    bloque: { type: String, default: '' },
    escalera:      { type: String, default: '' },
    urbanizacion:  { type: String, default: '' },
    observaciones: { type :String, default: '' },
    provincia: { type: mongoose.Schema.Types.ObjectId, ref: 'Provincia' },
    municipio: { type: mongoose.Schema.Types.ObjectId, ref: 'Municipio' },
    cp:        { type: Number, required: true },
})
module.exports = mongoose.model('Direccion', direccionSchema, 'direcciones')