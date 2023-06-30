$('button[id^="btnEliminar"]').click(function() {
    const ean = $(this).attr('id').split('-')[1]
    const key = 'pedido'
    const pedidoStorage = JSON.parse(localStorage.getItem(key))

    const itemsPedidoUpdate = pedidoStorage.filter(item => item.ean != ean)
    localStorage.setItem(key, JSON.stringify(itemsPedidoUpdate))
})