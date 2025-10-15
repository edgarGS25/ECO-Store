const wishlist = document.querySelector('.wishlist');
const wishlistContain = document.querySelector('.wishlist-full-contain');



// cargar wishlist desde localStorage al iniciar
function cargarWishList() {
  const wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
  wishlistItems.forEach(item => {
      const itemContainer = document.createElement('div');
      itemContainer.className = 'Wishlist-item';

      const imgC = document.createElement('a');
      imgC.href = "product.html" || '#';
      imgC.className = 'img-container';
      imgC.addEventListener('click', () => {
        productosCuidadoSalud.forEach(producto => {
          if (producto.name === nombre) {
            guardarProductoSeleccionado(producto);
          }
      });
      });

      const img = document.createElement('img');
      img.src = item.imagenSrc;
      img.alt = item.nombre;
      imgC.appendChild(img);

      const info = document.createElement('div');
      info.className = 'Wishlist-item-info';
      const h3 = document.createElement('h3');
      h3.textContent = item.nombre;
      const p = document.createElement('p');
      p.textContent = `$${item.precio}`;
      
      const btnDelete = document.createElement('button');
      btnDelete.className = "delete-item"
      btnDelete.textContent = 'x';
      btnDelete.addEventListener('click', () => eliminarElementoWishlist(item.nombre));

      info.appendChild(h3);
      info.appendChild(p);
      
      info.appendChild(btnDelete);
      itemContainer.appendChild(imgC);
      itemContainer.appendChild(info);

     wishlistContain.appendChild(itemContainer);
  });
}

// Función para eliminar un producto de la wishlist
function eliminarElementoWishlist(nombre) {

  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  const nuevaWishlist = wishlist.filter(item => item.nombre !== nombre);
  localStorage.setItem('wishlist', JSON.stringify(nuevaWishlist));

  // Eliminar elemento visualmente
  const items = wishlistContain.querySelectorAll('.Wishlist-item');
  items.forEach(it => {
    if (it.querySelector('.Wishlist-item-info h3').textContent === nombre) it.remove();
  });
}

cargarWishList();