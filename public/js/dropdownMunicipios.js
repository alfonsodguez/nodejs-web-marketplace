$('#inputProvincia').change(function(evt) {
    $('#inputLocalidad > option[value != 0]').remove() 

    const codProv = evt.target.value 
    if (codProv != "0") {
        $('#inputLocalidad').removeAttr('disabled')
        
        const url = 'http://localhost:3000/api/getMunicipios/' + codProv
        // peticion ajax 
        $.get(url)
        .done((municipio) => municipios.forEach((municipio) => {
            $('#inputLocalidad').append('<option value=' + municipio.codMun + '>'+ municipio.nombreMunicipio + '</option>')
        }))
        .fail(err => console.log(err))
    }
})