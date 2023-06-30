$('#formalizar').click(function() {
    const pedido = JSON.parse(localStorage.getItem('pedido'))
    
    $.ajax({
        type: 'POST',
        url: "http://localhost:3000/api/finalizarCompra",
        contentType: 'application/json',
        data: JSON.stringify(pedido),
        processData: false
    })
    .done(() => {                
        //redireccionar
        window.location.href = 'http://localhost:3000/Pedido/MostrarPedido'
    })
    .fail((err) => {
        window.location.href = 'http://localhost:3000/Cliente/Login'
        console.log('Error al enviar el pedido', err)
    })
})