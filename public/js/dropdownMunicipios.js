$('#inputProvincia').change(function(evt) {
    $('#inputLocalidad > option[value != 0]').remove() 

    const codProvincia = evt.target.value
    const url = 'http://localhost:3000/api/municipios/' + codProvincia

    if (codProvincia != "0") {
        $('#inputLocalidad').removeAttr('disabled')
        
        $.get(url)
        .done((municipios) => municipios.forEach((municipio) => {    
            $('#inputLocalidad').append('<option value=' + municipio.CodMun + '>'+ municipio.NombreMunicipio + '</option>')
        }))
        .fail(err => console.log('Error al recuperar los municipios', err))
    }
})