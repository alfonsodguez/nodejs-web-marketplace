$('button[id^="btnMas"]').click(function() { 
    const ean = $(this).attr("id").split('-')[1]
    const valueLab = parseFloat($(this).siblings('label').text()) + 1
    //habilitamos boton menos 
    $(this).siblings('button').first().prop('disabled', false)
    //modificamos valor del lab
    $(this).siblings('label').text(valueLab)
    }   
)