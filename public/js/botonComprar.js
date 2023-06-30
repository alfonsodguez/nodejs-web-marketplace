function _pintarDatosMiniCesta(nombre, cantidad, precio, ean) {
    $('#itemsMiniCesta').append(
        `<tr>
            <td>${nombre}</td>
            <td>${cantidad}</td>
            <td>${precio}</td>
            <td>
                <button type="button" class="btn btn-success btn-sm" id="btnEliminar-${ean}"><strong>X</strong></button>
            </td>
        </tr>`
    )
}  

/**
 * añadimos pedido al localStorage 
 */
$('a[id^="btnComprar"]').click(function() {
    const key = 'pedido'
    const ean = $(this).attr('id').split('-')[1];
    const itemPedido = { 
        ean: $(this).parent().siblings('th').text(),                                                      
        nombre: $(this).parent().siblings('td').first().text(),                                         
        precio: parseFloat($(this).parent().siblings('td').eq(2).children('p').first().text()),  
        cantidad: parseFloat($(`label[id*="EAN-${ean}"`).text())   
    }

    const pedidoStorage = JSON.parse(localStorage.getItem(key));
    if (pedidoStorage == null) {
        //creo key pedido en el localStorage y añado itemPedido a la lista de pedidos
        const itemsDelPedido = [ itemPedido ];
        localStorage.setItem(key, JSON.stringify(itemsDelPedido))
        
        _pintarDatosMiniCesta(itemPedido.nombre, itemPedido.cantidad, itemPedido.precio, itemPedido.ean)
    }
    else {
        //compruebo que si ese item ya existe... entonces incremento cantidad (ojoo!! que la cantidad a añadir pueder ser 1 o mayor)
        const item = pedidoStorage.find((item) => item.ean == itemPedido.ean)
        if (item != null) {
            item.cantidad += itemPedido.cantidad

            // borramos item para añadirlo con la cantidad actualizada
            const itemsPedidoUpdate = pedidoStorage.filter(itemDelPedido => itemDelPedido.ean != item.ean)
            itemsPedidoUpdate.push(item)

            localStorage.setItem(key, JSON.stringify(itemsPedidoUpdate))

            // ojo!! no puedo pintarlo directamente sino crearia una fila duplicada hay que modificar la cantidad
            $('#itemsMiniCesta').find(`td:contains('${item.nombre}')`).siblings('td').eq(0).text(`${item.cantidad}`)
        }
        else {
            pedidoStorage.push(itemPedido)
            localStorage.setItem(key, JSON.stringify(pedidoStorage))
            
            _pintarDatosMiniCesta(itemPedido.nombre, itemPedido.cantidad, itemPedido.precio, itemPedido.ean)
        }
    }
})
