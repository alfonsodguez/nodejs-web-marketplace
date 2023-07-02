const treeview = $('#treeviewCategorias')
const separadorCategoria  = "-"

function despliegaSubcategorias() {
    const idCategoria    = $(this).parent().attr('id')                 
    const regexCategoria = new RegExp("^" + idCategoria + "-[0-9]+$")
    const subCategorias  = categorias.filter(categoria => categoria.path.search(regexCategoria) != -1)

    if (subCategorias.length > 0) {
        let tags = '<ul class="nested">'
        
        subCategorias.forEach(subCategoria => { 
            tags += `<li id="${subCategoria.path}"><span class="caret">${subCategoria.nombre}</span></li>` 
        });
        tags += '</ul>'

        $(this).parent().append(tags)
        $(".caret").click(despliegaSubcategorias)
    }
    else {
        // recuperar los productos por idCategoria
        const urlProductos = "http://localhost:3000/Tienda/Productos/" + idCategoria
        window.location = urlProductos
    }
    
    $(this).parent().children("ul.nested").toggleClass("active")
    $(this).toggleClass("caret-down")
}

const categorias = JSON.parse(serializeCategorias.replace(/&quot;/g, `"`))  // <-- deserializar categorias 
categorias.forEach(categoria => {
    const paths = categoria.path.split(separadorCategoria)
    if (paths.length == 1) {
        treeview.append(`<li id="${categoria.path}"><span class="caret">${categoria.nombre}</span></li>`)          
    } 
})

$(".caret").click(despliegaSubcategorias)


// --- alternativa con reduce --- 
// const tags = subCategorias.reduce((acc, subCategoria, index) => {
//     if (subCategorias.length === index++) {
//         return acc + '</ul>'
//     }
//     return acc + `<li id="${subCategoria.path}"><span class="caret">${subCategoria.nombre}</span></li>`
// }, '<ul class="nested">')