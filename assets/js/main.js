
const btnTheme = document.getElementById( "theme_btn" ); // BOTON OSCURO/CLARO

const body = document.body;                              // BODY

const cartBtnOpen = document.getElementById("cart-btn"); // BOLSA UBICADA EN HEADER

const cartBtnClose = document.getElementById("close-cart"); // X MOSTRADA EN EL CART COTAINER

const btnMenu = document.getElementById( "btn_menu" );       // BOTON ABRIR MENU

const menu = document.getElementById( "menu" );              //  MENU OCULTO

const menuClose = document.getElementById( "close_menu" );   // X MOSTRADA EN EL MENU 

const menuProductos = document.getElementById( "productos" ); // ETIQUETA P DENTRO DE MENU DESPLEGADO

const menuHome = document.getElementById( "home" );          // ETIQUETA P DENTRO DEL MENU DESPLEGADO

const fptd = document.getElementById( "discover" );          // IMAGEN DE PRODUCTO DESTACADO

const header = document.querySelector("header");            // HEADER

const menuFiltros = document.getElementById("filter_contain"); // MENU PARA FILTRAR PRODUCTOS

const productContain = document.querySelector(`#products_contain`); // CONTENEDOR DE PRODUCTOS GENERALES

const cartContainer = document.getElementById("cart-container"); // CONTENEDOR CART GENERAL

const cartProductsSelected = document.getElementById("cart-content"); // CONTENEDOR DE PRODUCTOS SELECCIONADOS

const counter = document.getElementById('bag_count');             // CONTADOR DEL ICONO BAG 

const sumarItem = document.getElementById("sumar")

const totalCart = document.getElementById("totalCart")

let sumaArticulos = 0

const changeOne = document.getElementById("change1")

const changeTwo = document.getElementById("change2")


/// OBTENCION BOTONES DE MENU DE FILTROS

const btnAll = document.querySelector(".all");

const btnVinil = document.querySelector(".viniles");

const btnCinta = document.querySelector(".cintas");

const btnAplique = document.querySelector(".apliques");

const btnDecor = document.querySelector(".decorables");


/// FILTROS DE PRODUCTOS

const filterProductsall = itemsP;

const filterProductsVinil = itemsP.filter(product => product.type === "vinil");

const filterProductsCinta = itemsP.filter(product => product.type === "cinta");

const filterProductsAplique = itemsP.filter(product => product.type === "aplique");

const filterProductsDecorable = itemsP.filter(product => product.type === "decorable");



/// FUNCION TEMA OSCURO / CLARO... MODIFICA VARIABLES, INTERCAMBIAN SUN POR MOON, CAMBIA BACKGROUN DE DISCOVER

const themeDark = () => {
    if( btnTheme.classList.contains("bx-moon") ){
        btnTheme.classList.replace("bx-moon", "bx-sun")
    }else{
        btnTheme.classList.replace("bx-sun", "bx-moon")
    }
    body.classList.toggle( "dark" )
    fptd.classList.toggle( "bg" )
};


/// FUNCION PARA DETECTAR SCROLL

window.addEventListener( "scroll", () =>{
    if(scrollY >= 50){
        header.classList.add("scroll-bg")
    }else{
        header.classList.remove("scroll-bg")
    }
});

/// FUNCION PARA ALTERNAR COLOR DE MENUS

window.addEventListener( "scroll", () =>{
    if(scrollY >= 850){
        changeOne.classList.remove("change")
        changeTwo.classList.add("change")
    } else {
        changeOne.classList.add("change")
        changeTwo.classList.remove("change")
    }
});

/// FUNCION PARA ALTERNAR COLOR DE MENUS
const loadComponent = () => {
    const loaderC = document.getElementById("loader")
    

    setTimeout( () => {
        loaderC.classList.add("chao")
        console.log("ya pasaron 3.5segundos");
    }, 3500)
}


document.addEventListener( "DOMContentLoaded", () =>{
    loadComponent()
});

/// EVENLISTENER MOSTRAR MENU Y CART CONTEINER

btnTheme.addEventListener( "click", () => themeDark()); // EJECUTA LA FUNCION themeDark

cartBtnOpen.addEventListener( "click", () => cartContainer.classList.remove("hide") );

cartBtnClose.addEventListener( "click", () => cartContainer.classList.add("hide")  );

btnMenu.addEventListener( "click", () => menu.classList.remove("hide") );

menuClose.addEventListener( "click", () => menu.classList.add("hide")  );

menuProductos.addEventListener( "click", () => menu.classList.add("hide")  ); // ETIQUETA P DEL MENU

menuHome.addEventListener( "click", () => menu.classList.add("hide")  );    // ETIQUETA P DEL MENU



/// MOSTRAR ELEMENTOS POR CLASE



/// CREACION DE TARJETA DE PRODUCTOS GENERALES

function createCardProductGeneral(product){
    const articleC = document.createElement("article")
      articleC.className = "card_article"
    
    articleC.innerHTML = `
        <button class="add" id="${product.id}">+</button>
        <img src="${product.image}" alt="" class="article_img">
        <div class="article_description">
          <h4>$ ${product.price}</h4>
          <p> Disponibilidad: ${product.quantity}</p>
          <h5>${product.name}</h5>
        </div>
      `
    productContain.append(articleC)
};


/// MOSTRAR PRODUCTOS GENERALES

const carrito = []

itemsP.forEach(product => {
    createCardProductGeneral(product);

    const addCart = document.getElementById(product.id)
    addCart.addEventListener("click", () => {
        agregarAlCarrito(product.id)
    })
});

/// FORMANDO ARRAY ITEM SELECTED
counter.innerText = 0
const agregarAlCarrito = (prodId) => {
    
    addProduct(prodId)
    //const itemSelected = itemsP.find( (prod) => prod.id === prodId)
    //carrito.push(itemSelected);
    actualizarCart();
    counter.innerHTML = carrito.length
}

function addProduct( prodId ){

    let itemAdd = carrito.find( (item) => item.id === prodId )

    if( itemAdd ){

        //Condicion para saber si aun pueden seleccionar mas productos de ese tipo
        let index = carrito.indexOf( itemAdd )

        carrito[index].qs++
        
    }else{
    
        const itemSelected = itemsP.find( item => item.id === prodId )
        itemSelected.qs = 1
        carrito.push( itemSelected )
    } console.log(carrito);
}



/// CREACION DE TARJETA DENTRO DE CART CONTEINER

function createCardProductSelected(productSelected){
    const cardsInCart = document.createElement("div");
    cardsInCart.className = "cards_in_cart"
    cardsInCart.id = "cards_in_cart"

    cardsInCart.innerHTML = `
        <img src="${productSelected.image}" alt="producto seleccionado">
        <div class="cic_description">
            <h4>${productSelected.name}</h4>
            <p>Stock ${productSelected.quantity} |<span id="cic_precio">$ ${productSelected.price}</span></p>
            <h5 id="s_total">Sub Total: $ ${productSelected.price * productSelected.qs} </h5>
            <div class="resumen">
                <div>
                    <button onclick="restar(${productSelected.id})">-</button>
                    <p>${productSelected.qs}</p>
                    <button id="sumar" onclick="sumar(${productSelected.id})">+</button>
                </div>
                <i class='bx bxs-eraser bx-md' onclick="eliminarDelCarrito(${productSelected.id})"></i>
            </div>
        </div>`
    
    cartProductsSelected.append(cardsInCart)
};

// MOSTRAR TARJETAS DE PRODUCTOS SELECCIONADOS

const actualizarCart = () => {
    cartProductsSelected.innerHTML= ""

    carrito.forEach(productSelected =>{
        createCardProductSelected(productSelected)
    });
}

/// ELIMINAR DEL CARRITO

const eliminarDelCarrito = (prodId) => {
    const x = carrito.find( (prod) => prod.id === prodId)
    const index = carrito.indexOf(x)
    carrito.splice(index, 1)
    actualizarCart()
    counter.innerHTML = carrito.length
}

/// FUNCION RESTAR
const restar = (prodId) => {
    const resItem = carrito.find( (prod) => prod.id === prodId)
    const index = carrito.indexOf(resItem)
    if (resItem.qs > 1){
        
        carrito[index].qs--
    } else {
        carrito.splice(index, 1)
    }
    actualizarCart()
    counter.innerHTML = carrito.length
}

/// FUNCION SUMAR

const sumar = (prodId) => {
    const sumItem = carrito.find( (prod) => prod.id === prodId)
    const index = carrito.indexOf(sumItem)
    if (sumItem.quantity > sumItem.qs){
        carrito[index].qs++
    }

    actualizarCart()
    counter.innerHTML = carrito.length
}

/*
const sumaTotalMount = (prodId) => {
        
    carrito.forEach( Items => {
    sumaArticulos += (Items.qs * Items.price)
    })
    totalCart.textContent = sumaArticulos
}*/