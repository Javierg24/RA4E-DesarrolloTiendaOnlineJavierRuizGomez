// Evento principal al cargar el DOM
document.addEventListener('DOMContentLoaded', function () {
    // Verificar si los datos están en localStorage
    const tiendaData = localStorage.getItem('infoTienda');

    if (tiendaData) {
        console.log('Cargando datos desde localStorage');
        const data = JSON.parse(tiendaData);

        // Cargar las categorías y productos destacados
        cargarCategorias(data.categorias);
        cargarProductosDestacados(data.productos);
    } else {
        console.error('No hay datos en localStorage.');
        alert('No se encontraron datos. Por favor, verifica el almacenamiento local.');
    }
});

// Método para cargar las categorías en el DOM
function cargarCategorias(categorias) {
    const categoriasList = document.getElementById('categorias-list');
    categoriasList.innerHTML = ''; // Limpiar el contenido previo

    categorias.forEach(categoria => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.textContent = categoria.nombre;
        categoriasList.appendChild(li);
    });
}

// Método para cargar los productos destacados en el DOM
function cargarProductosDestacados(productos) {
    const featuredProductsGrid = document.getElementById('featured-products-grid');
    featuredProductsGrid.innerHTML = ''; // Limpiar el contenido previo

    const productosDestacados = productos.filter(producto => producto.destacado);

    productosDestacados.forEach(producto => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.innerHTML = `
            <img src="https://via.placeholder.com/100" class="product-card__image" alt="${producto.nombre}">
            <div class="product-card__info">
                <h5 class="product-card__title">${producto.nombre}</h5>
                <p class="product-card__price">$${producto.precio}</p>
                <button class="product-card__button" data-id="${producto.id}">Ver producto</button>
            </div>
        `;

        featuredProductsGrid.appendChild(card);
    });

    abrirProducto();
}

// Método para manejar el evento de clic en los botones de productos
function abrirProducto() {
    const botones = document.querySelectorAll('.product-card__button');
    botones.forEach(boton => {
        boton.addEventListener('click', function () {
            const productId = boton.dataset.id;
            window.location.href = `../html/product.html?id=${productId}`;
        });
    });
}
