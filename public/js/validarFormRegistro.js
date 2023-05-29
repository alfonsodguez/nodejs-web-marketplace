localStorage.clear()
//estado de los input obligatorios
let estadoCajas = { 'direcciones': false, 'telefonos': false }

function validar(patron, id) {
    const inputId = $('#' + id).val()
    const isValid = patron.test(inputId)
    if (isValid) {
        estadoCajas[id] = true
    } else {
        estadoCajas[id] = false
    }  
}

$('label')
.filter((index, lab) => /^\*(?!Direccion|Nombre via|Telefono).*/.test($(lab).text()))
.each((index, lab) => {
    const attrLabFor = $(lab).attr('for')
    estadoCajas[attrLabFor] = false                  

    $('input[id="' + $(lab).attr('for') + '"]').blur(function(ev) {   
        // validar si los campos estan rellenos 
        const campoCubierto = $(ev.target).val() === undefined || $(ev.target).val() === ''                    
        if (campoCubierto) {
            estadoCajas[$(ev.target).attr('id')] = false
        } else {
            estadoCajas[$(ev.target).attr('id')] = true
        }

        // validar valor de los campos 
        switch(attrLabFor) {
            case "inputNombre":
                validar(/^[a-zA-Z]{1,50}$/, attrLabFor)
                break
            case "inputIdentif":
                switch($('#dropdownTipoIdentif').val()) {
                    case 'NIF':
                        validar(/^[0-9]{8}[a-zA-Z]$/, attrLabFor)
                        break
                    case 'CIF':
                        validar(/^[a-zA-Z][0-9]{8}$/, attrLabFor)
                        break
                    case 'Pasaporte':
                        validar(/^[0-9]{9}$/, attrLabFor)
                        break
                }
                break
            case "inputPassword":
            case "inputRePassword":
                validar(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,20})/, attrLabFor)

                const passwordCubierto  = estadoCajas['inputPassword'] === true
                const repassworCubierto = estadoCajas['inputRePassword'] === true

                if (passwordCubierto && repassworCubierto) {
                    const password   = $('#inputPassword').val()
                    const repassword = $('#inputRePassword').val()
                    estadoCajas[attrLabFor] = password === repassword
                }    
                break
            case "inputEmail":
            case "inputConfEmail":
                const email          = $('#inputEmail').val()
                const confirmarEmail = $('#inputConfEmail').val()
                estadoCajas[attrLabFor] = email === confirmarEmail
                break
        }
        
        // validar si tlfnos y direcciones del dropdown coinciden con el localstorage
        const numDireccionesStorage = 0
        const numTelefonosStorage = 0
        for (let a=0; a<localStorage.length; a++) { 
            if ( /^direc-/.test(localStorage.key(a)) ) {
                numDireccionesStorage++
            }
            if ( /^tlfno-/.test(localStorage.key(a)) ) {
                numTelefonosStorage++
            }
        }
        const esDireccionesOk = $('#direcciones option').length === numDireccionesStorage
        const esTelefonosOk   = $('#telefonos option').length === numTelefonosStorage
        estadoCajas['direcciones'] = esDireccionesOk
        estadoCajas['telefonos']   = esTelefonosOk
            
        //comprobamos estado generaral de las cajas, y habilitamos o no el boton:
        const cajasOk = Object.keys(estadoCajas).some(input => estadoCajas[input] === false) 
        if (cajasOk) {
            $('#btnEnviarAlta').attr('disabled','true')
        }
        $('#btnEnviarAlta').removeAttr('disabled')
    })
})