document.addEventListener('DOMContentLoaded', async function () {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id'); // Obtener el ID del producto desde la URL

    if (productId) {
        const tiendaData = localStorage.getItem('infoTienda');
        if (tiendaData) {
            console.log('Cargando datos desde localStorage');
            const data = JSON.parse(tiendaData);

            const producto = data.productos.find(item => item.id === parseInt(productId));
            if (producto) {
                mostrarProducto(producto);
                agregarAlCarrito(producto);
            } else {
                alert('Producto no encontrado.');
            }
        } else {
            console.error('No hay datos en localStorage.');
            alert('No se encontraron datos. Por favor, verifica el almacenamiento local.');
        }
    } else {
        alert('No se proporcionó un ID de producto válido.');
    }

    const botonCerrarSesion = document.getElementsByClassName('navbar__button')[0];
    botonCerrarSesion.addEventListener('click', cerrarSesion);   
});

function mostrarProducto(producto) {
    const container = document.getElementById('product-detail-container');
    container.innerHTML = `
        <div class="product-detail__card">
            <img src="${producto.imagen}" class="product-detail__image" alt="${producto.nombre}">
            <div class="product-detail__info">
                <h2 class="product-detail__title">${producto.nombre}</h2>
                <p class="product-detail__price">$${producto.precio}</p>
                <p class="product-detail__description">${producto.descripcion}</p>
                <button class="product-add__cart">Agregar al Carrito</button>
            </div>
        </div>
    `;
}

function agregarAlCarrito(producto) {
    const botonAgregar = document.querySelector('.product-add__cart');

    botonAgregar.addEventListener('click', function () {
        // Obtener el carrito actual del localStorage o inicializarlo vacío
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

        // Verificar si el producto ya está en el carrito
        const productoEnCarrito = carrito.find(item => item.id === producto.id);

        if (productoEnCarrito) {
            // Si el producto ya está en el carrito, incrementar la cantidad
            productoEnCarrito.cantidad += 1;

            // Guardar el carrito actualizado en el localStorage
            localStorage.setItem('carrito', JSON.stringify(carrito));

            alert('Cantidad del producto incrementada.');
        } else {
            // Si el producto no está en el carrito, agregarlo con cantidad 1
            const productoConCantidad = { ...producto, cantidad: 1 };

            // Agregar el producto con cantidad al carrito
            carrito.push(productoConCantidad);

            // Guardar el carrito actualizado en el localStorage
            localStorage.setItem('carrito', JSON.stringify(carrito));

            alert('Producto agregado al carrito.');
        }
    });
}

function cerrarSesion() {
    localStorage.clear(); // Limpia todo el localStorage
    window.location.href = '../html/login.html';
}
