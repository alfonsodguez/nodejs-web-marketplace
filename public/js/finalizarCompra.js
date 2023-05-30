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
        window.location.href = 'http://localhost:3000/Pedido/FinalizarPedido'
    })
    .fail((err) => console.log('error al enviar pedido al server', err))
})