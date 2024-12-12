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
                agregarAProductosVistos(producto); // Agregar a productos recientemente vistos
            } else {
                mostrarError('Producto no encontrado.');
            }
        } else {
            mostrarError('No hay datos en localStorage.');
        }
    } else {
        mostrarError('No se proporcionó un ID de producto válido.');
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
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];        
        const productoEnCarrito = carrito.find(item => item.id === producto.id);
        if (productoEnCarrito) {            
            productoEnCarrito.cantidad += 1;
        } else {            
            const productoConCantidad = { ...producto, cantidad: 1 };
            carrito.push(productoConCantidad);
        }        
        localStorage.setItem('carrito', JSON.stringify(carrito));

        alert(productoEnCarrito ? 'Cantidad del producto incrementada.' : 'Producto agregado al carrito.');
    });
}

// Función para agregar el producto a la lista de "productos recientemente vistos"
function agregarAProductosVistos(producto) {
    const productosVistosKey = 'productosVistos';
    let productosVistos = JSON.parse(localStorage.getItem(productosVistosKey)) || [];
    const productoYaVisto = productosVistos.find(item => item.id === producto.id);
    if (!productoYaVisto) {
        productosVistos.push(producto); 
        if (productosVistos.length > 4) {
            productosVistos = productosVistos.slice(-4);
        }
        localStorage.setItem(productosVistosKey, JSON.stringify(productosVistos));
    }
}

function cerrarSesion() {
    localStorage.clear(); // Limpia todo el localStorage
    window.location.href = '../html/login.html';
}

// Función para mostrar mensajes de error de manera más amigable
function mostrarError(mensaje) {
    const container = document.getElementById('product-detail-container');
    container.innerHTML = `
        <p class="error-message">${mensaje}</p>
    `;
}
