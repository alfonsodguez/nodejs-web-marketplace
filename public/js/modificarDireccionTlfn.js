// TODO: modificar y borrar tlfnos
$('#botonModififcarDirec').click(function(ev) {
    modalAltaDir.show()
    const numDirecciones = $('#direcciones').val()
    const key = 'direc-' + numDirecciones
    const direccionStorage = JSON.parse(localStorage.getItem(key))
    
    esDireccionModif  = true
    posDireccionModif = parseInt(numDirecciones)

    Object.keys(direccionStorage).forEach((prop) => {
        switch(prop) {
            case 'tipoVia':
            case 'codProvincia':
            case 'codMunicipio':
                $(`select[name="${prop}"]`).val(direccionStorage[prop])
                if (prop == 'codProvincia') {
                    document.getElementById('#inputProvincia').dispatchEvent('change')
                }
                break
            default:
                $(`input[name="${prop}"]`).val(direccionStorage[prop])
                break
        }  
    })
})