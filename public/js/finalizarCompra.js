$('#formalizar').click(function() {
    const pedido = JSON.parse(localStorage.getItem('pedido'))
    
    $.ajax({
        type: 'POST',
        url: "http://localhost:3000/api/finalizarPedido",
        contentType: 'application/json',
        data: JSON.stringify(pedido),
        processData: false
    })
    .done(() => {                
        //redireccionamos al login
        window.location.href = 'http://localhost:3000/Pedido/FinalizarPedido'
    })
    .fail((err) => console.log('error al enviar pedido al server', err))
})