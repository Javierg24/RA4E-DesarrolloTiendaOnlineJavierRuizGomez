// Evento principal al cargar el DOM
document.addEventListener('DOMContentLoaded', function () {
    // Verificar si los datos están en localStorage
    const tiendaData = localStorage.getItem('infoTienda');

    if (tiendaData) {
        console.log('Cargando datos desde localStorage');
        const data = JSON.parse(tiendaData);

        // Cargar las categorías y productos destacados
        cargarCategorias(data.categorias);        
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
        li.addEventListener('click', () => mostrarProductos(categoria, li));
        categoriasList.appendChild(li);
    });
}
function mostrarProductos(categoria, categoriaElement) {
    const productosSection = document.querySelector('.products');
    const productosList = productosSection.querySelector('.products__list');
    productosList.innerHTML = ''; // Limpiar los productos previos

    // Mostrar la sección de productos
    productosSection.style.display = 'flex';

    // Mostrar los productos de la categoría seleccionada
    categoria.productos.forEach(producto => {
        const productoItem = document.createElement('div');
        productoItem.classList.add('products__item');
        productoItem.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <p>${producto.nombre}</p>
        `;
        productosList.appendChild(productoItem);
    });

    // Resaltar la categoría seleccionada
    document.querySelectorAll('.categories__item').forEach(item => item.classList.remove('selected'));
    categoriaElement.classList.add('selected');
}


function cerrarSesion() {
    localStorage.clear(); // Limpia todo el localStorage
    window.location.href = '../html/login.html';
}