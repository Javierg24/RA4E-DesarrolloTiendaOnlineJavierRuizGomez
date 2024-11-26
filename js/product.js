document.addEventListener('DOMContentLoaded', async function () {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id'); // Obtener el ID del producto desde la URL

    if (productId) {
        try {
            const data = await fetch('../json/tienda.json');
            const jsonData = await data.json();

            const producto = jsonData.productos.find(item => item.id === parseInt(productId));
            if (producto) {
                mostrarProducto(producto);
            } else {
                alert('Producto no encontrado.');
            }
        } catch (error) {
            console.error('Error al cargar los datos:', error);
        }
    } else {
        alert('No se proporcionó un ID de producto válido.');
    }
});

function mostrarProducto(producto) {
    const container = document.getElementById('product-detail-container');
    container.innerHTML = `
        <div class="product-detail__card">
            <img src="https://via.placeholder.com/300" class="product-detail__image" alt="${producto.nombre}">
            <div class="product-detail__info">
                <h2 class="product-detail__title">${producto.nombre}</h2>
                <p class="product-detail__price">$${producto.precio}</p>
                <p class="product-detail__description">${producto.descripcion}</p>
                <button class="product-add--cart"> Agregar al Carrito </button>
            </div>
        </div>
    `;
}


function agregarAlCarrito() {

    const agregarAlCarrito = document.getElementsByClassName('.product-add--cart');
    agregarAlCarrito.addEventListener('click', function () {
        
    })

}
