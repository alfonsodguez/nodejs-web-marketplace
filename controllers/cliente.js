const mongoose = require('mongoose')
const Cliente = require('../models/cliente')
const Direccion = require('../models/direccion')
const Provincia = require('../models/provincia')
const Municipio = require('../models/municipio')
const Cliente = require('../models/cliente')
const Pedido = require('../models/pedido')
const Provincia = require('../models/provincia')

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
                        { path: 'articulos.productoItem', model: 'Producto' }
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
                        clienteId: cliente._id,
                        gastosEnvio: 5,
                        subtotal: 0,
                        total: 0,
                        articulos: []
                    })
                
                    cliente.pedidoActual = pedido
                    req.session.cliente = cliente    
                }
                res.status(200).redirect(URL.PRODUCTOS)
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
        const cliente = req.body
        const rawDirecciones = cliente.direccion
        const direccionIds = []
        const clienteId   = new mongoose.Types.ObjectId
        
        const direcciones = await Promise.all(rawDirecciones.map(async direccion => {
            const codPro = parseInt(direccion.codpro)
            const codMun = parseInt(direc.codmun)
            const provincia = await Provincia.findOne({codPro}).select('_id').lean()
            const municipio = await Municipio.findOne({codPro, codMun}).select('_id').lean()
            const direccionId = new mongoose.Types.ObjectId() 
            direccionIds.push(direccionId)

            return direccion = {
                _id: direccionId,
                cp: parseInt(direc.cp) || 0,
                tipo: direccion.tipoVia || null ,
                nombre: direccion.nombreVia ,
                numero: direccion.numeroVia || null,
                piso: direccion.piso || null  ,
                puerta: direccion.puerta || null,
                bloque: direccion.bloque || null,
                escalera: direccion.escalera || null   ,
                urbanizacion: direccion.urbanizacion || null,
                observaciones: direccion.observaciones || null,
                provincia: provincia._id,
                municipio: municipio._id,
                clienteId: clienteId,
                esPrincipal: direccion.esprincipal || true
            }
        }))

        const insertCliente = Cliente({
            ...cliente, 
            direccion: direccionIds,
            pedidoActual: new mongoose.Types.ObjectId(),
            historicoPedidos: []
        }).save()

        const insertDirecciones = []
        direcciones.forEach(direccion => {
            const promiseDireccion = Direccion(direccion).save()
            insertDirecciones.push(promiseDireccion)
        })

        Promise
            .all([insertCliente, insertDirecciones])
            .then(() => {
                res.status(200).render('Cliente/RegistroOK.hbs', { layout: null })
            })
            .catch(async (err) => {
                const provincias = await _findProvincias()
                res.status(200).send('Cliente/Registro.hbs', { layout: null, listaProvincias: provincias, mensajeError: 'Error interno del servidor...' })
            })
    }
}

async function _findProvincias() {
    return Provincia.find().sort({nombreProvincia: 1}).lean()
}