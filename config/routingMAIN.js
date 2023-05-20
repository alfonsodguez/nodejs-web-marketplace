
const routeCliente = require('./routingCliente')
const routeREST = require('./routingREST')
const routeTienda  = require('./routingTienda')
const routePedido  = require('./routingPedido')
 
module.export = (app) => {
    app.use('/Cliente', routeCliente)
    app.use('/Tienda',  routeTienda)
    app.use('/Pedido',  routePedido)
    app.use('/api',     routeREST)
}