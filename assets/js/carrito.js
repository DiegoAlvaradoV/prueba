document.addEventListener('DOMContentLoaded', () => {

    //RECIBIMOS LOS DATOS DESDE LA BASE DE DATOS
    fetchData();
    
})


const fetchData = async () => {
    try{
        const res = await fetch('../assets/json/database.json');
        const data = await res.json();
        cards(data);
    } catch (error){
        alert(error);
        location.reload();
    }
}


//INSTANCIAMOS UN ARRAY VACÍO QUE ALMACENARÁ TODOS LOS PRODUCTOS AGREGADOS AL CARRITO
let carrito = [];

//SE CREA UNA VARIABLE QUE ALMACENA LA INFORMACIÓN DEL LOCAL STORAGE
let pedidoLocalStorage = JSON.parse(localStorage.getItem('Carrito'));

//SI HAY INFORMACIÓN DEL LOCAL STORAGE, SE ENVÍAN ESOS DATOS AL CARRITO
if(pedidoLocalStorage!=null){

    for(let prop of pedidoLocalStorage){
        carrito.push(prop);
    }
}


//SE CREA UN ARRAY VACÍO PARA CADA SECCIÓN DE LA TIENDA, PARA ASÍ CREAR SUS RESPECTIVOS PRODUCTOS
let databaseBebes=[]; 
let databaseNinas=[];
let databaseAdolescentes=[];

//RECORRO CADA POSICIÓN DE LOS DATOS OBJETINOS DE LA DATABASE Y LO DIVIDO EN LAS SECCIONES DE LA PÁGINA
const cards = data => {
    data.forEach(producto => {
        if(producto.id<=16){
            databaseBebes.push(producto)
        }else if(producto.id<=58){
            databaseNinas.push(producto);
        }else{
            databaseAdolescentes.push(producto);
        }
    });
}


//ALMACENO EN UNA VARIABLE LAS SECCIONES DEL CATÁLOGO
let seccionesCatalogo = $('#seccionesCatalogo');

//ALMACENO EN UNA VARIABLE EL CONTENEDOR DE LA GALERIA
let contenedorStore = $('#contenedorStore');

//ALMACENO EN UNA VARIABLE CADA CATEGORÍA DEL CATÁLOGO
let calzadoBebes = $('#calzadoBebes');
let calzadoNinas = $('#calzadoNinas');
let calzadoAdolescentes = $('#calzadoAdolescentes');

//ALMACENO EN UNA VARIABLE EL NODO DEL CONTENEDOR DEL POPUP
let popup = $('#popup');
//ALMACENO EN UNA VARIABLE EL NODO DEL BOTÓN CERRAR EL POPUP
let popupCerrar = $('#popupCerrar');
//ALMACENO EN UNA VARIABLE EL NODO DE LA IMÁGEN DEL PRODUCTO DEL POPUP
let popupImg = $('#popupImg');
//ALMACENO EN UNA VARIABLE EL NODO DEL NOMBRE DEL PRODUCTO DEL POPUP
let popupNombre = $('#popupNombre');
//ALMACENO EN UNA VARIABLE EL NODO DEL PRECIO DEL PRODUCTO DEL POPUP
let popupPrecio = $('#popupPrecio');
//ALMACENO EN UNA VARIABLE EL NODO DEL STOCK DEL PRODUCTO DEL POPUP
let popupStock = $('#popupStock');



calzadoBebes.click(()=>{

    //SE MODIFICAN LOS ESTILOS DE LAS SECCIONES DEL CATÁLOGO
    calzadoBebes.css({
        'opacity': '1',
        'filter': 'grayscale(0)'
    })

    $('#calzadoBebes__Titulo').css({
        'color' : '#de165c'
    })

    calzadoNinas.css({
        'opacity': '0.5',
        'filter': 'grayscale(1)'
    });

    $('#calzadoNinas__Titulo').css({
        'color' : '#ffffff'
    })

    calzadoAdolescentes.css({
        'opacity': '0.5',
        'filter': 'grayscale(1)'
    });

    $('#calzadoAdolescentes__Titulo').css({
        'color' : '#ffffff'
    })



    //CONTENEDOR DE LA GALERÍA DE CALZADO BEBÉS
    let contenedorGaleria = $(document.createElement('div'));
    contenedorGaleria.addClass('row galeriaProductos');
    contenedorGaleria.append(`
    <div class="galeriaProductos__Titulo">
       <h1>Calzados Bebés</h1>
    </div>`)

    //CONTENEDOR DE LOS PRODUCTOS CALZADOS BEBÉS
    let contenedorProductos = $(document.createElement('div'));
    contenedorProductos.addClass('row row-cols-1 row-cols-md-4 galeriaProductos__Contenedor');

    /*POR CADA POSICIÓN DEL ARRAY DE OBJETOS CON LOS PRODUCTOS DE BEBÉS, SE CREA UNA VARIABLE QUE ALMACENA LA CARTA DEL PRODUCTO
    CON SU INFORMACIÓN Y SE AÑADE AL CONTENEDOR DEL PRODUCTOS DE CALZADOS BEBÉS POSTERIOR AL TÍTULO*/
    databaseBebes.forEach(databaseBebes => {
        let seccionProductos = visualizacionProductosBebes(databaseBebes);
        contenedorProductos.append(seccionProductos);
    });
    //AGREGAMOS LOS PRODUCTOS AL CONTENEDOR DE LA GALERÍA DE CALZADO BEBÉS
    contenedorGaleria.append(contenedorProductos); 

    contenedorStore.html(contenedorGaleria);


    
    
});


calzadoNinas.click(()=>{
    
    //SE MODIFICAN LOS ESTILOS DE LAS SECCIONES DEL CATÁLOGO
    calzadoNinas.css({
        'opacity': '1',
        'filter': 'grayscale(0)'
    })

    $('#calzadoNinas__Titulo').css({
        'color' : '#de165c'
    })

    calzadoBebes.css({
        'opacity': '0.5',
        'filter': 'grayscale(1)'
    });

    $('#calzadoBebes__Titulo').css({
        'color' : '#ffffff'
    })

    calzadoAdolescentes.css({
        'opacity': '0.5',
        'filter': 'grayscale(1)'
    });

    $('#calzadoAdolescentes__Titulo').css({
        'color' : '#ffffff'
    })


    //CONTENEDOR DE LA GALERÍA DE CALZADO NIÑAS
    let contenedorGaleria = $(document.createElement('div'));
    contenedorGaleria.addClass('row galeriaProductos');
    contenedorGaleria.append(`
    <div class="galeriaProductos__Titulo">
       <h1>Calzados Niñas</h1>
    </div>`)

    //CONTENEDOR DE LOS PRODUCTOS CALZADOS NIÑAS
    let contenedorProductos = $(document.createElement('div'));
    contenedorProductos.addClass('row row-cols-1 row-cols-md-4 galeriaProductos__Contenedor');

    /*POR CADA POSICIÓN DEL ARRAY DE OBJETOS CON LOS PRODUCTOS DE NIÑAS, SE CREA UNA VARIABLE QUE ALMACENA LA CARTA DEL PRODUCTO
    CON SU INFORMACIÓN Y SE AÑADE AL CONTENEDOR DEL PRODUCTOS DE CALZADOS NIÑAS POSTERIOR AL TÍTULO*/
    databaseNinas.forEach(databaseNinas => {
        let seccionProductos = visualizacionProductosNinas(databaseNinas);
        contenedorProductos.append(seccionProductos);
    });
    //AGREGAMOS LOS PRODUCTOS AL CONTENEDOR DE LA GALERÍA DE CALZADO BEBÉS
    contenedorGaleria.append(contenedorProductos); 

    seccionesCatalogo.after(contenedorGaleria);

    contenedorStore.html(contenedorGaleria);
    
})


calzadoAdolescentes.click(()=>{


    //SE MODIFICAN LOS ESTILOS DE LAS SECCIONES DEL CATÁLOGO
    calzadoAdolescentes.css({
        'opacity': '1',
        'filter': 'grayscale(0)'
    })

    $('#calzadoAdolescentes__Titulo').css({
        'color' : '#de165c'
    })

    calzadoBebes.css({
        'opacity': '0.5',
        'filter': 'grayscale(1)'
    });

    $('#calzadoBebes__Titulo').css({
        'color' : '#ffffff'
    })

    calzadoNinas.css({
        'opacity': '0.5',
        'filter': 'grayscale(1)'
    });

    $('#calzadoNinas__Titulo').css({
        'color' : '#ffffff'
    })

    
    
    //CONTENEDOR DE LA GALERÍA DE CALZADO ADOLESCENTES
    let contenedorGaleria = $(document.createElement('div'));
    contenedorGaleria.addClass('row galeriaProductos');
    contenedorGaleria.append(`
    <div class="galeriaProductos__Titulo">
       <h1>Calzados Adolescentes</h1>
    </div>`)

    //CONTENEDOR DE LOS PRODUCTOS CALZADOS ADOLESCENTES
    let contenedorProductos = $(document.createElement('div'));
    contenedorProductos.addClass('row row-cols-1 row-cols-md-4 galeriaProductos__Contenedor');

    /*POR CADA POSICIÓN DEL ARRAY DE OBJETOS CON LOS PRODUCTOS DE ADOLESCENTES, SE CREA UNA VARIABLE QUE ALMACENA LA CARTA DEL PRODUCTO
    CON SU INFORMACIÓN Y SE AÑADE AL CONTENEDOR DEL PRODUCTOS DE CALZADOS ADOLESCENTES POSTERIOR AL TÍTULO*/
    databaseAdolescentes.forEach(databaseAdolescentes => {
        let seccionProductos = visualizacionProductosAdolescentes(databaseAdolescentes);
        contenedorProductos.append(seccionProductos);
    });
    //AGREGAMOS LOS PRODUCTOS AL CONTENEDOR DE LA GALERÍA DE CALZADO BEBÉS
    contenedorGaleria.append(contenedorProductos); 

    seccionesCatalogo.after(contenedorGaleria);

    contenedorStore.html(contenedorGaleria);
})





//CREAMOS LA FUNCIÓN ENCARGADA DE CREAR LA CARTA DE LOS PRODUCTOS CON SUS DATOS, SOLICITANDO COMO PARÁMETRO LOS PRODUCTOS DE CALZADO DE BEBÉS
function visualizacionProductosBebes(databaseBebes){

    //CREAMOS EL CONTENEDOR DE LA CARTA DEL PRODUCTO, AGREGÁNDOLE UN ID
    let contenedorCard = $(document.createElement("div"));
    contenedorCard.attr('id',databaseBebes.id);
    contenedorCard.addClass('col-6 col-xs-6 col-sm-4 col-md-4 col-lg-3 galeriaProductos__Card');

    //CREAMOS EL CONTENEDOR DE LA IMÁGEN DEL PRODUCTO, EL CÚAL TIENE EN SU INTERIOR LA RESPECTIVA IMÁGEN DEL CALZADO DE BEBÉ Y UN EVENTO CLICK
    let contenedorCardContenedor = $(document.createElement("div"));
    contenedorCardContenedor.addClass('galeriaProductos__CardContenedor');
    contenedorCardContenedor.append(`
    <img src="${databaseBebes.img}" class="galeriaProductos__CardImg" alt="Calzado Bebé">
    `)
    contenedorCardContenedor.click(function(){

       //ACCEDEMOS AL NODO DE LA IMÁGEN DEL PRODUCTO EN EL POPUP Y LE AÑADIMOS LA IMÁGEN DEL PRODUCTO EN LA CARD CREADA
       popupImg.attr('src',databaseBebes.img);
       //ACCEDEMOS AL NODO DEL NOMBRE DEL PRODUCTO EN EL POPUP Y LE AÑADIMOS EL NOMBRE DEL PRODUCTO
       popupNombre.html(databaseBebes.nombre);
       //ACCEDEMOS AL NODO DEL PRECIO DEL PRODUCTO EN EL POPUP Y LE AÑADIMOS EL PRECIO DEL PRODUCTO
       popupPrecio.html('$'+databaseBebes.precio);
       //ACCEDEMOS AL NODO DEL STOCK DEL PRODUCTO EN EL POPUP Y LE AÑADIMOS EL STOCK DEL PRODUCTO
       popupStock.html('Stock: '+databaseBebes.stock);
       
       //ALMACENO EN UNA VARIABLE LA CREACIÓN DEL BOTÓN PARA AGREGAR AL CARRITO EN EL POPUP
       let popupBoton = $(document.createElement('button'));
       popupBoton.addClass('popup__ContenedorAgregar button');
       popupBoton.html('Agregar al carrito');
       popupStock.after(popupBoton);
       popupBoton.click(function(){



           //SE CREA UNA VARIABLE QUE ALMACENARÁ LOS NUEVOS VALORES DEL LOCAL STORAGE
           let pedidoLocalStorage = JSON.parse(localStorage.getItem('Carrito'));


           //SE EVALÚA SI EL LOCAL STORAGE ESTA VACÍO
           if(pedidoLocalStorage == null){

               //EN CASO DE ESTAR VACÍO, SE HACE UN PUSH DE DICHO PRODUCTO AL CARRITO                
               carrito.push(databaseBebes);
               
               //SE ALMACENA EL CARRITO AL LOCAL STORAGE
               localStorage.setItem('Carrito', JSON.stringify(carrito));

               alert(`Se ha agregado ${databaseBebes.nombre} al carrito`);


           }else if(pedidoLocalStorage != null){ 

                //SE CREA UN BOOLEAN QUE DIGA TRUE SI EL PRODUCTO ES REPETIDO O DIGA FALSE SI NO ES REPETIDO
                let repetido=false;
                
                /*SE ANALIZA POSICIÓN POR POSICIÓN DEL OBJETO QUE ALMACENA LA INFORMACIÓN DEL LOCAL STORAGE,
                PARA SABER SI COINCIDE ALGUNO DE SUS PRODUCTOS CON EL PRODUCTO ACTUAL, EN CASO DE SER ASÍ EN VEZ 
                DE AGREGAR NUEVAMENTE ESE PRODUCTO, SE MODIFICA LA PROPIEDAD INITIAL Y SE ENVÍA ESE NUEVO VALOR AL
                LOCAL STORAGE*/
                for(let prop of pedidoLocalStorage){
                    
                    if(prop.id==databaseBebes.id){
                        
                        //SE AGREGA TRUE AL BOOLEAN DEBIDO A QUE SI ES REPETIDO
                        repetido=true;

                        //SE EVALÚA QUE LA CANTIDAD DEL MISMO PRODUCTO AGREGADA NO SUPERE EL STOCK
                        if(prop.initial<prop.stock){

                            //SE CAMBIA EL VALOR INITIAL, AGREGANDO UN MISMO PRODUCTO AL CARRITO DE COMPRAS
                            prop.initial=prop.initial+1;
                            //SE ALMACENA EL NUEVO VALOR DEL LOCAL STORAGE CON EL PRODUCTO INITIAL CAMBIADO
                            carrito=pedidoLocalStorage;
                            //SE PASA ESE NUEVO VALOR AL LOCAL STORAGE
                            localStorage.setItem('Carrito', JSON.stringify(carrito));

                            alert(`Se ha agregado ${databaseBebes.nombre} extra al carrito`);

                        }else if(prop.initial==prop.stock){
                            alert('NO SE PUEDE AGREGAR MÁS PRODUCTOS AL CARRITO, LÍMITE DE STOCK ALCANZADO')
                        }
                    }
                }
                
                //SE AGREGA FALSE AL BOOLEAN YA QUE SI NO ES REPETIDO
                if(repetido==false){
                    //EN CASO DE ESTAR VACÍO, SE HACE UN PUSH DE DICHO PRODUCTO AL CARRITO                
                    carrito.push(databaseBebes);

                    //SE ALMACENA EL CARRITO AL LOCAL STORAGE
                    localStorage.setItem('Carrito', JSON.stringify(carrito));

                    alert(`Se ha agregado ${databaseBebes.nombre} al carrito`);
                } 

            }
        });

       
       //AL MOMENTO DE OPRIMIR EL BOTÓN DE CERRAR EL POPUP SE ELIMINA EL BOTÓN DEL CARRITO PARA EVITAR QUE SE ACUMULEN
       popupCerrar.click(function(){

          popup.hide(function(){
             popupBoton.remove();
          });

       })

       popup.show();
    })

    //ALMACENAMOS EN CONTENEDOR DEL PRODUCTO EN EL CONTENEDOR DE SU CARD
    contenedorCard.append(contenedorCardContenedor);

   //EL MÉTODO RETORNARÁ LA TARJETA DEL PRODUCTO Y SUS DATOS
   return (contenedorCard);
 }

 //CREAMOS LA FUNCIÓN ENCARGADA DE CREAR LA CARTA DE LOS PRODUCTOS CON SUS DATOS, SOLICITANDO COMO PARÁMETRO LOS PRODUCTOS DE CALZADO DE NIÑAS
function visualizacionProductosNinas(databaseNinas){
 
    //CREAMOS EL CONTENEDOR DE LA CARTA DEL PRODUCTO, AGREGÁNDOLE UN ID
    let contenedorCard = $(document.createElement("div"));
    contenedorCard.attr('id',databaseNinas.id);
    contenedorCard.addClass('col-6 col-xs-6 col-sm-4 col-md-4 col-lg-3 galeriaProductos__Card');

    //CREAMOS EL CONTENEDOR DE LA IMÁGEN DEL PRODUCTO, EL CÚAL TIENE EN SU INTERIOR LA RESPECTIVA IMÁGEN DEL CALZADO DE NIÑA Y UN EVENTO CLICK
    let contenedorCardContenedor = $(document.createElement("div"));
    contenedorCardContenedor.addClass('galeriaProductos__CardContenedor');
    contenedorCardContenedor.append(`
    <img src="${databaseNinas.img}" class="galeriaProductos__CardImg" alt="Calzado Niña" type="button" data-toggle="modal" data-target="#exampleModal">
    `)
    contenedorCardContenedor.click(function(){

       //ACCEDEMOS AL NODO DE LA IMÁGEN DEL PRODUCTO EN EL POPUP Y LE AÑADIMOS LA IMÁGEN DEL PRODUCTO EN LA CARD CREADA
       popupImg.attr('src',databaseNinas.img);
       //ACCEDEMOS AL NODO DEL NOMBRE DEL PRODUCTO EN EL POPUP Y LE AÑADIMOS EL NOMBRE DEL PRODUCTO
       popupNombre.html(databaseNinas.nombre);
       //ACCEDEMOS AL NODO DEL PRECIO DEL PRODUCTO EN EL POPUP Y LE AÑADIMOS EL PRECIO DEL PRODUCTO
       popupPrecio.html('$'+databaseNinas.precio);
       //ACCEDEMOS AL NODO DEL STOCK DEL PRODUCTO EN EL POPUP Y LE AÑADIMOS EL STOCK DEL PRODUCTO
       popupStock.html('Stock: '+databaseNinas.stock);
       
       //ALMACENO EN UNA VARIABLE LA CREACIÓN DEL BOTÓN PARA AGREGAR AL CARRITO EN EL POPUP
       let popupBoton = $(document.createElement('button'));
       popupBoton.addClass('popup__ContenedorAgregar button');
       popupBoton.html('Agregar al carrito');
       popupStock.after(popupBoton);
       popupBoton.click(function(){



        //SE CREA UNA VARIABLE QUE ALMACENARÁ LOS NUEVOS VALORES DEL LOCAL STORAGE
        let pedidoLocalStorage = JSON.parse(localStorage.getItem('Carrito'));


        //SE EVALÚA SI EL LOCAL STORAGE ESTA VACÍO
        if(pedidoLocalStorage == null){

            //EN CASO DE ESTAR VACÍO, SE HACE UN PUSH DE DICHO PRODUCTO AL CARRITO                
            carrito.push(databaseNinas);
            
            //SE ALMACENA EL CARRITO AL LOCAL STORAGE
            localStorage.setItem('Carrito', JSON.stringify(carrito));

            alert(`Se ha agregado ${databaseNinas.nombre} al carrito`);


        }else if(pedidoLocalStorage != null){ 

             //SE CREA UN BOOLEAN QUE DIGA TRUE SI EL PRODUCTO ES REPETIDO O DIGA FALSE SI NO ES REPETIDO
             let repetido=false;
             
             /*SE ANALIZA POSICIÓN POR POSICIÓN DEL OBJETO QUE ALMACENA LA INFORMACIÓN DEL LOCAL STORAGE,
             PARA SABER SI COINCIDE ALGUNO DE SUS PRODUCTOS CON EL PRODUCTO ACTUAL, EN CASO DE SER ASÍ EN VEZ 
             DE AGREGAR NUEVAMENTE ESE PRODUCTO, SE MODIFICA LA PROPIEDAD INITIAL Y SE ENVÍA ESE NUEVO VALOR AL
             LOCAL STORAGE*/
             for(let prop of pedidoLocalStorage){
                 
                 if(prop.id==databaseNinas.id){
                     
                     //SE AGREGA TRUE AL BOOLEAN DEBIDO A QUE SI ES REPETIDO
                     repetido=true;

                     //SE EVALÚA QUE LA CANTIDAD DEL MISMO PRODUCTO AGREGADA NO SUPERE EL STOCK
                     if(prop.initial<prop.stock){

                         //SE CAMBIA EL VALOR INITIAL, AGREGANDO UN MISMO PRODUCTO AL CARRITO DE COMPRAS
                         prop.initial=prop.initial+1;
                         //SE ALMACENA EL NUEVO VALOR DEL LOCAL STORAGE CON EL PRODUCTO INITIAL CAMBIADO
                         carrito=pedidoLocalStorage;
                         //SE PASA ESE NUEVO VALOR AL LOCAL STORAGE
                         localStorage.setItem('Carrito', JSON.stringify(carrito));

                         alert(`Se ha agregado ${databaseNinas.nombre} extra al carrito`);
                     }else if(prop.initial==prop.stock){
                         alert('NO SE PUEDE AGREGAR MÁS PRODUCTOS AL CARRITO, LÍMITE DE STOCK ALCANZADO')
                     }
                 }
             }
             
             //SE AGREGA FALSE AL BOOLEAN YA QUE SI NO ES REPETIDO
             if(repetido==false){
                 //EN CASO DE ESTAR VACÍO, SE HACE UN PUSH DE DICHO PRODUCTO AL CARRITO                
                 carrito.push(databaseNinas);

                 //SE ALMACENA EL CARRITO AL LOCAL STORAGE
                 localStorage.setItem('Carrito', JSON.stringify(carrito));

                 alert(`Se ha agregado ${databaseNinas.nombre} al carrito`);
             } 

         }
     });
       
       //AL MOMENTO DE OPRIMIR EL BOTÓN DE CERRAR EL POPUP SE ELIMINA EL BOTÓN DEL CARRITO PARA EVITAR QUE SE ACUMULEN
       popupCerrar.click(function(){
          popup.hide(function(){
             popupBoton.remove();
          });
       })

       popup.show();
    })

    //ALMACENAMOS EN CONTENEDOR DEL PRODUCTO EN EL CONTENEDOR DE SU CARD
    contenedorCard.append(contenedorCardContenedor);

   //EL MÉTODO RETORNARÁ LA TARJETA DEL PRODUCTO Y SUS DATOS
   return (contenedorCard);
 }

 //CREAMOS LA FUNCIÓN ENCARGADA DE CREAR LA CARTA DE LOS PRODUCTOS CON SUS DATOS, SOLICITANDO COMO PARÁMETRO LOS PRODUCTOS DE CALZADO DE ADOLESCENTES
function visualizacionProductosAdolescentes(databaseAdolescentes){
 
    //CREAMOS EL CONTENEDOR DE LA CARTA DEL PRODUCTO, AGREGÁNDOLE UN ID
    let contenedorCard = $(document.createElement("div"));
    contenedorCard.attr('id',databaseAdolescentes.id);
    contenedorCard.addClass('col-6 col-xs-6 col-sm-4 col-md-4 col-lg-3 galeriaProductos__Card');

    //CREAMOS EL CONTENEDOR DE LA IMÁGEN DEL PRODUCTO, EL CÚAL TIENE EN SU INTERIOR LA RESPECTIVA IMÁGEN DEL CALZADO DE ADOLESCENTE Y UN EVENTO CLICK
    let contenedorCardContenedor = $(document.createElement("div"));
    contenedorCardContenedor.addClass('galeriaProductos__CardContenedor');
    contenedorCardContenedor.append(`
    <img src="${databaseAdolescentes.img}" class="galeriaProductos__CardImg" alt="Calzado Adolescente" type="button" data-toggle="modal" data-target="#exampleModal">
    `)
    contenedorCardContenedor.click(function(){

       //ACCEDEMOS AL NODO DE LA IMÁGEN DEL PRODUCTO EN EL POPUP Y LE AÑADIMOS LA IMÁGEN DEL PRODUCTO EN LA CARD CREADA
       popupImg.attr('src',databaseAdolescentes.img);
       //ACCEDEMOS AL NODO DEL NOMBRE DEL PRODUCTO EN EL POPUP Y LE AÑADIMOS EL NOMBRE DEL PRODUCTO
       popupNombre.html(databaseAdolescentes.nombre);
       //ACCEDEMOS AL NODO DEL PRECIO DEL PRODUCTO EN EL POPUP Y LE AÑADIMOS EL PRECIO DEL PRODUCTO
       popupPrecio.html('$'+databaseAdolescentes.precio);
       //ACCEDEMOS AL NODO DEL STOCK DEL PRODUCTO EN EL POPUP Y LE AÑADIMOS EL STOCK DEL PRODUCTO
       popupStock.html('Stock: '+databaseAdolescentes.stock);
       
       //ALMACENO EN UNA VARIABLE LA CREACIÓN DEL BOTÓN PARA AGREGAR AL CARRITO EN EL POPUP
       let popupBoton = $(document.createElement('button'));
       popupBoton.addClass('popup__ContenedorAgregar button');
       popupBoton.html('Agregar al carrito');
       popupStock.after(popupBoton);
       popupBoton.click(function(){



        //SE CREA UNA VARIABLE QUE ALMACENARÁ LOS NUEVOS VALORES DEL LOCAL STORAGE
        let pedidoLocalStorage = JSON.parse(localStorage.getItem('Carrito'));


        //SE EVALÚA SI EL LOCAL STORAGE ESTA VACÍO
        if(pedidoLocalStorage == null){

            //EN CASO DE ESTAR VACÍO, SE HACE UN PUSH DE DICHO PRODUCTO AL CARRITO                
            carrito.push(databaseAdolescentes);
            
            //SE ALMACENA EL CARRITO AL LOCAL STORAGE
            localStorage.setItem('Carrito', JSON.stringify(carrito));

            alert(`Se ha agregado ${databaseAdolescentes.nombre} al carrito`);


        }else if(pedidoLocalStorage != null){ 

             //SE CREA UN BOOLEAN QUE DIGA TRUE SI EL PRODUCTO ES REPETIDO O DIGA FALSE SI NO ES REPETIDO
             let repetido=false;
             
             /*SE ANALIZA POSICIÓN POR POSICIÓN DEL OBJETO QUE ALMACENA LA INFORMACIÓN DEL LOCAL STORAGE,
             PARA SABER SI COINCIDE ALGUNO DE SUS PRODUCTOS CON EL PRODUCTO ACTUAL, EN CASO DE SER ASÍ EN VEZ 
             DE AGREGAR NUEVAMENTE ESE PRODUCTO, SE MODIFICA LA PROPIEDAD INITIAL Y SE ENVÍA ESE NUEVO VALOR AL
             LOCAL STORAGE*/
             for(let prop of pedidoLocalStorage){
                 
                 if(prop.id==databaseAdolescentes.id){
                     
                     //SE AGREGA TRUE AL BOOLEAN DEBIDO A QUE SI ES REPETIDO
                     repetido=true;

                     //SE EVALÚA QUE LA CANTIDAD DEL MISMO PRODUCTO AGREGADA NO SUPERE EL STOCK
                     if(prop.initial<prop.stock){

                         //SE CAMBIA EL VALOR INITIAL, AGREGANDO UN MISMO PRODUCTO AL CARRITO DE COMPRAS
                         prop.initial=prop.initial+1;
                         //SE ALMACENA EL NUEVO VALOR DEL LOCAL STORAGE CON EL PRODUCTO INITIAL CAMBIADO
                         carrito=pedidoLocalStorage;
                         //SE PASA ESE NUEVO VALOR AL LOCAL STORAGE
                         localStorage.setItem('Carrito', JSON.stringify(carrito));

                         alert(`Se ha agregado ${databaseAdolescentes.nombre} extra al carrito`);
                     }else if(prop.initial==prop.stock){
                         alert('NO SE PUEDE AGREGAR MÁS PRODUCTOS AL CARRITO, LÍMITE DE STOCK ALCANZADO')
                     }
                 }
             }
             
             //SE AGREGA FALSE AL BOOLEAN YA QUE SI NO ES REPETIDO
             if(repetido==false){
                 //EN CASO DE ESTAR VACÍO, SE HACE UN PUSH DE DICHO PRODUCTO AL CARRITO                
                 carrito.push(databaseAdolescentes);

                 //SE ALMACENA EL CARRITO AL LOCAL STORAGE
                 localStorage.setItem('Carrito', JSON.stringify(carrito));

                 alert(`Se ha agregado ${databaseAdolescentes.nombre} al carrito`);
             } 

         }
     });
       
       //AL MOMENTO DE OPRIMIR EL BOTÓN DE CERRAR EL POPUP SE ELIMINA EL BOTÓN DEL CARRITO PARA EVITAR QUE SE ACUMULEN
       popupCerrar.click(function(){
          popup.hide(function(){
             popupBoton.remove();
          });
       })

       popup.show();
    })

    //ALMACENAMOS EN CONTENEDOR DEL PRODUCTO EN EL CONTENEDOR DE SU CARD
    contenedorCard.append(contenedorCardContenedor);

   //EL MÉTODO RETORNARÁ LA TARJETA DEL PRODUCTO Y SUS DATOS
   return (contenedorCard);
 }