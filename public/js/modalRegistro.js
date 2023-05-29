
const modalAltaDirecccion = new bootstrap.Modal(document.getElementById('formAltaDir'))
$('#botonAltaDir').click(function() { modalAltaDirecccion.show(); esDireccionModif = false })
$('#botonCierraModalDir').click(function() { modalAltaDirecccion.hide() })

const modalAltaTlfn = new bootstrap.Modal(document.getElementById('formAltaTlfno'))
$('#botonAltaTlfno').click(function() { modalAltaTlfn.show(); esTlfnModif = false})
$('#botonCierraModalTlfno').click(function() { modalAltaTlfn.hide() })