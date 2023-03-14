const contenedorProductos = document.getElementById('contenedor-productos')

const contenedorCarrito = document.getElementById('carrito-contenedor')

const botonVaciar = document.getElementById('vaciar-carrito')

const contadorCarrito = document.getElementById('contadorCarrito')


const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')

let carrito = []

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})
//SEXTO PASO
botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
})

stockProductos.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <img src = "${producto.img}" class = "card-img-tom imagenproductos">    
    <h2 class="fs-3" text-center> ${producto.nombre} ${producto.color} </h2>
    <h3 class= "text-center fs-2"> $${producto.precio} <del>$${producto.precioAnterior}</del> </h3>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>

    `
    contenedorProductos.appendChild(div)


    const boton = document.getElementById(`agregar${producto.id}`)

    boton.addEventListener('click', () => {

        agregarAlCarrito(producto.id)

    })
})



const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)

    const indice = carrito.indexOf(item)

    carrito.splice(indice, 1)
    actualizarCarrito()
    console.log(carrito)
}

const agregarAlCarrito = (prodId) => {


    const existe = carrito.some(prod => prod.id === prodId)

    if (existe) {
        const prod = carrito.map(prod => {
            if (prod.id === prodId) {
                prod.cantidad++
            }
        })
    } else {
        const item = stockProductos.find((prod) => prod.id === prodId)
        carrito.push(item)
    }

    actualizarCarrito()
}

const actualizarCarrito = () => {

    contenedorCarrito.innerHTML = ""

    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `

        contenedorCarrito.appendChild(div)

        localStorage.setItem('carrito', JSON.stringify(carrito))

    })

    contadorCarrito.innerText = carrito.length

    console.log(carrito)
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
}

const formulario = document.querySelector("#formulario")
const boton = document.querySelector("#boton")
const resultado = document.querySelector("#resultado")

const filtrar = ()=>{

    resultado.innerHTML = "";
   const texto = formulario.value.toLowerCase()
   for(let producto of stockProductos){
    let nombre = stockProductos.nombre.toLowerCase()
    if(nombre.indexOf(texto) !== -1){
        const div = document.createElement('div')
        div.classList.add('producto')
        div.innerHTML = `
        <img src = "${prod.img}" class = "card-img-tom imagenproductos">    
        <h2 class="fs-3" text-center> ${producto.nombre} ${producto.color} </h2>
        <h3 class= "text-center fs-2"> $${producto.precio} <del>$${producto.precioAnterior}</del> </h3>
        <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
    
        `
    }
   }

   if(resultado.innerHTML === ""){
    resultado.innerHTML += `
    <li>Producto no encontrado...</li>
    `
   }
}

//MODAL
boton.addEventListener("click", filtrar)

const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
const botonAbrir = document.getElementById('boton-carrito')
const botonCerrar = document.getElementById('carritoCerrar')
const modalCarrito = document.getElementsByClassName('modal-carrito')[0]


botonAbrir.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})
botonCerrar.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})

contenedorModal.addEventListener('click', (event) =>{
    contenedorModal.classList.toggle('modal-active')

})
modalCarrito.addEventListener('click', (event) => {
    event.stopPropagation() 
})