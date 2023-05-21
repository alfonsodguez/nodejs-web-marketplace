const mongoose = require('mongoose')
const Provincia = require('../models/provincia')
const Cliente = require('../models/cliente')
const Pedido = require('../models/pedido')

const URL = {
    PRODUCTOS: 'http://localhost:3000/Tienda/Productos/15-8-5'
}

module.exports = {
    getLogin: (req, res) => { 
        res.status(200).render('Cliente/Login.hbs', { layout: null } ) 
    },
    postLogin: async (req, res) => {
        try {
            const {password, email} = req.body
        
            const cliente = await Cliente
                .findOne({'credenciales.email': email})
                .populate([{ 
                    path: 'direccion', 
                    model: 'Direccion', 
                    populate: [
                        { path: 'provincia', model: 'Provincia' },
                        { path: 'municipio', model: 'Municipio '}
                    ]
                },{ 
                    path: 'historicoPedidos', 
                    model: 'Pedido', 
                    populate: [
                        { path: 'elementosPedido.productoItem', model: 'Producto' }
                    ]
                }])
                .lean()

            if (cliente) {
                const hash = cliente.credenciales.hash
                const isValidPassword = bcrypt.compareSync(password, hash)
            
                if (isValidPassword) {
                    const pedido = new Pedido({
                        _id: new mongoose.Types.ObjectId(),
                        fecha: Date.now(),
                        estado: 'pendiente',
                        cliente: cliente._id,
                        gastosEnvio: 5,
                        subtotal: 0,
                        total: 0,
                        elementosPedido: []
                    })
                
                    cliente.pedidoActual = pedido
                    req.session.cliente = cliente
                    
                    res.status(200).redirect(URL.PRODUCTOS);
                }
            }
            res.status(200).render('Cliente/Login.hbs', { layout: null,  mensajeErrorCustom: "Email o contraseña incorrectas, vuelve a intentarlo" })
        } catch (error) {
            res.status(200).render('Cliente/Login.hbs', { layout: null, mensajeError: 'Error en el server...'})
        }
    },
    getRegistro: async (req, res) => { 
        const provincias =  await _findProvincias()
        
        res.status(200).render('Cliente/Registro.hbs', { layout: null, listaProvincias: provincias}) 
    },
    postRegistro: async (req, res) => {

    }
}

async function _findProvincias() {
    return Provincia.find().sort({nombreProvincia: 1}).lean()
}