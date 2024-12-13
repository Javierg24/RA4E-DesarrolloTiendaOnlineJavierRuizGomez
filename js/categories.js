// Evento principal al cargar el DOM
document.addEventListener('DOMContentLoaded', function () {
    // Verificar si los datos están en localStorage
    const tiendaData = localStorage.getItem('infoTienda');

    if (tiendaData) {
        console.log('Cargando datos desde localStorage');
        const data = JSON.parse(tiendaData);

        // Cargar las categorías
        cargarCategorias(data.categorias);

        // Verificar si hay una categoría seleccionada previamente
        const categoriaSeleccionada = localStorage.getItem('categoriaSeleccionada');
        console.log(categoriaSeleccionada);
        if (categoriaSeleccionada) {
            const categoria = JSON.parse(categoriaSeleccionada);

            // Mostrar los productos automáticamente
            mostrarProductos(categoria);

            // Resaltar la categoría seleccionada
            categoriaElement.classList.add('selected');

            // Limpiar la selección para evitar persistencia innecesaria
            localStorage.removeItem('categoriaSeleccionada');
        }
    } else {
        console.error('No hay datos en localStorage.');
        alert('No se encontraron datos. Por favor, verifica el almacenamiento local.');
    }

    const botonCerrarSesion = document.getElementsByClassName('navbar__button')[0];
    botonCerrarSesion.addEventListener('click', cerrarSesion);
});

// Método para cargar las categorías en el DOM
function cargarCategorias(categorias) {
    const categoriasList = document.getElementById('categories__list');
    categoriasList.innerHTML = '';

    categorias.forEach((categoria, index) => {
        const li = document.createElement('li');
        li.classList.add('categories__item');
        li.textContent = categoria.nombre;

        // Añadir índice a la categoría
        li.dataset.index = index;

        li.addEventListener('click', () => {
            mostrarProductos({ ...categoria, index }, li);

            // Resaltar la categoría seleccionada
            document.querySelectorAll('.categories__item').forEach(item => item.classList.remove('selected'));
            li.classList.add('selected');
        });
        categoriasList.appendChild(li);
    });
}

// Método para mostrar productos basados en la categoría seleccionada
function mostrarProductos(categoria) {
    const tiendaData = localStorage.getItem('infoTienda');

    if (!tiendaData) {
        console.error('No se encontraron datos en localStorage.');
        alert('No hay datos disponibles. Por favor, verifica la configuración.');
        return;
    }

    // Parsear los datos del localStorage
    const data = JSON.parse(tiendaData);
    const productos = data.productos;

    // Filtrar productos por categoría seleccionada
    const productosFiltrados = productos.filter(producto => producto.id_categoria === categoria.id_categoria);

    // Obtener elementos del DOM
    const productosSection = document.querySelector('.products');
    const productosList = productosSection.querySelector('.products__list');
    productosList.innerHTML = ''; // Limpiar productos previos

    if (productosFiltrados.length > 0) {
        // Mostrar la sección de productos
        productosSection.style.display = 'flex';

        const productosTitle = document.querySelector('.products__title');
        productosTitle.textContent = `${categoria.nombre.toUpperCase()}`;

        // Crear elementos de productos
        productosFiltrados.forEach(producto => {
            const productoItem = document.createElement('div');
            productoItem.classList.add('products__item');
            productoItem.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}" class="products__image">
                <div class="products__info">
                    <h3 class="products__name">${producto.nombre}</h3>                    
                    <p class="products__price">${producto.precio.toFixed(2)} €</p>
                    <button class="product-card__button" data-id="${producto.id}">Ver producto</button>
                </div>
            `;
            productosList.appendChild(productoItem);
        });
    } else {
        productosSection.style.display = 'flex';
        productosList.innerHTML = '<p class="products__empty">No hay productos disponibles en esta categoría.</p>';
    }

    abrirProducto();
}

function abrirProducto() {
    const botones = document.querySelectorAll('.product-card__button');
    botones.forEach(boton => {
        boton.addEventListener('click', function () {
            const productId = boton.dataset.id;
            window.location.href = `../html/product.html?id=${productId}`;
        });
    });
}

function cerrarSesion() {
    localStorage.clear(); // Limpia todo el localStorage
    window.location.href = '../html/login.html';
}
