 /**
* cada vez que haya un cambio en la url /Tienda/Productos/"xxxx" comprobamos
* si existe datos del pedido en el localStorage para pintarlo en el layout
*/
 $(function() {
    const pedidoStorage = JSON.parse(localStorage.getItem('pedido'));
    if(pedidoStorage != null) {
        pedidoStorage.forEach(itemPedido => {
            _pintarDatosMiniCesta(itemPedido.nombre, itemPedido.precio, itemPedido.cantidad)
        })
    };
})

