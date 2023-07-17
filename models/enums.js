const URL = {
    PRODUCTOS: 'http://localhost:3000/Tienda/Productos',
    HOME:      'http://localhost:3000/Tienda/Principal',
    LOGIN:     'http://localhost:3000/Cliente/Login'
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
    PROVINCIAS: 'Error al recuperar las provincias',
    MUNICIPIOS: 'Error al recuperar los municipios',
    SESSION:    'Session requerida',
    CLIENTE:    'Error: cliente no encontrado',
    DIRECCION:  'Error: direccion requerida',
    ARTICULOS:  'Error: articulos no encontrados',
    PRODUCTOS:  'Error: productos no expandidos ok',
    CATEGORIAS: 'Error al recuperar las categorias'
}

module.exports = {
    URL,
    RENDER_PATH,
    ERROR_MESSAGE
}