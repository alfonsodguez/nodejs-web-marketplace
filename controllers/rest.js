const Municipio = require('../models/municipio')

module.exports = {
    getMunicipios: async (req, res) => {
        try {
            const codPro = req.params.codPro
            const municipios = await Municipio.find({ codPro: codPro }).lean()

            res.status(200).json(municipios)
        } catch (err) {
            console.log('Error al recuperar los municipios', err)
        }
    }
}