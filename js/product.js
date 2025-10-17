import { crearElementoCarrito, actualizarContadorCarrito} from './script.js';

document.addEventListener('DOMContentLoaded', () => {
                // Recuperar los datos del producto desde localStorage
                const productData = JSON.parse(localStorage.getItem('selectedProduct'));

                if (productData) {
                // Seleccionar los elementos donde se mostrarán los datos
                const productImage = document.querySelector('.product-image');
                const productName = document.querySelector('.product-name');
                const productDescription = document.querySelector('.product-description');
                const productPrice = document.querySelector('.product-price');
                const addToCartButton = document.querySelector('.add-to-cart');
                

                // Evento para agregar al carrito desde la página de producto
                addToCartButton.addEventListener('click', () => {
                    crearElementoCarrito(productData.name, Number(productData.price), productData.image);
                    // Actualizar el contador del carrito
                    actualizarContadorCarrito();
                });

                // Asignar los datos al DOM
                productImage.src = productData.image || '';
                productImage.alt = productData.name || 'Producto';
                productName.textContent = productData.name || 'Nombre del producto';
                productDescription.textContent = productData.description || 'Descripción del producto';
                productPrice.textContent = `$${productData.price ? productData.price.toFixed(2) : '0.00'}`;
    }
});




