const mongoose = require('mongoose')

const clienteSchema = new mongoose.Schema({
    nombre:          { type: String, required: true },
    primerApellido:  { type: String },
    segundoApellido: { type: String },
    nacimiento:      { type: Date,    default: Date.now(), required: true },
    cuentaActiva:    { type: Boolean, default: false },
    tipoIdentificacion: { 
        tipoId: { type: String, required: true }, 
        numId:  { type: String, required: true } 
    },
    credenciales:{ 
        email: { type: String, required: true }, 
        hash:  { type: String, required: true },
    },
    telefonos: [{ 
        numero:      { type: String,  required: true },
        esPrincipal: { type: Boolean, default: false }
    }], 
    direcciones:      [{ type: mongoose.Schema.Types.ObjectId, ref: 'Direccion', required: true}], 
    historicoPedidos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pedido', default: [] }],
    pedidoActual:      { type: mongoose.Schema.Types.ObjectId, ref: 'Pedido', default: null },
}, 
{ timestamps: true })
module.exports = mongoose.model('Cliente', clienteSchema, 'clientes')