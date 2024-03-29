const _         = require('lodash')
const mongoose  = require('mongoose')
const bcrypt    = require('bcrypt')
const Cliente   = require('../models/cliente')
const Direccion = require('../models/direccion')
const Provincia = require('../models/provincia')
const Municipio = require('../models/municipio')
const Pedido    = require('../models/pedido')
const cache     = require('../lib/cache')
const {URL, RENDER_PATH, ERROR_MESSAGE} = require('../models/enums')
const { DataNotFoundError, InvalidPasswordError } = require('../errors/custom')

const GASTOS_ENVIO = 3

module.exports = {
    getRegistro: async (req, res) => { 
        const provincias =  await _findProvincias()

        if (!provincias) {
            throw new DataNotFoundError(ERROR_MESSAGE.PROVINCIAS)
        }

        res.status(200).render(RENDER_PATH.REGISTRO, { layout: null, listaProvincias: provincias }) 
    },
    postRegistro: async (req, res) => {
        const cliente = req.body
        const direccionesEnCrudo = cliente.direcciones
        const direccionIds = []
        const clienteId = new mongoose.Types.ObjectId
        
        const direcciones = await Promise.all(
            direccionesEnCrudo.map(async direccion => {
                const codProvincia = parseInt(direccion.codProvincia)
                const codMunicipio = parseInt(direccion.codMunicipio)
                const provincia    = await Provincia.findOne({ codProvincia }).select('_id').lean()
                const municipio    = await Municipio.findOne({ codProvincia, codMunicipio }).select('_id').lean()

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

        if (!direcciones) {
            throw DataNotFoundError(ERROR_MESSAGE.DIRECCION)
        }

        const saltRounds = 10
        const salt = await bcrypt.genSalt(saltRounds)
        const hash = await bcrypt.hash(cliente.credenciales.password, salt)

        const insertCliente = Cliente({
            ...cliente, 
            _id: clienteId,
            credenciales: { email: cliente.credenciales.email, hash },
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
                const provincias = await _findProvincias()
                res.status(400).render(RENDER_PATH.REGISTRO, { layout: null, listaProvincias: provincias, mensajeError: ERROR_MESSAGE.REGISTRO })
            })
    },
    getLogin: (req, res) => { 
        res.status(200).render(RENDER_PATH.LOGIN, { layout: null } ) 
    },
    postLogin: async (req, res) => {
        const { password, email } = req.body
    
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

        if (!cliente) {
            throw new DataNotFoundError(ERROR_MESSAGE.CLIENTE)
        }

        const hash = cliente.credenciales.hash
        const isValidPassword = await bcrypt.compare(password, hash)
    
        if (!isValidPassword) {
            throw new InvalidPasswordError(ERROR_MESSAGE.LOGIN)
        }

        const pedido = new Pedido({
            fecha: Date.now(),
            clienteId: cliente._id,
            gastosEnvio: GASTOS_ENVIO,
            articulos: []
        })

        cliente.pedidoActual = pedido
        req.session.cliente  = cliente    
        
        res.redirect(URL.PRODUCTOS)
    }
}

async function _findProvincias() {
    const key = 'prov'
    let provincias = cache.get(key)

    if (!provincias) {
        provincias = Provincia.find().sort({ nombre: 1 }).lean()

        cache.set(key, provincias)
    }

    return provincias 
}