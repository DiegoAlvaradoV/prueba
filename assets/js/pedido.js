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
                <div class="col-md-4 contenedorImgCarrito">
                <img src="${pedidoLocalStorage[i].img}" class="card-img">
                </div>
                `)

                //SE CREA UN CONTENEDOR QUE CONTIENE UNA CLASE
                let contenedorContenido = $(document.createElement('div'));
                contenedorContenido.addClass('col-md-8 containerCardBody');

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
                contenedorCardBody.append(nombreProducto);
                contenedorCardBody.append(precioProducto);
                contenedorCardBody.append(`
                <p class="card-text productosCarrito__Stock">Stock: ${stock}</p>
                `);

                //SE CREA UN ELEMENTO ENCARAGDO DE MODIFICAR LA CANTIDAD DEL PRODUCTO
                let precioMod = precioActual;
                let modProducto = $(document.createElement('div'));
                modProducto.addClass('card-text productosCarrito__Mod');

                //SE CREAN DOS VARIABLES QUE ALMACENEN TANTO LA CANTIDAD ACTUAL AÑADIDA DEL PRODUCTO COMO DE SU STOCK DISPONIBLE
                let cantidadActual = pedidoLocalStorage[i].initial;
                let stockActual = pedidoLocalStorage[i].stock;
                //SE ALMACENA EN UNA VARIABLE EL PRODUCTO ACTUAL
                let pa=pedidoLocalStorage[i];
                //SE ALMACENA EN UNA VARIABLE EL NOMBRE DEL PRODUCTO ACTUAL
                let no=pedidoLocalStorage[i].nombre;


                

                //BOTÓN PARA DISMINUIR LA CANTIDAD DEL PRODUCTO
                let restarProducto = $(document.createElement('i'));
                restarProducto.addClass('fas fa-angle-left productosCarrito__ModQuitar');
                restarProducto.click(()=>{

                    //SE ANALIZA EN TODAS LAS POSICIONES DEL PEDIDO, EN QUE POSICIÓN SE ENCUENTRA EL PRODUCTO 
                    for(var prop of pedidoLocalStorage){
                        
                        if(pa==prop){
                            //SE ALMACENA LA POSICIÓN EN LA QUE SE ENCUENTRA EL PRODUCTO ALMACENADO
                           var pos =  pedidoLocalStorage.indexOf(prop);
                       }
                    }
                    

                    if(cantidadActual>1){

                        //DECREMENTAR CONTADOR
                        cantidadActual=cantidadActual-1;
                        pedidoLocalStorage[pos].initial = cantidadActual;
                        localStorage.setItem('Carrito', JSON.stringify(pedidoLocalStorage));
                        contProducto.html(cantidadActual);
                        precioMod = pedidoLocalStorage[pos].precio*cantidadActual;
                        precioProducto.html(`Precio: $${precioMod}`);
                
                        //MODIFICAR EL TOTAL, RESTANDO EL PRECIO DEL PRODUCTO
                        total = total - pedidoLocalStorage[pos].precio;
                        totalCarrito.html('Total: $'+total);
                    }else if(cantidadActual==1){
                         
                    Swal.fire({
                        title: `¿Deseas eliminar ${no} de su lista de productos?`,
                        text: "Podrás agregarlo cuando quieras desde el catálogo",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#de165c',
                        cancelButtonColor: '#767274',
                        confirmButtonText: 'Eliminar producto',
                        cancelButtonText: 'Cancelar'
                      }).then((result) => {
                        if (result.isConfirmed) {

                          //SE ANALIZA EN TODAS LAS POSICIONES DEL PEDIDO, EN QUE POSICIÓN SE ENCUENTRA EL PRODUCTO 
                    for(let prop of pedidoLocalStorage){

                        if(pa==prop){
                            //SE ALMACENA LA POSICIÓN EN LA QUE SE ENCUENTRA EL PRODUCTO ALMACENADO
                           var pos =  pedidoLocalStorage.indexOf(prop);
                       }
                   }

                   /*SE ELIMINA EL PRODUCTO MEDIANTE EL MÉTODO SPLICE´*/
                   pedidoLocalStorage.splice(pos,1);

                   //ALMACENAMOS EN EL LOCAL STORAGE EL NUEVO VALOR DE LA LISTA DE PRODUCTOS
                   localStorage.setItem('Carrito',JSON.stringify(pedidoLocalStorage));

                   //SE ELIMINA EL PRODUCTO DE LA LISTA
                   contenedorPrincipal.fadeOut(function(){

                       //AÑADIMOS UNA ALERTA QUE DIGA EL PRODUCTO SELECCIONADO FUE ELIMINADO
                       Swal.fire({
                           position: 'center',
                           icon: 'success',
                           title: `Se eliminó ${no} del carrito`,
                           showConfirmButton: false,
                           timer: 1200
                       })

                       //SE ELIMINA EL PRODUCTO DEL LISTADO DEL CARRITO
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

                          
                        }
                      })
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
                    
                    //SE ANALIZA EN TODAS LAS POSICIONES DEL PEDIDO, EN QUE POSICIÓN SE ENCUENTRA EL PRODUCTO 
                    for(var prop of pedidoLocalStorage){
                        
                        if(pa==prop){
                            //SE ALMACENA LA POSICIÓN EN LA QUE SE ENCUENTRA EL PRODUCTO ALMACENADO
                           var pos =  pedidoLocalStorage.indexOf(prop);
                           console.log(pos);
                       }
                    }

                    
                    
                    if(cantidadActual<stockActual){

                        //AUMENTAR EL CONTADOR
                        cantidadActual=cantidadActual+1;
                        pedidoLocalStorage[pos].initial = cantidadActual;
                        localStorage.setItem('Carrito', JSON.stringify(pedidoLocalStorage));
                        contProducto.html(cantidadActual);
                        precioMod = pedidoLocalStorage[pos].precio*cantidadActual;
                        precioProducto.html(`Precio: $${precioMod}`);
                
                        //MODIFICAR EL TOTAL, SUMANDO EL PRECIO DEL PRODUCTO
                        total = total + pedidoLocalStorage[pos].precio;
                        totalCarrito.html('Total: $'+total);
                    }else if (cantidadActual==stockActual){
                        //AÑADIMOS UNA ALERTA QUE AVISE AL USUARIO QUE SE ALCANZÓ EL LIMITE DE STOCK DEL PRODUCTO SELECCIONADO
                        Swal.fire({
                            icon: 'error',
                            title: 'Limite de stock alcanzado',
                            confirmButtonColor: '#de165c',
                            text: 'Se agregó al carrito el número de productos máximos disponibles',
                            footer: `${no} añadidos al carrito: ${stockActual}`
                        })
                    }
                });

                //SE ORGANIZAN LOS ELEMENTOS DEL MODIFICADOR DE CANTIDAD DEL PRODUCTO
                modProducto.append(restarProducto);
                modProducto.append(contProducto);
                modProducto.append(sumarProducto);

                
                //SE CREA UN BOTÓN QUE SE ENCARGARÁ DE ELIMINAR CADA PRODUCTO
                let eliminarProducto = $(document.createElement('button'));
                eliminarProducto.addClass('card-text productosCarrito__Eliminar');
                eliminarProducto.html('Eliminar producto');
                
                eliminarProducto.click(() => {
                    
                    //SE ANALIZA EN TODAS LAS POSICIONES DEL PEDIDO, EN QUE POSICIÓN SE ENCUENTRA EL PRODUCTO 
                    for(let prop of pedidoLocalStorage){

                         if(pa==prop){
                             //SE ALMACENA LA POSICIÓN EN LA QUE SE ENCUENTRA EL PRODUCTO ALMACENADO
                            var pos =  pedidoLocalStorage.indexOf(prop);
                        }
                    }

                    /*SE ELIMINA EL PRODUCTO MEDIANTE EL MÉTODO SPLICE´*/
                    pedidoLocalStorage.splice(pos,1);

                    //ALMACENAMOS EN EL LOCAL STORAGE EL NUEVO VALOR DE LA LISTA DE PRODUCTOS
                    localStorage.setItem('Carrito',JSON.stringify(pedidoLocalStorage));

                    //SE ELIMINA EL PRODUCTO DE LA LISTA
                    contenedorPrincipal.fadeOut(function(){

                        //AÑADIMOS UNA ALERTA QUE DIGA EL PRODUCTO SELECCIONADO FUE ELIMINADO
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: `Se eliminó ${no} del carrito`,
                            showConfirmButton: false,
                            timer: 1200
                        })

                        //SE ELIMINA EL PRODUCTO DEL LISTADO DEL CARRITO
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

                //SE AGREGA EL CONTENEDOR DE LA TARJETA DEL PRODUCTO AL CONTENEDOR DEL CONTENIDO
                contenedorContenido.append(contenedorCardBody);

                //SE AGREGA EL CONTENEDOR DEL CONTENIDO AL CONTENEDOR DE LA LISTA DE LOS PRODUCTOS
                contenedorListaProductos.append(contenedorContenido);

                //SE AGREGA EL CONTENEDOR DE LA LISTA DE LOS PRODUCTOS AL CONTENEDOR DEL CARRITO
                contenedorPrincipal.append(contenedorListaProductos);

                contenedorPrincipal.append(eliminarProducto);
 
                //SE AGREGA EL CONTENEDOR DEL CARRITO AL CONTENEDOR PRINCIPAL
                contenedorCarrito.append(contenedorPrincipal);

                //SE AGREGA AL ACUMULADOR TOTAL EL VALOR DEL PRODUCTO ASOCIADO A LA POSICIÓN ACTUAL
                total = total + precioActual;
            }

            //SE CREA UN APARTADO QUE MUESTRA EL TOTAL DEL PRECIO DE TODOS LOS PRODUCTOS AGREGADOS AL CARRITO
            var totalCarrito = $(document.createElement('div'));
            totalCarrito.addClass('card-text totalCarrito fadeOut');
            totalCarrito.html('Total: $' + total);
            //SE AGREGA EL TOTAL DEL CARRITO AL CONTENEDOR PRINCIPAL
            contenedorCarrito.append(totalCarrito);


            //SE GENERA UN CONTENEDOR QUE TENDRÁ DOS BOTONES
            let contenedorBotones = $(document.createElement('div'));
            contenedorBotones.addClass('contenedorBotones')

            //GENERAMOS UN BOTÓN QUE VACIE EL CARRITO DE COMPRAS
            let vaciarCarrito = $(document.createElement('button'));
            vaciarCarrito.addClass('vaciarCarrito fadeOut');
            vaciarCarrito.html('Vaciar');
            //MEDIANTE EL EVENTO CLICK, SE ELIMINA LA INFORMACIÓN DE LOS PRODUCTOS DEL LOCAL STORAGE Y SE HACE RELOAD DE LA PÁGINA 
            vaciarCarrito.click(function() {

                $(".fadeOut").fadeOut(function(){
                    localStorage.removeItem('Carrito'); 
                    location.reload();
                })
                
            })
           


            //GENERAMOS UN BOTÓN QUE NOS LLEVE AL CATÁLOGO
            let volverCatalogo = $(document.createElement('a'));
            volverCatalogo.addClass('volverCatalogo');
            volverCatalogo.attr('href','../pages/catalogo.html');
            volverCatalogo.append(`
            <button class="volverCatalogo__Boton" type="button">IR AL CATÁLOGO</button>`);


            //SE AGREGA EL BOTÓN QUE NOS LLEVA AL CATÁLOGO AL CONTENEDOR DE ESTOS BOTONES
            contenedorBotones.append(volverCatalogo);
             //SE AGREGA EL BOTÓN DE VACIAR EL CARRITO AL CONTENEDOR DE ESTOS BOTONES
             contenedorBotones.append(vaciarCarrito);

            //SE AGREGA EL CONTENEDOR CON LOS BOTONES AL CONTENEDOR PRINCIPAL
            contenedorCarrito.append(contenedorBotones);
        }
    }
});