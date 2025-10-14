

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
    const res = await fetch('data/data.json');
    const data = await res.json();
    productosCuidadoSalud = data.productsHealth || [];
    crearCards();
    cargarWishList();
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
    const priceNumber = document.createElement("span")
    priceNumber.className = "price-number"
    const formattedPrice = producto.price ? producto.price.toFixed(2) : '0.00';
    price.textContent = `$`;
    priceNumber.textContent = formattedPrice
    price.appendChild(priceNumber)

    // Botón de carrito (SVG)
    

    // Añadir toda la información a la card
    cardInfo.appendChild(h3);
    cardInfo.appendChild(desc);
    cardInfo.appendChild(price);
    

    card.appendChild(heartBtn);
    card.appendChild(imgContainer);
    card.appendChild(cardInfo);

    frag.appendChild(card);
  });

  // Reemplazar contenido previo y agregar las nuevas cards
  cardSection.innerHTML = '';
  cardSection.appendChild(frag);
}

// cargar wishlist desde localStorage al iniciar
function cargarWishList() {
  const wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
  wishlistItems.forEach(item => {
    const card = Array.from(document.querySelectorAll('.product-card')).find(card => {
      const name = card.querySelector('.product-name').textContent;
      return name === item.nombre;
    });
    if (card) {
      const heart = card.querySelector('.card-svg');
      heart.dataset.filled = 'true';
      heart.innerHTML = heart.innerHTML.replace('fill="none"', 'fill="#7C6A0A"');
      crearElementoWishlist(item.nombre, item.precio, item.imagenSrc);
    }
  });
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
  p.textContent = `$${precio}`;
  const addToCart = document.createElement("button")
  addToCart.className = "add-to-cart"
  addToCart.textContent = "Agregar al carrito"
  addToCart.addEventListener('click', () => {
    crearElementoCarrito(nombre, Number(precio), imagenSrc)
    addToCart.style.display = "none"
  })
  const btnDelete = document.createElement('button');
  btnDelete.className = "delete-item"
  btnDelete.textContent = 'x';
  btnDelete.addEventListener('click', () => eliminarElementoWishlist(nombre));

  info.appendChild(h3);
  info.appendChild(p);
  info.appendChild(addToCart);
  info.appendChild(btnDelete);
  item.appendChild(imgC);
  item.appendChild(info);

  wishlistContain.appendChild(item);
}

// Función para agregar un producto al Local Storage
function agregarAWishlistLocalStorage(nombre, precio, imagenSrc) {
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  const producto = { nombre, precio, imagenSrc };
  wishlist.push(producto);
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

// Función para eliminar un producto de la wishlist
function eliminarElementoWishlist(nombre) {
  wishlistMap.delete(nombre);

  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  const nuevaWishlist = wishlist.filter(item => item.nombre !== nombre);
  localStorage.setItem('wishlist', JSON.stringify(nuevaWishlist));

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
  cartMap.set(nombre, { nombre, precio, imagenSrc, cantidad: 1 });

   // Guardar en localStorage
  const cartItems = Array.from(cartMap.values());
  localStorage.setItem('cart', JSON.stringify(cartItems));


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

  info.appendChild(h3);
  info.appendChild(p);
  info.appendChild(btn);
  item.appendChild(imgC);
  item.appendChild(info);

  // cartContainer.appendChild(item);
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
      const price = card.querySelector('.price-number').textContent;
      const img = card.querySelector('.img-container img').src;

      if (!filled) {
        heart.dataset.filled = 'true';
        heart.innerHTML = heart.innerHTML.replace('fill="none"', 'fill="#7C6A0A"');
        crearElementoWishlist(name, price, img);
        agregarAWishlistLocalStorage(name, price, img);
      } else {
        heart.dataset.filled = 'false';
        heart.innerHTML = heart.innerHTML.replace('fill="#7C6A0A"', 'fill="none"');
        eliminarElementoWishlist(name);
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