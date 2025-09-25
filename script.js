const card = document.querySelector('.product-card');
const svgs = document.querySelectorAll('.card-svg');
const furnitureSvgs = document.querySelectorAll('.card-svg-furniture');
const wishlist = document.querySelector('.wishlist');
const wishlistContain = document.querySelector('.wishlist-contain');
let wishlistFilled = false;
// Eventos para el ícono de wishlist
wishlist.addEventListener('click', toggleWishlist);
wishlistContain.addEventListener('mouseover', () => {
    wishlistContain.style.display = 'flex';
    wishlist.innerHTML = `
            <svg width="36" height="36" viewBox="0 0 24 24" fill="#7C6A0A" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.34255 7.7779C3.5687 7.23194 3.90017 6.73586 4.31804 6.31799C4.7359 5.90012 5.23198 5.56865 5.77795 5.3425C6.32392 5.11635 6.90909 4.99995 7.50004 4.99995C8.09099 4.99995 8.67616 5.11635 9.22213 5.3425C9.7681 5.56865 10.2642 5.90012 10.682 6.31799L12 7.63599L13.318 6.31799C14.162 5.47407 15.3066 4.99997 16.5 4.99997C17.6935 4.99997 18.8381 5.47407 19.682 6.31799C20.526 7.16191 21.0001 8.30651 21.0001 9.49999C21.0001 10.6935 20.526 11.8381 19.682 12.682L12 20.364L4.31804 12.682C3.90017 12.2641 3.5687 11.7681 3.34255 11.2221C3.1164 10.6761 3 10.0909 3 9.49999C3 8.90904 3.1164 8.32387 3.34255 7.7779Z" stroke="#7C6A0A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
        wishlistFilled = true;
});
wishlistContain.addEventListener('mouseout', () => {
    wishlistContain.style.display = 'none';
    wishlist.innerHTML = `
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.34255 7.7779C3.5687 7.23194 3.90017 6.73586 4.31804 6.31799C4.7359 5.90012 5.23198 5.56865 5.77795 5.3425C6.32392 5.11635 6.90909 4.99995 7.50004 4.99995C8.09099 4.99995 8.67616 5.11635 9.22213 5.3425C9.7681 5.56865 10.2642 5.90012 10.682 6.31799L12 7.63599L13.318 6.31799C14.162 5.47407 15.3066 4.99997 16.5 4.99997C17.6935 4.99997 18.8381 5.47407 19.682 6.31799C20.526 7.16191 21.0001 8.30651 21.0001 9.49999C21.0001 10.6935 20.526 11.8381 19.682 12.682L12 20.364L4.31804 12.682C3.90017 12.2641 3.5687 11.7681 3.34255 11.2221C3.1164 10.6761 3 10.0909 3 9.49999C3 8.90904 3.1164 8.32387 3.34255 7.7779Z" stroke="#7C6A0A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
        wishlistFilled = false;
});

function toggleWishlist() {
    if (!wishlistFilled) {
        wishlistContain.style.display = 'flex';
        wishlist.innerHTML = `
            <svg width="36" height="36" viewBox="0 0 24 24" fill="#7C6A0A" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.34255 7.7779C3.5687 7.23194 3.90017 6.73586 4.31804 6.31799C4.7359 5.90012 5.23198 5.56865 5.77795 5.3425C6.32392 5.11635 6.90909 4.99995 7.50004 4.99995C8.09099 4.99995 8.67616 5.11635 9.22213 5.3425C9.7681 5.56865 10.2642 5.90012 10.682 6.31799L12 7.63599L13.318 6.31799C14.162 5.47407 15.3066 4.99997 16.5 4.99997C17.6935 4.99997 18.8381 5.47407 19.682 6.31799C20.526 7.16191 21.0001 8.30651 21.0001 9.49999C21.0001 10.6935 20.526 11.8381 19.682 12.682L12 20.364L4.31804 12.682C3.90017 12.2641 3.5687 11.7681 3.34255 11.2221C3.1164 10.6761 3 10.0909 3 9.49999C3 8.90904 3.1164 8.32387 3.34255 7.7779Z" stroke="#7C6A0A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
        wishlistFilled = true;
    } else {
        wishlistContain.style.display = 'none';
        wishlist.innerHTML = `
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.34255 7.7779C3.5687 7.23194 3.90017 6.73586 4.31804 6.31799C4.7359 5.90012 5.23198 5.56865 5.77795 5.3425C6.32392 5.11635 6.90909 4.99995 7.50004 4.99995C8.09099 4.99995 8.67616 5.11635 9.22213 5.3425C9.7681 5.56865 10.2642 5.90012 10.682 6.31799L12 7.63599L13.318 6.31799C14.162 5.47407 15.3066 4.99997 16.5 4.99997C17.6935 4.99997 18.8381 5.47407 19.682 6.31799C20.526 7.16191 21.0001 8.30651 21.0001 9.49999C21.0001 10.6935 20.526 11.8381 19.682 12.682L12 20.364L4.31804 12.682C3.90017 12.2641 3.5687 11.7681 3.34255 11.2221C3.1164 10.6761 3 10.0909 3 9.49999C3 8.90904 3.1164 8.32387 3.34255 7.7779Z" stroke="#7C6A0A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
        wishlistFilled = false;
    }
}

function crearElementoWishlist(nombre, precio, imagenSrc) {
    wishlistContain.innerHTML += `
        <div class="cart-item">
            <div class="img-container">
                <img src="${imagenSrc}" alt="${nombre}">
            </div>
            <div class="cart-item-info">
                <h3>${nombre}</h3>
                <p>${precio}</p>
                <button onclick="eliminarElementoWishlist(this)">Eliminar</button>
            </div>
        </div>
    `;
}

function eliminarElementoWishlist(button) { 
    button.parentElement.parentElement.remove();
    // Actualizar el estado del corazón correspondiente
    const productName = button.parentElement.querySelector('h3').textContent;
    svgs.forEach(svg => {
        const svgProductName = svg.parentElement.querySelector('.product-name').textContent;
        if (svgProductName === productName) {
            svg.innerHTML = `
                <path d="M3.34255 7.7779C3.5687 7.23194 3.90017 6.73586 4.31804 6.31799C4.7359 5.90012 5.23198 5.56865 5.77795 5.3425C6.32392 5.11635 6.90909 4.99995 7.50004 4.99995C8.09099 4.99995 8.67616 5.11635 9.22213 5.3425C9.7681 5.56865 10.2642 5.90012 10.682 6.31799L12 7.63599L13.318 6.31799C14.162 5.47407 15.3066 4.99997 16.5 4.99997C17.6935 4.99997 18.8381 5.47407 19.682 6.31799C20.526 7.16191 21.0001 8.30651 21.0001 9.49999C21.0001 10.6935 20.526 11.8381 19.682 12.682L12 20.364L4.31804 12.682C3.90017 12.2641 3.5687 11.7681 3.34255 11.2221C3.1164 10.6761 3 10.0909 3 9.49999C3 8.90904 3.1164 8.32387 3.34255 7.7779Z" fill="none" stroke="#7C6A0A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            `;
            isFilled = false;
        }
    });
}

function eliminarTodosElementosWishlist(){
    const cartItems = document.querySelectorAll('.cart-item');
    cartItems.forEach(cartItem => {
        cartItem.remove();
    });
}
let isFilled
// Eventos para los íconos de los productos
svgs.forEach(svg => {
    isFilled = false;
    svg.addEventListener('click', () => {
        if (!isFilled) {
            // Rellenar el corazón al hacer clic
            svg.innerHTML = `
                <path d="M3.34255 7.7779C3.5687 7.23194 3.90017 6.73586 4.31804 6.31799C4.7359 5.90012 5.23198 5.56865 5.77795 5.3425C6.32392 5.11635 6.90909 4.99995 7.50004 4.99995C8.09099 4.99995 8.67616 5.11635 9.22213 5.3425C9.7681 5.56865 10.2642 5.90012 10.682 6.31799L12 7.63599L13.318 6.31799C14.162 5.47407 15.3066 4.99997 16.5 4.99997C17.6935 4.99997 18.8381 5.47407 19.682 6.31799C20.526 7.16191 21.0001 8.30651 21.0001 9.49999C21.0001 10.6935 20.526 11.8381 19.682 12.682L12 20.364L4.31804 12.682C3.90017 12.2641 3.5687 11.7681 3.34255 11.2221C3.1164 10.6761 3 10.0909 3 9.49999C3 8.90904 3.1164 8.32387 3.34255 7.7779Z" fill="#7C6A0A" stroke="#7C6A0A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            `;
            isFilled = true;
            if(isFilled === true){
                const productName = svg.parentElement.querySelector('.product-name').textContent;
                const productPrice = svg.parentElement.querySelector('.product-price').textContent;
                const productImageSrc = svg.parentElement.querySelector('.img-container img').src;
                crearElementoWishlist(productName, productPrice, productImageSrc);
            }
        } else {
            // Quitar relleno al hacer clic nuevamente
            svg.innerHTML = `
                <path d="M3.34255 7.7779C3.5687 7.23194 3.90017 6.73586 4.31804 6.31799C4.7359 5.90012 5.23198 5.56865 5.77795 5.3425C6.32392 5.11635 6.90909 4.99995 7.50004 4.99995C8.09099 4.99995 8.67616 5.11635 9.22213 5.3425C9.7681 5.56865 10.2642 5.90012 10.682 6.31799L12 7.63599L13.318 6.31799C14.162 5.47407 15.3066 4.99997 16.5 4.99997C17.6935 4.99997 18.8381 5.47407 19.682 6.31799C20.526 7.16191 21.0001 8.30651 21.0001 9.49999C21.0001 10.6935 20.526 11.8381 19.682 12.682L12 20.364L4.31804 12.682C3.90017 12.2641 3.5687 11.7681 3.34255 11.2221C3.1164 10.6761 3 10.0909 3 9.49999C3 8.90904 3.1164 8.32387 3.34255 7.7779Z" fill="none" stroke="#7C6A0A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            `;
            isFilled = false;
            const productName = svg.parentElement.querySelector('.product-name').textContent;
            const cartItems = document.querySelectorAll('.cart-item');
            cartItems.forEach(cartItem => {
                const itemName = cartItem.querySelector('.cart-item-info h3').textContent;
                if (itemName === productName) {
                    cartItem.remove();
                }
            });
        }
    });
});

furnitureSvgs.forEach(svg => {
    let isFilled = false;
    svg.addEventListener('click', () => {
        if (!isFilled) {
            // Rellenar el corazón al hacer clic
            svg.innerHTML = `
                <path d="M3.34255 7.7779C3.5687 7.23194 3.90017 6.73586 4.31804 6.31799C4.7359 5.90012 5.23198 5.56865 5.77795 5.3425C6.32392 5.11635 6.90909 4.99995 7.50004 4.99995C8.09099 4.99995 8.67616 5.11635 9.22213 5.3425C9.7681 5.56865 10.2642 5.90012 10.682 6.31799L12 7.63599L13.318 6.31799C14.162 5.47407 15.3066 4.99997 16.5 4.99997C17.6935 4.99997 18.8381 5.47407 19.682 6.31799C20.526 7.16191 21.0001 8.30651 21.0001 9.49999C21.0001 10.6935 20.526 11.8381 19.682 12.682L12 20.364L4.31804 12.682C3.90017 12.2641 3.5687 11.7681 3.34255 11.2221C3.1164 10.6761 3 10.0909 3 9.49999C3 8.90904 3.1164 8.32387 3.34255 7.7779Z" fill="white" stroke="#7C6A0A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            `;
            isFilled = true;
        } else {
            // Quitar relleno al hacer clic nuevamente
            svg.innerHTML = `
                <path d="M3.34255 7.7779C3.5687 7.23194 3.90017 6.73586 4.31804 6.31799C4.7359 5.90012 5.23198 5.56865 5.77795 5.3425C6.32392 5.11635 6.90909 4.99995 7.50004 4.99995C8.09099 4.99995 8.67616 5.11635 9.22213 5.3425C9.7681 5.56865 10.2642 5.90012 10.682 6.31799L12 7.63599L13.318 6.31799C14.162 5.47407 15.3066 4.99997 16.5 4.99997C17.6935 4.99997 18.8381 5.47407 19.682 6.31799C20.526 7.16191 21.0001 8.30651 21.0001 9.49999C21.0001 10.6935 20.526 11.8381 19.682 12.682L12 20.364L4.31804 12.682C3.90017 12.2641 3.5687 11.7681 3.34255 11.2221C3.1164 10.6761 3 10.0909 3 9.49999C3 8.90904 3.1164 8.32387 3.34255 7.7779Z" fill="none" stroke="#7C6A0A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            `;
            isFilled = false;
        }
    });
});

