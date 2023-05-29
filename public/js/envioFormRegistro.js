$('button:submit').click(function(evt) {
    evt.preventDefault()
    const direcciones = []
    const telefonos   = [] 

    for (var pos=0; pos<localStorage.length; pos++) {
        // tenemos almacenado direcciones y telefonos con las keys: "direct-0", "tlfno-0", ....
        const key = localStorage.key(pos)
        if (/^direct-/.test(key)) {
            direcciones.push(JSON.parse(localStorage[key])) 
        } 
        else if (/^tlfno-/.test(key)) {
            telefonos.push(JSON.parse(localStorage[key])) 
        }
    };

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
        telefono: telefonos, 
        direccion: direcciones,
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