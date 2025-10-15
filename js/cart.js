
import { crearContador, actualizarTotal } from "../Modules/contador.js"
const cartContain = document.querySelector(".cart-contain")


// Función para cargar los productos del carrito desde localStorage


export function cargarItemsCarrito(){
     const cartItemsLocalStorage = JSON.parse(localStorage.getItem('cart')) || []; // Obtener productos o un array vacío

     cartItemsLocalStorage.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';

        const imgC = document.createElement('div');
        imgC.className = 'img-container';
        const img = document.createElement('img');
        img.src = item.imagenSrc;
        img.alt = item.nombre;
        imgC.appendChild(img);

        const info = document.createElement('div');
        info.className = 'cart-item-info';
        const h3 = document.createElement('h3');
        h3.textContent = item.nombre;
        const p = document.createElement('p');
        p.textContent = `$`;
        const priceNumber = document.createElement("span")
        priceNumber.textContent = (item.precio * (item.cantidad || 1)).toFixed(2); // Multiplica por la cantidad guardada
        
        const btn = document.createElement('button');
        btn.textContent = 'x';
        btn.addEventListener('click', () => eliminarElementoCarrito(item.nombre));

        info.appendChild(h3);
        info.appendChild(p);
        p.appendChild(priceNumber)
        crearContador(info, item.precio, priceNumber, item.nombre, item.cantidad)
        info.appendChild(btn);
        
        cartItem.appendChild(imgC);
        
        cartItem.appendChild(info);
        
        cartContain.appendChild(cartItem)
     })
     actualizarTotal()

     // Función para eliminar un producto del carrito
     function eliminarElementoCarrito(nombre) {
        let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        cartItems = cartItems.filter(item => item.nombre !== nombre); // Filtrar el producto eliminado
        localStorage.setItem('cart', JSON.stringify(cartItems)); // Actualizar localStorage
        // Eliminar elemento visualmente
        const items = cartContain.querySelectorAll('.cart-item');
        items.forEach(it => {
            if (it.querySelector('.cart-item-info h3').textContent === nombre) it.remove();
        });
        actualizarTotal();
    }
}

// Funcion para mostrar elemeto agregado recientemente al carrito
export function actualizarElementoCarrito(nombre, precio, imagenSrc) {
   const cartMap = new Map();
   const cartItemsLocalStorage = JSON.parse(localStorage.getItem('cart')) || [];
   
   // Llenar el mapa con los elementos actuales del carrito
   cartItemsLocalStorage.forEach(item => {
     cartMap.set(item.nombre, item);
    });

   // Si el producto ya existe, incrementar la cantidad
   if (cartMap.has(nombre)) {
     const existingItem = cartMap.get(nombre);
     existingItem.cantidad = (existingItem.cantidad || 1) + 1; // Incrementar cantidad
     cartMap.set(nombre, existingItem);
   } else {
     // Si no existe, agregarlo con cantidad 1
     cartMap.set(nombre, { nombre, precio, imagenSrc, cantidad: 1 });
   }

   // Convertir el mapa de nuevo a un array y guardarlo en localStorage
   const updatedCartItems = Array.from(cartMap.values());
   localStorage.setItem('cart', JSON.stringify(updatedCartItems));

   // Limpiar el contenedor del carrito y recargar los elementos
   cartContain.innerHTML = '';
   cargarItemsCarrito();
}