function _pintarDatosMiniCesta(nombre, cantidad, precio) {
    $('#itemsMiniCesta').append(
        `<tr>
            <td>${nombre}</td>
            <td>${cantidad}</td>
            <td>${precio}</td>
            <td><strong>X</strong></td>
        </tr>`
    )
}  

/**
 * añadimos pedido al localStorage 
 */
$('a[id^="btnComprar"]').click(function() {
    const ean = $(this).attr('id').split('-')[1];
    const itemPedido = { 
        ean: $(this).parent().siblings('th').text(),                                                      
        nombre: $(this).parent().siblings('td').first().text(),                                         
        precio: parseFloat($(this).parent().siblings('td').eq(3).children('p').first().text()),  
        cantidad: parseFloat($(`label[id*="EAN-${ean}"`).text())   
    };

    const pedidoStorage = JSON.parse(localStorage.getItem('pedido'));
    if (pedidoStorage == null) {
        //creo key pedido en el localStorage y añado itemPedido a la lista de pedidos
        const itemsDelPedido = [ itemPedido ];
        localStorage.setItem('pedido', JSON.stringify(itemsDelPedido))
        
        _pintarDatosMiniCesta(itemPedido.nombre, itemPedido.cantidad, itemPedido.precio)
    }
    else{
        //compruebo que si ese item ya existe... entonces incremento cantidad (ojoo!! que la cantidad a añadir pueder ser 1 o mayor)
        const item = pedidoStorage.find((item) => item.ean == itemPedido.ean)
        if (item != null) {
            item.cantidad += itemPedido.cantidad

            // borramos item para añadirlo con la cantidad actualizada
            const itemsPedidoUpdate = pedidoStorage.filter(itemDelPedido => itemDelPedido.ean != item.ean)
            itemsPedidoUpdate.push(item)

            localStorage.setItem('pedido', JSON.stringify(itemsPedidoUpdate))

            // ojo!! no puedo pintarlo directamente sino crearia una fila duplicada, antes modificar la cantidad
            $('#itemsMiniCesta').find(`td:contains('${item.nombre}')`).siblings('td').eq(0).text(`${item.cantidad}`)
        }
        else {
            pedidoStorage.push(itemPedido)
            localStorage.setItem('pedido', JSON.stringify(pedidoStorage))
            
            _pintarDatosMiniCesta(itemPedido.nombre, itemPedido.cantidad, itemPedido.precio)
        }
    }
})
