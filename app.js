//----------------------------1----Declaraciones de las constantes
const cards         = document.getElementById('cards')
const items         = document.getElementById('items') 
const footer        =document.getElementById('footer') 
const templateCard  = document.getElementById('template-card').content 
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragmento     = document.createDocumentFragment() 


//---------------------2-- Se Creacion del objeto carrito
let carrito = {}

//----
document.addEventListener('DOMContentLoaded', () => { 
    fetchData() 
}) 

//--------------------3---Evento on click
cards.addEventListener('click', e =>{
    addCarrito(e)
})
//-------------------4--Consumo de api resjson
const fetchData = async () => { 
    try{ 
        const res  = await fetch('api.json') 
        const data = await res.json() 
        console.log(data) 
        mostrarProductos(data) 
    }catch (error) { 
        console.log(error)         
    } 
} 
//---------------------------------------5---Medtodo-----MostrarProductos 
    const mostrarProductos = data => { 
         data.forEach(producto => { 
            templateCard.querySelector('h5').textContent = producto.title  //titulo
            templateCard.querySelector('p').textContent = producto.precio  //precion
            templateCard.querySelector('img').setAttribute("src", producto.thumbnailUrl)  //imagen
            templateCard.querySelector('.btn-dark').dataset.id = producto.id 
            const clone = templateCard.cloneNode(true) 
            fragmento.appendChild(clone) 
         });  
         cards.appendChild(fragmento) 
    } 


    //--------------------------6--------Metodo ADD Carrito----Dar salida al carrito (set,parent-socia)
 const addCarrito = e =>{

    if(e.target.classList.contains('btn-dark')){
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
 }



 
    //----------------------------7---------Metodo Inicializar el carrito
 const setCarrito = objeto =>{ //quede en cero
    const producto = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        title: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad: 1
    }
    //si existe el registro con el id 
    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad +1
    }
    carrito[producto.id] = {...producto} 
    mostrarCarrito ()
    //console.log(carrito)
 }

//---- --------------------------8------------Mostrar carrio
 const mostrarCarrito = () => {
    items.innerHTML =''
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio
        const cloneProducto = templateCarrito.cloneNode(true)
        fragmento.appendChild(cloneProducto)
    })
    items.appendChild(fragmento)
    mostrarFooter()
 }
 //------------------------------------9---------Metodo mostrar footer consumo
const mostrarFooter = () => {
    footer. innerHTML = ''
    if(Object.keys(carrito).length === 0){
        footer.innerHTML =`<th scope = "row" colspan = "5">Carrito vacio - comience a comprar!!</th>
        `
    }
}