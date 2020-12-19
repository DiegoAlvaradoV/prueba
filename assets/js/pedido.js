$(document).ready(function() {
    
    //SE ALMACENA EN UNA VARIABLE EL CONTENEDOR DEL LISTADO DE PRODUCTOS DEL CARRITO
    var contenedorCarrito = $('#contenedorCarrito');
    
    //SE ALMACENA EN UNA VARIABLE LA INFORMACIÓN GUARDAD EN EL CARRITO DEL LOCAL STORAGE
    let pedidoLocalStorage = JSON.parse(localStorage.getItem('Carrito'));


    //SE VERIFICA QUE HAYA INFORMACIÓN EN EL LOCAL STORAGE, DE SER ASÍ SE EJECUTA LA FUNCIÓN PARA LISTAR LOS PRODUCTOS
    if(pedidoLocalStorage != null){
        listarProductosCarrito();
    }

    function listarProductosCarrito(){
        
        //EN CASO DE QUE EL USUARIO ELIMINE TODOS LOS ITEMS MANUALMENTE DEJANDO UN ARRAY VACÍO, SE BORRA LA INFORMACIÓN DEL LOCAL STORAGE
        if(pedidoLocalStorage.length == 0){
            localStorage.removeItem('Carrito');
        //SI EL LOCAL STORAGE TIENE INFORMACIÓN    
        }else if(pedidoLocalStorage != null){

            //INICIALIZAMOS EL ACUMULADOR DEL TOTAL DEL VALOR DE LOS PRODUCTOS
            var total = 0;


            //ELIMINAMOS EL CONTENIDO DEL CONTENEDOR DEL CARRITO Y LE AÑADIMOS UN TÍTULO
            contenedorCarrito.html('');
            contenedorCarrito.append(`
            <div id="tituloCarrito">
               <h1>TU CARRITO</h1>
            </div>
            `)

            //RECORREMOS LAS POSICIONES DEL LOCAL STORAGE Y GENERAMOS UNA TARJETA CON SU INFORMACIÓN POR CADA PRODUCTO
            for (let i = 0; i < pedidoLocalStorage.length; i++) {

                //SE GENERA UNA VARIABLE CON EL STOCK ACTUAL DEL PRODUCTO
                stock = pedidoLocalStorage[i].stock;

                //SE GENERA UNA VARIABLE CON LA CANTIDAD AGREGADA DEL PRODUCTO
                initial = pedidoLocalStorage[i].initial;

                //SE GENERA UNA VARIABLE CON EL TOTAL ACTUAL DEL VALOR DEL PRODUCTO ASOCIADO A LA POSICIÓN ACTUAL
                precioActual = pedidoLocalStorage[i].precio*initial;

                

                //SE CREA EL CONTENEDOR PRINCIPAL DEL PRODUCTO
                let contenedorPrincipal = $(document.createElement('div'));
                contenedorPrincipal.addClass('card mb-3 productosCarrito fadeOut');
                contenedorPrincipal.attr('id',[i]);
                contenedorPrincipal.css('max-width','540px');

                //SE CREA EL CONTENEDOR INTERIOR DEL PRODUCTO, QUE ADEMÁS TIENE OTRO CONTENEDOR QUIE ALBERGA LA IMÁGEN DE DICHO PRODUCTO
                let contenedorListaProductos = $(document.createElement('div'));
                contenedorListaProductos.addClass('row no-gutters productosCarrito__Img');
                contenedorListaProductos.append(`
                <div class="col-md-4">
                <img src="${pedidoLocalStorage[i].img}" class="card-img">
                </div>
                `)

                //SE CREA UN CONTENEDOR QUE CONTIENE UNA CLASE
                let contenedorContenido = $(document.createElement('div'));
                contenedorContenido.addClass('col-md-8');

                //SE CREA UN CONTENEDOR ENCARGADO DE MOSTRAR TODA LA INFORMACIÓN DEL PRODUCTO, CONTENIENDO SU NOMBRE, SU PRECIO Y SU STOCK
                let contenedorCardBody = $(document.createElement('div'));
                contenedorCardBody.addClass('card-body');
                
                //SE CREA EL APARTADO QUE INDICA EL PRECIO DEL PRODUCTO
                let precioProducto = $(document.createElement('p'));
                precioProducto.addClass('card-text productosCarrito__Precio');
                precioProducto.html(`Precio: $${precioActual}`)

                //SE CREA EL APARTADO QUE INDICA EL NOMBRE DEL PRODUCTO
                let nombreProducto = $(document.createElement('h5'));
                nombreProducto.addClass('card-title productosCarrito__Titulo');
                nombreProducto.html(`${pedidoLocalStorage[i].nombre}`)

                //SE ALMACENA EN EL CONTENEDOR QUE MUESTRA LA INFORMACIÓN EL APARTADO DEL NOMBRE, PRECIO Y STOCK DEL PRODUCTO
                contenedorCardBody.append(precioProducto);
                contenedorCardBody.append(nombreProducto);
                contenedorCardBody.append(`
                <p class="card-text productosCarrito__Stock">Stock: ${stock}</p>
                `);

                //SE CREA UN ELEMENTO ENCARAGDO DE MODIFICAR LA CANTIDAD DEL PRODUCTO
                let precioMod = precioActual;
                let modProducto = $(document.createElement('div'));
                modProducto.addClass('card-text productosCarrito__Mod');
                //BOTÓN PARA DISMINUIR LA CANTIDAD DEL PRODUCTO
                let restarProducto = $(document.createElement('i'));
                restarProducto.addClass('fas fa-angle-left productosCarrito__ModQuitar');
                restarProducto.click(()=>{

                    let cantidadActual = pedidoLocalStorage[i].initial;

                    if(cantidadActual>1){

                        //DECREMENTAR CONTADOR
                        cantidadActual=cantidadActual-1;
                        pedidoLocalStorage[i].initial = cantidadActual;
                        localStorage.setItem('Carrito', JSON.stringify(pedidoLocalStorage));
                        contProducto.html(cantidadActual);
                        precioMod = pedidoLocalStorage[i].precio*cantidadActual;
                        precioProducto.html(`Precio: $${precioMod}`);
                
                        //MODIFICAR EL TOTAL, RESTANDO EL PRECIO DEL PRODUCTO
                        total = total - pedidoLocalStorage[i].precio;
                        totalCarrito.html('Total: $'+total);
                    }else if(cantidadActual==1){
                        alert('¿DESEA ELIMINAR PRODUCTO?')
                    }

                });
                //CONTADOR DE LA CANTIDAD ACTUAL DEL PRODUCTO 
                let contProducto = $(document.createElement('p'));
                contProducto.addClass('productosCarrito__ModCont');
                contProducto.html(initial);
                //BOTÓN PARA AUMENTAR LA CANTIDAD DEL PRODUCTO
                let sumarProducto = $(document.createElement('i'));
                sumarProducto.addClass('fas fa-angle-right productosCarrito__ModAgregar');
                sumarProducto.click(() =>{

                    let cantidadActual = pedidoLocalStorage[i].initial;
                    let stockActual = pedidoLocalStorage[i].stock;
                    
                    if(cantidadActual<stockActual){

                        //AUMENTAR EL CONTADOR
                        cantidadActual=cantidadActual+1;
                        pedidoLocalStorage[i].initial = cantidadActual;
                        localStorage.setItem('Carrito', JSON.stringify(pedidoLocalStorage));
                        contProducto.html(cantidadActual);
                        precioMod = pedidoLocalStorage[i].precio*cantidadActual;
                        precioProducto.html(`Precio: $${precioMod}`);
                
                        //MODIFICAR EL TOTAL, SUMANDO EL PRECIO DEL PRODUCTO
                        total = total + pedidoLocalStorage[i].precio;
                        totalCarrito.html('Total: $'+total);
                    }else if (cantidadActual==stockActual){
                        alert('YA ALCANZÓ EL MÁXIMO DEL STOCK DEL PRODUCTO');
                    }
                });

                //SE ORGANIZAN LOS ELEMENTOS DEL MODIFICADOR DE CANTIDAD DEL PRODUCTO
                modProducto.append(restarProducto);
                modProducto.append(contProducto);
                modProducto.append(sumarProducto);

                //SE CREA UN BOTÓN QUE SE ENCARGARÁ DE ELIMINAR CADA PRODUCTO
                let eliminarProducto = $(document.createElement('button'));
                eliminarProducto.addClass('card-text productosCarrito__Eliminar button');
                eliminarProducto.html('Eliminar producto');
                eliminarProducto.click(() => {
    
                    /*SE ELIMINA GRACIAS AL MÉTODO SPLICE EL PRODUCTO ASOCIADO A LA POSICIÓN ACTUAL Y SE ALMACENA EN EL LOCAL STORAGE
                    EL NUEVO ARRAY DE OBJETOS, ADEMÁS DE ELIMINAR LA TARJETA DEL PRODUCTO ASOCIADO A LA POSICIÓN ACTUAL*/
                    pedidoLocalStorage.splice(i,1);
                    localStorage.setItem('Carrito',JSON.stringify(pedidoLocalStorage));
                    contenedorPrincipal.fadeOut(function(){
                        contenedorPrincipal.remove();
                
                        /*SE ELIMINA EL TOTAL DEL VALOR DE LOS PRODUCTOS Y SE AÑADE UN NUEVO VALOR A ESE TOTAL RESTÁNDOLE EL VALOR DEL PRODUCTO ASOCIADO
                        A LA POSICIÓN ACTUAL, CREÁNDO UN NUEVO TOTAL QUE MUESTRA SU VALOR Y SE AÑADE AL CONTENEDOR DEL CARRITO*/
                        total = total - precioMod;
                        totalCarrito.html('Total: $'+total);
                
                        /*SI EL TOTAL LLEGA A 0 SE ELIMINA LA INFORMACIÓN DEL LOCAL STORAGE Y SE HACE UN RELOAD A LA PÁGINA*/
                        if(total==0){
                            localStorage.removeItem('Carrito');
                            location.reload();
                        }
                    });
                    
                });
                
                //SE AGREGA EL ELEMENTO QUE MODIFICA LA CANTIDAD DEL PRODUCTO
                contenedorCardBody.append(modProducto);

                //SE AGREGA EL BOTÓN DE ELIMINAR PRODUCTO AL CONTENEDOR DE LA TARJETA DEL PRODUCTO 
                contenedorCardBody.append(eliminarProducto);

                //SE AGREGA EL CONTENEDOR DE LA TARJETA DEL PRODUCTO AL CONTENEDOR DEL CONTENIDO
                contenedorContenido.append(contenedorCardBody);

                //SE AGREGA EL CONTENEDOR DEL CONTENIDO AL CONTENEDOR DE LA LISTA DE LOS PRODUCTOS
                contenedorListaProductos.append(contenedorContenido);

                //SE AGREGA EL CONTENEDOR DE LA LISTA DE LOS PRODUCTOS AL CONTENEDOR DEL CARRITO
                contenedorPrincipal.append(contenedorListaProductos);
 
                //SE AGREGA EL CONTENEDOR DEL CARRITO AL CONTENEDOR PRINCIPAL
                contenedorCarrito.append(contenedorPrincipal);

                //SE AGREGA AL ACUMULADOR TOTAL EL VALOR DEL PRODUCTO ASOCIADO A LA POSICIÓN ACTUAL
                total = total + precioActual;
            }

            //SE CREA UN APARTADO QUE MUESTRA EL TOTAL DEL PRECIO DE TODOS LOS PRODUCTOS AGREGADOS AL CARRITO
            var totalCarrito = $(document.createElement('p'));
            totalCarrito.addClass('card-text totalCarrito fadeOut');
            totalCarrito.html('Total: $' + total);
            //SE AGREGA EL TOTAL DEL CARRITO AL CONTENEDOR PRINCIPAL
            contenedorCarrito.append(totalCarrito);

            //GENERAMOS UN BOTÓN QUE VACIE EL CARRITO DE COMPRAS
            let vaciarCarrito = $(document.createElement('button'));
            vaciarCarrito.addClass('vaciarCarrito button fadeOut');
            vaciarCarrito.html('Vaciar Carrito');
            //MEDIANTE EL EVENTO CLICK, SE ELIMINA LA INFORMACIÓN DE LOS PRODUCTOS DEL LOCAL STORAGE Y SE HACE RELOAD DE LA PÁGINA 
            vaciarCarrito.click(function() {

                $(".fadeOut").fadeOut(function(){
                    localStorage.removeItem('Carrito'); 
                    location.reload();
                })
                
            })
            //SE AGREGA EL BOTÓN DE VACIAR EL CARRITO AL CONTENEDOR PRINCIPAL
            contenedorCarrito.append(vaciarCarrito);
        }
    }
});