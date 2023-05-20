const mongoose = require('mongoose')

const clienteSchema = new mongoose.Schema({
    nombre:          { type: String, required: true },
    primerApellido:  { type: String },
    segundoApellido: { type: String },
    cuentaActiva:    { type: Boolean, default: false },
    tipoIdentificacion: { 
        tipoId: { type: String }, 
        numId:  { type: String } 
    },
    naacimiento: { type:Date, default: Date.now() },
    credenciales:{ 
        email: { type: String }, 
        hash:  { type: String },
    },
    telefono: [{ 
        numero:     { type: String },
        esPrincipal:{ type: Boolean }
    }], 
    direccion: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Direccion'
    }], 
    historicoPedidos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pedido'
    }],
    pedidoActual: { type: mongoose.Schema.Types.ObjectId, ref: 'Pedido' },
})
module.exports = mongoose.model('Cliente', clienteSchema, 'clientes')