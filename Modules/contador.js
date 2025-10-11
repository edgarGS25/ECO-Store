

export function crearContador (contenedorPadre, precioProducto, elemento, nombreProducto, cantidad){
    const contenedorContador = document.createElement("div")
    contenedorContador.className = "counter-container"

    const botonMenos = document.createElement("button")
    botonMenos.textContent = "-"
    

    const valorContador = document.createElement("p")
    valorContador.textContent = Number(cantidad)

    const botonMas = document.createElement("button")
    botonMas.textContent = "+"
    botonMenos.addEventListener("click", () => {
        if(Number(valorContador.textContent) > 1){
            valorContador.textContent = Number(valorContador.textContent) - 1
            const multiplicacion = Number(precioProducto) * Number(valorContador.textContent)
            elemento.textContent = multiplicacion.toFixed(2)
            // Actualizar la cantidad en Local Storage
            actualizarCantidadEnLocalStorage(nombreProducto, Number(valorContador.textContent));
            actualizarTotal();
        }
    })
    botonMas.addEventListener("click", () => {
        valorContador.textContent = Number(valorContador.textContent) + 1
        const multiplicacion = Number(precioProducto) * Number(valorContador.textContent)
        elemento.textContent = multiplicacion.toFixed(2)
        // Actualizar la cantidad en Local Storage
        actualizarCantidadEnLocalStorage(nombreProducto, Number(valorContador.textContent))
        actualizarTotal();
    })

    // Función para actualizar la cantidad en Local Storage
    function actualizarCantidadEnLocalStorage(nombre, cantidad) {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const itemIndex = cartItems.findIndex(item => item.nombre === nombre);
        if (itemIndex !== -1) {
            cartItems[itemIndex].cantidad = cantidad; // Actualiza la cantidad
            localStorage.setItem('cart', JSON.stringify(cartItems)); // Guarda en Local Storage
        }
    }

   

    contenedorContador.appendChild(botonMenos)
    contenedorContador.appendChild(valorContador)
    contenedorContador.appendChild(botonMas)

    contenedorPadre.appendChild(contenedorContador)
}

// Función para actualizar el total del carrito
export function actualizarTotal(){
        const itemPrice = document.querySelectorAll(".cart-item-info p span")
        let precios = []
        const totalPrice = document.querySelector(".total-price")

        itemPrice.forEach(item => {
            precios.push(Number(item.textContent))
            
        })
        const sumaTotal = precios.reduce((a,b) => a + b, 0)
        totalPrice.textContent = `$${sumaTotal.toFixed(2)}`

        const valorContador = document.querySelectorAll(".counter-container p")
        let cantidades = []
        valorContador.forEach(item => {
            cantidades.push(Number(item.textContent))
        })
        const sumaCantidades = cantidades.reduce((a,b) => a + b, 0)

        const totalItems = document.querySelector(".total-items")
        totalItems.textContent = sumaCantidades
    }