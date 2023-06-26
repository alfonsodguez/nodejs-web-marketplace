$('button:submit').click(function(evt) {
    evt.preventDefault()
    const reDireccion = /^direc-/
    const reTlfno     = /^tlfno-/
    const direcciones = []
    const telefonos   = [] 
    
    for (let pos=0; pos<localStorage.length; pos++) {
        // tenemos almacenado direcciones y telefonos con las keys: "direc-0", "tlfno-0", ....
        const key = localStorage.key(pos)
        const value = JSON.parse(localStorage[key])

        if (reDireccion.test(key)) {
            direcciones.push(JSON.parse(localStorage[key])) 
        } 
        else if (reTlfno.test(key)) {
            telefonos.push(JSON.parse(localStorage[key])) 
        }
    }

    const cliente = {
        nombre: $('#inputNombre').val(),
        primerApellido: $('#inputPrimApe').val(),
        segundoApellido: $('#inputSecApe').val(),
        nacimiento: $('#inputFecha').val(),
        tipoIdentificacion: {
            tipoId: $('select[name="tipoId"]').val(), 
            numId: $('#inputIdentif').val(),
        },
        credenciales: {
            email: $('#inputEmail').val(),
            password: $('#inputPassword').val(),
        },
        telefonos, 
        direcciones
    }  

    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/Cliente/Registro',   
        data: JSON.stringify(cliente),    
        contentType: 'application/json',  
        processData: false 	 
    })
    .done((res) => {  
        console.log('cliente registrado ok')
    })
    .fail((err) => {
        // TODO: mostrar en un div en la vista el mensaje de error...
        console.log(err)
    })
})