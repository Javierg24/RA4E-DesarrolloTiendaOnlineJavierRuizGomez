// Cargar las categorías desde el archivo JSON
// Método principal que se ejecuta cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', async function() {
    try {
        const data = await fetchData('../json/tienda.json');

        if (data) {
            // Llamar a los métodos para cargar las categorías y productos
            cargarCategorias(data.categorias);
            cargarProductosDestacados(data.productos);
        }
    } catch (error) {
        console.error('Error al cargar los datos:', error);
        alert('Hubo un problema al cargar los datos.');
    }
});

// Método para obtener los datos del archivo JSON
async function fetchData(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('No se pudo cargar el archivo JSON');
        }

        return await response.json(); // Devuelve los datos parseados si la respuesta es correcta
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        alert('Hubo un problema al obtener los datos.');
    }
}

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

    // Filtrar productos destacados
    const productosDestacados = productos.filter(producto => producto.destacado);

    productosDestacados.forEach(producto => {
        const card = document.createElement('div');
        card.classList.add('product-card'); // Clase de la tarjeta

        // Crear el contenido de la tarjeta
        card.innerHTML = `
            <img src="https://via.placeholder.com/100" class="product-card__image" alt="${producto.nombre}">
            <div class="product-card__info">
                <h5 class="product-card__title">${producto.nombre}</h5>
                <p class="product-card__price">$${producto.precio}</p>
                <button class="product-card__button">Añadir al carrito</button>
            </div>
        `;

        featuredProductsGrid.appendChild(card);
    });
}