const URL = {
    PRODUCTOS: 'http://localhost:3000/Tienda/Productos',
    HOME:      'http://localhost:3000/Tienda/Principal'
}
const RENDER_PATH = {
    LOGIN:      'Cliente/Login.hbs',
    REGISTRO:   'Cliente/Registro.hbs',
    FIN_PEDIDO: 'Pedido/FinalizarPedido.hbs',
    TIENDA:     'Tienda/Productos.hbs',
    HOME:       'Tienda/Principal.hbs',
}
const ERROR_MESSAGE= {
    SERVER:     'Error interno del servidor',
    LOGIN:      'Email o contraseña incorrectas, vuelva a intentarlo',
    REGISTRO:   'Error en el registro',
    PROVINCIAS: 'Error al recuperar las provincias'
}

module.exports = {
    URL,
    RENDER_PATH,
    ERROR_MESSAGE
}