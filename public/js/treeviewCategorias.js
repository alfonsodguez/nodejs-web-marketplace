const treeview = $('#treeviewCategorias')
const separadorCategoria  = "-"

function despliegaSubcategorias() {
    const idCategoria    = $(this).parent().attr('id')                 
    const regexCategoria = new RegExp("^" + idCategoria + "-[0-9]+$")
    const subCategorias  = categorias.filter(categoria => categoria.pathcategoria.search(regexCategoria) != -1)

    if (subCategorias.length > 0) {
        let tags = '<ul class="nested">'
        
        subCategorias.forEach(subCategoria => { 
            tags += `<li id="${subCategoria.pathcategoria}"><span class="caret">${subCategoria.categoria}</span></li>` 
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
    const paths = categoria.pathcategoria.split(separadorCategoria)
    if (paths.length == 1) {
        treeview.append(`<li id="${categoria.pathcategoria}"><span class="caret">${categoria.categoria}</span></li>`)          
    }
})

$(".caret").click(despliegaSubcategorias)