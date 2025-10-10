// Selección de elementos principales de la interfaz
const cardSection = document.querySelector('.card-section');
const wishlist = document.querySelector('.wishlist');
const wishlistContain = document.querySelector('.wishlist-contain');
const cartIcon = document.querySelector('.cart');
const cartContainer = document.querySelector('.cart-contain');

// Variables de estado para productos, wishlist y carrito
let productosCuidadoSalud = [];
const wishlistMap = new Map();
const cartMap = new Map();

// Función para obtener los productos desde el archivo JSON
async function fetchProducts() {
  try {
    const res = await fetch('data.json');
    const data = await res.json();
    productosCuidadoSalud = data.productsHealth || [];
    crearCards();
  } catch (e) {
    console.error('Error fetching products', e);
  }
}

// Función para generar dinámicamente las cards de productos
function crearCards() {
  if (!cardSection) return;
  const frag = document.createDocumentFragment();

  productosCuidadoSalud.forEach(producto => {
    // Contenedor de cada card
    const card = document.createElement('div');
    card.className = 'product-card';

    // Botón SVG para wishlist (corazón)
    const heartBtn = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    heartBtn.setAttribute('width', '34');
    heartBtn.setAttribute('height', '34');
    heartBtn.setAttribute('viewBox', '0 0 24 24');
    heartBtn.classList.add('card-svg');
    heartBtn.dataset.filled = 'false';
    heartBtn.innerHTML = '<path d="M3.34255 7.7779C3.5687 7.23194 3.90017 6.73586 4.31804 6.31799C4.7359 5.90012 5.23198 5.56865 5.77795 5.3425C6.32392 5.11635 6.90909 4.99995 7.50004 4.99995C8.09099 4.99995 8.67616 5.11635 9.22213 5.3425C9.7681 5.56865 10.2642 5.90012 10.682 6.31799L12 7.63599L13.318 6.31799C14.162 5.47407 15.3066 4.99997 16.5 4.99997C17.6935 4.99997 18.8381 5.47407 19.682 6.31799C20.526 7.16191 21.0001 8.30651 21.0001 9.49999C21.0001 10.6935 20.526 11.8381 19.682 12.682L12 20.364L4.31804 12.682C3.90017 12.2641 3.5687 11.7681 3.34255 11.2221C3.1164 10.6761 3 10.0909 3 9.49999C3 8.90904 3.1164 8.32387 3.34255 7.7779Z" stroke="#7C6A0A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>';

    // Imagen del producto
    const imgContainer = document.createElement('div');
    imgContainer.className = 'img-container';
    const img = document.createElement('img');
    img.src = producto.image || '';
    img.alt = producto.name || '';
    imgContainer.appendChild(img);

    // Información de la card
    const cardInfo = document.createElement('div');
    cardInfo.className = 'card-info';
    const h3 = document.createElement('h3');
    h3.className = 'product-name';
    h3.textContent = producto.name || '';
    const desc = document.createElement('p');
    desc.textContent = producto.description || '';
    const price = document.createElement('p');
    price.className = 'product-price';
    const formattedPrice = producto.price ? producto.price.toFixed(2) : '0.00';
    price.textContent = `$${formattedPrice}`;

    // Botón de carrito (SVG)
    const addToCartWrap = document.createElement('div');
    addToCartWrap.className = 'add-to-cart';
    const cartBtn = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    cartBtn.setAttribute('width', '34');
    cartBtn.setAttribute('height', '34');
    cartBtn.setAttribute('viewBox', '0 0 24 24');
    cartBtn.classList.add('add-to-cart-icon');
    cartBtn.dataset.filled = 'false';
    cartBtn.innerHTML = '<path d="M3 3H5L5.4 5M5.4 5H21L17 13H7M5.4 5L7 13M7 13L4.707 15.293C4.077 15.923 4.523 17 5.414 17H17M17 17C16.4696 17 15.9609 17.2107 15.5858 17.5858C15.2107 17.9609 15 18.4696 15 19C15 19.5304 15.2107 20.0391 15.5858 20.4142C15.9609 20.7893 16.4696 21 17 21C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19C19 18.4696 18.7893 17.9609 18.4142 17.5858C18.0391 17.2107 17.5304 17 17 17ZM9 19C9 19.5304 8.78929 20.0391 8.41421 20.4142C8.03914 20.7893 7.53043 21 7 21C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19C5 18.4696 5.21071 17.9609 5.58579 17.5858C5.96086 17.2107 6.46957 17 7 17C7.53043 17 8.03914 17.2107 8.41421 17.5858C8.78929 17.9609 9 18.4696 9 19Z" stroke="#7C6A0A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/ fill="none">';

    addToCartWrap.appendChild(cartBtn);

    // Añadir toda la información a la card
    cardInfo.appendChild(h3);
    cardInfo.appendChild(desc);
    cardInfo.appendChild(price);
    cardInfo.appendChild(addToCartWrap);

    card.appendChild(heartBtn);
    card.appendChild(imgContainer);
    card.appendChild(cardInfo);

    frag.appendChild(card);
  });

  // Reemplazar contenido previo y agregar las nuevas cards
  cardSection.innerHTML = '';
  cardSection.appendChild(frag);
}

// Función para agregar un producto a la wishlist
function crearElementoWishlist(nombre, precio, imagenSrc) {
  if (wishlistMap.has(nombre)) return;
  wishlistMap.set(nombre, { nombre, precio, imagenSrc });

  const item = document.createElement('div');
  item.className = 'Wishlist-item';

  const imgC = document.createElement('div');
  imgC.className = 'img-container';
  const img = document.createElement('img');
  img.src = imagenSrc;
  img.alt = nombre;
  imgC.appendChild(img);

  const info = document.createElement('div');
  info.className = 'Wishlist-item-info';
  const h3 = document.createElement('h3');
  h3.textContent = nombre;
  const p = document.createElement('p');
  p.textContent = precio;
  const btn = document.createElement('button');
  btn.textContent = 'x';
  btn.addEventListener('click', () => eliminarElementoWishlist(nombre));

  info.appendChild(h3);
  info.appendChild(p);
  info.appendChild(btn);
  item.appendChild(imgC);
  item.appendChild(info);

  wishlistContain.appendChild(item);
}

// Función para eliminar un producto de la wishlist
function eliminarElementoWishlist(nombre) {
  wishlistMap.delete(nombre);

  // Eliminar elemento visualmente
  const items = wishlistContain.querySelectorAll('.Wishlist-item');
  items.forEach(it => {
    if (it.querySelector('.Wishlist-item-info h3').textContent === nombre) it.remove();
  });

  // Actualizar estado del corazón en la card
  const hearts = document.querySelectorAll('.card-svg');
  hearts.forEach(svg => {
    const pn = svg.parentElement.querySelector('.product-name')?.textContent;
    if (pn === nombre) {
      svg.dataset.filled = 'false';
      svg.innerHTML = svg.innerHTML.replace('fill="#7C6A0A"', 'fill="none"');
    }
  });
}

// Función para agregar un producto al carrito
function crearElementoCarrito(nombre, precio, imagenSrc) {
  if (cartMap.has(nombre)) return;
  cartMap.set(nombre, { nombre, precio, imagenSrc });

  const item = document.createElement('div');
  item.className = 'cart-item';

  const imgC = document.createElement('div');
  imgC.className = 'img-container';
  const img = document.createElement('img');
  img.src = imagenSrc;
  img.alt = nombre;
  imgC.appendChild(img);

  const info = document.createElement('div');
  info.className = 'cart-item-info';
  const h3 = document.createElement('h3');
  h3.textContent = nombre;
  const p = document.createElement('p');
  p.textContent = precio;
  const btn = document.createElement('button');
  btn.textContent = 'x';
  btn.addEventListener('click', () => eliminarElementoCarrito(nombre));

  info.appendChild(h3);
  info.appendChild(p);
  info.appendChild(btn);
  item.appendChild(imgC);
  item.appendChild(info);

  cartContainer.appendChild(item);
}

// Función para eliminar un producto del carrito
function eliminarElementoCarrito(nombre) {
  cartMap.delete(nombre);

  // Eliminar elemento visualmente
  const items = cartContainer.querySelectorAll('.cart-item');
  items.forEach(it => {
    if (it.querySelector('.cart-item-info h3').textContent === nombre) it.remove();
  });

  // Actualizar estado del ícono de carrito en la card
  const cartSvgs = document.querySelectorAll('.add-to-cart-icon');
  cartSvgs.forEach(svg => {
    const pn = svg.closest('.product-card').querySelector('.product-name')?.textContent;
    if (pn === nombre) {
      svg.dataset.filled = 'false';
      svg.innerHTML = svg.innerHTML.replace('fill="#7C6A0A"', 'fill="none"');
    }
  });
}

// Delegación de eventos para wishlist y carrito en cada card
if (cardSection) {
  cardSection.addEventListener('click', (e) => {
    // Manejo del corazón (wishlist)
    const heart = e.target.closest('.card-svg');
    if (heart) {
      const filled = heart.dataset.filled === 'true';
      const card = heart.closest('.product-card');
      const name = card.querySelector('.product-name').textContent;
      const price = card.querySelector('.product-price').textContent;
      const img = card.querySelector('.img-container img').src;

      if (!filled) {
        heart.dataset.filled = 'true';
        heart.innerHTML = heart.innerHTML.replace('fill="none"', 'fill="#7C6A0A"');
        crearElementoWishlist(name, price, img);
      } else {
        heart.dataset.filled = 'false';
        heart.innerHTML = heart.innerHTML.replace('fill="#7C6A0A"', 'fill="none"');
        eliminarElementoWishlist(name);
      }
      return;
    }

    // Manejo del ícono de carrito
    const cartBtn = e.target.closest('.add-to-cart-icon');
    if (cartBtn) {
      const filled = cartBtn.dataset.filled === 'true';
      const card = cartBtn.closest('.product-card');
      const name = card.querySelector('.product-name').textContent;
      const price = card.querySelector('.product-price').textContent;
      const img = card.querySelector('.img-container img').src;

      if (!filled) {
        cartBtn.dataset.filled = 'true';
        cartBtn.innerHTML = cartBtn.innerHTML.replace('fill="none"', 'fill="#7C6A0A"');
        crearElementoCarrito(name, price, img);
      } else {
        cartBtn.dataset.filled = 'false';
        cartBtn.innerHTML = cartBtn.innerHTML.replace('fill="#7C6A0A"', 'fill="none"');
        eliminarElementoCarrito(name);
      }
      return;
    }
  });
}

// Mostrar/ocultar wishlist al dar click en el ícono
if (wishlist) {
  wishlist.addEventListener('click', () => {
    const svgPath = wishlist.querySelector('svg path'); // Selecciona el <path> dentro del SVG
    const isFilled = svgPath.getAttribute('fill') === '#7C6A0A'; // Verifica si está relleno

    if (isFilled) {
        svgPath.setAttribute('fill', 'none'); // Cambia a no relleno
        wishlistContain.style.display = 'none'; // Oculta el contenedor
    } else {
        svgPath.setAttribute('fill', '#7C6A0A'); // Cambia a relleno
        wishlistContain.style.display = 'flex'; // Muestra el contenedor
    }
  });
}

// Mantener visible la wishlist mientras el ratón está encima
if (wishlistContain) {
  wishlistContain.addEventListener('mouseover', () => {
    wishlistContain.style.display = 'flex';
  });
  wishlistContain.addEventListener('mouseout', () => {
    wishlistContain.style.display = wishlistMap.size ? 'flex' : 'none';
  });
}

// Mostrar/ocultar carrito al dar click en el ícono
if (cartIcon) {
  cartIcon.addEventListener('click', () => {
    const svgPath = cartIcon.querySelector('svg path'); // Selecciona el <path> dentro del SVG
    const isFilled = svgPath.getAttribute('fill') === '#7C6A0A'; // Verifica si está relleno

    if (isFilled) {
        svgPath.setAttribute('fill', 'none'); // Cambia a no relleno
        cartContainer.style.display = 'none'; // Oculta el contenedor
    } else {
        svgPath.setAttribute('fill', '#7C6A0A'); // Cambia a relleno
        cartContainer.style.display = 'flex'; // Muestra el contenedor
    }
  });
}

// Inicialización: cargar productos
fetchProducts();