const _ = require('lodash')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Cliente = require('../models/cliente')
const Direccion = require('../models/direccion')
const Provincia = require('../models/provincia')
const Municipio = require('../models/municipio')
const Pedido = require('../models/pedido')

const URL = {
    PRODUCTOS: 'http://localhost:3000/Tienda/Productos/15-8-5'
}
const RENDER_PATH = {
    LOGIN: 'Cliente/Login.hbs',
    REGISTRO: 'Cliente/Registro.hbs'
}

module.exports = {
    getLogin: (req, res) => { 
        res.status(200).render(RENDER_PATH.LOGIN, { layout: null } ) 
    },
    postLogin: async (req, res) => {
        try {
            const {password, email} = req.body
        
            const cliente = await Cliente
                .findOne({'credenciales.email': email})
                .populate([
                    {   
                        path: 'direcciones', 
                        model: 'Direccion', 
                        populate: [
                            { path: 'provincia', model: 'Provincia' },
                            { path: 'municipio', model: 'Municipio' }
                        ]
                    },
                    { 
                        path: 'historicoPedidos', 
                        model: 'Pedido', 
                        populate: {
                            path: 'articulos.productoItem', model: 'Producto' 
                        }
                    }
                ])
                .lean()

            if (cliente) {
                const hash = cliente.credenciales.hash
                const isValidPassword = bcrypt.compareSync(password, hash)
            
                if (isValidPassword) {
                    const pedido = new Pedido({
                        fecha: Date.now(),
                        estado: 'pendiente',
                        clienteId: cliente._id,
                        gastosEnvio: 5,
                        subtotal: 0,
                        total: 0,
                        articulos: []
                    })

                    cliente.pedidoActual = pedido
                    req.session.cliente  = cliente    
                }
                res.redirect(URL.PRODUCTOS)
            }
            res.status(400).render(RENDER_PATH.LOGIN, { layout: null,  mensajeErrorCustom: "Email o contraseña incorrectas, vuelve a intentarlo" })
        } catch (error) {
            res.status(500).render(RENDER_PATH.LOGIN, { layout: null, mensajeError: 'Error en el server...'})
        }
    },
    getRegistro: async (req, res) => { 
        const provincias =  await _findProvincias()

        res.status(200).render(RENDER_PATH.REGISTRO, { layout: null, listaProvincias: provincias}) 
    },
    postRegistro: async (req, res) => {
        try {
            const cliente = req.body
            const direccionesEnCrudo = cliente.direcciones
            const direccionIds = []
            const clienteId = new mongoose.Types.ObjectId
          
            const direcciones = await Promise.all(
                direccionesEnCrudo.map(async direccion => {
                    const codProvincia = parseInt(direccion.codpro)
                    const codMunicipio = parseInt(direccion.codmun)
                    const provincia    = await Provincia.findOne({CodPro: codProvincia}).select('_id').lean()
                    const municipio    = await Municipio.findOne({CodPro: codProvincia, CodMun: codMunicipio}).select('_id').lean()

                    const direccionId = new mongoose.Types.ObjectId() 
                    direccionIds.push(direccionId)

                    return {
                        ...direccion,
                        _id: direccionId,
                        clienteId: clienteId,
                        cp: parseInt(direccion.cp),
                        provincia: provincia._id,
                        municipio: municipio._id,
                    }
                }
            ))

            const saltRounds = 10
            const salt = await bcrypt.genSalt(saltRounds)
            const hash = await bcrypt.hash(cliente.credenciales.password, salt)

            const insertCliente = Cliente({
                ...cliente, 
                _id: clienteId,
                credenciales: { 
                    email: cliente.credenciales.email,
                    hash
                },
                direcciones: direccionIds,
            }).save()

            const insertDirecciones = []
            direcciones.forEach(direccion => {
                const promiseDireccion = Direccion(direccion).save()
                insertDirecciones.push(promiseDireccion)
            })

            const insertPromises = _.concat(insertCliente, insertDirecciones)

            Promise
                .all(insertPromises)
                .then(() => {
                    res.status(200).render(RENDER_PATH.LOGIN, { layout: null })
                })
                .catch(async (err) => {
                    console.log(err)
                    const provincias = await _findProvincias()
                    res.status(400).render(RENDER_PATH.REGISTRO, { layout: null, listaProvincias: provincias, mensajeError: 'Error interno del servidor...' })
                })

        } catch (err) {
            res.status(500).render(RENDER_PATH.REGISTRO, { layout: null, mensajeError: 'Error en el server...'})
        }
    }
}

async function _findProvincias() {
    return Provincia.find().sort({NombreProvincia: 1}).lean()
}