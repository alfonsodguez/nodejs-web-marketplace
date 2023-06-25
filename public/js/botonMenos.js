$('button[id^="btnMenos"]').click(function() { 
    const lab = $(this).siblings('label')
    const valueLab = lab.text()

    if (valueLab > 1 ) {
        $(lab).text(parseInt(valueLab) - 1)
    } else {
        $(lab).siblings('button').first().prop('disabled', true)
    }
})