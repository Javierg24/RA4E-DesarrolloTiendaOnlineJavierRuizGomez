// Cargar las categorías desde el archivo JSON
document.addEventListener('DOMContentLoaded', async function () {
    try {
        // Fetch del archivo JSON (suponiendo que el archivo tienda.json está en la misma carpeta que este archivo JS)
        const response = await fetch('../json/tienda.json');

        // Comprobar si la respuesta es correcta
        if (!response.ok) {
            throw new Error('No se pudo cargar el archivo JSON');
        } else {
            // Parsear el contenido del JSON
            const data = await response.json();

            // Obtener el contenedor de las categorías
            const categoriasList = document.getElementById('categorias-list');

            // Limpiar el contenido previo
            categoriasList.innerHTML = '';

            // Recorrer las categorías y agregarlas al DOM
            data.categorias.forEach(categoria => {
                // Crear un nuevo elemento li para cada categoría
                const li = document.createElement('li');
                li.classList.add('list-group-item');
                li.textContent = categoria.nombre;

                // Añadir el nuevo li al ul
                categoriasList.appendChild(li);
            });
        }
    } catch (error) {
        console.error('Error al cargar las categorías:', error);
        alert('Hubo un problema al cargar las categorías.');
    }
});
