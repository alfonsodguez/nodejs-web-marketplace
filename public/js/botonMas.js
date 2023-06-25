$('button[id^="btnMas"]').click(function() { 
    const valueLab = parseFloat($(this).siblings('label').text()) + 1

    $(this).siblings('button').first().prop('disabled', false)
    $(this).siblings('label').text(valueLab)   
})