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
});

// Método para cargar las categorías en el DOM
function cargarCategorias(categorias) {
    const categoriasList = document.getElementById('categories__list');
    categoriasList.innerHTML = ''; // Limpiar el contenido previo
    categorias.forEach(categoria => {
        const li = document.createElement('li');
        li.classList.add('categories__link');
        li.textContent = categoria.nombre;
        categoriasList.appendChild(li);
    });
}