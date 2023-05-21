const Provincia = require('../models/provincia')

module.exports = {
    getLogin: (req, res) => { 
        res.status(200).render('Cliente/Login.hbs', { layout: null } ) 
    },
    postLogin: (req, res) => {

    },
    getGegistro: async (req, res) => { 
        const provincias =  await _findProvincias()
        
        res.status(200).render('Cliente/Registro.hbs', { layout: null, listaProvincias: provincias}) 
    },
    postRegistro: (req, res) => {

    }
}

async function _findProvincias() {
    return Provincia.find().sort({nombreProvincia: 1}).lean()
}