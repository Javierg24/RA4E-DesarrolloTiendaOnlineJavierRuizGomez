document.addEventListener('DOMContentLoaded', function () {

    const botonFinalizarCompra = document.getElementsByClassName('cart__checkout-btn')[0]; // Selecciona el primer elemento

    botonFinalizarCompra.addEventListener('click', function () {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        validarCarrito(carrito)
            .then(data => {
                if (data.status === 'success') {
                    alert(`Total validado: $${data.total}`);
                } else if (data.status === 'error') {
                    alert(`Errores detectados:\n${data.errores.join('\n')}`);
                }
            })
            .catch(error => {
                alert('Ocurrió un error al procesar el carrito. Por favor, inténtalo nuevamente.');
            });
    });

    loadCartItems();  // Cargar los productos al inicio
    mostrarProductosVistos();  // Mostrar productos recientemente vistos

    // Agregar eventos a los botones de aumentar y disminuir cantidad
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('cart__item-btn--add') || event.target.classList.contains('cart__item-btn--remove')) {
            handleQuantityChange(event);  // Llamar a la función para actualizar la cantidad
        }
    });

    const botonCerrarSesion = document.getElementsByClassName('navbar__button')[0];
    botonCerrarSesion.addEventListener('click', cerrarSesion);

});

// Función para cargar los productos del carrito
function loadCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('carrito')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    let total = 0;

    // Limpiar los productos actuales
    cartItemsContainer.innerHTML = '';

    // Recorrer los productos y mostrarlos
    cartItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart__item');

        itemElement.innerHTML = `                    
                <div class="cart__item-info">
                    <h2 class="cart__item-title">${item.nombre}</h2>
                    <p class="cart__item-price">$${item.precio}</p>
                </div>
                <div class="cart__item-controls">
                    <button class="cart__item-btn cart__item-btn--remove" data-id="${item.id}">-</button>
                    <span class="cart__item-quantity">${item.cantidad}</span>
                    <button class="cart__item-btn cart__item-btn--add" data-id="${item.id}">+</button>
                </div>
            `;

        cartItemsContainer.appendChild(itemElement);

        // Sumar el total
        total += item.precio * item.cantidad;
    });

    // Mostrar el total actualizado
    cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
}

function handleQuantityChange(event) {
    const cartItems = JSON.parse(localStorage.getItem('carrito')) || [];
    const productId = event.target.getAttribute('data-id');
    const productIndex = cartItems.findIndex(item => item.id == productId); // Obtener el índice del producto

    if (productIndex !== -1) {
        if (event.target.classList.contains('cart__item-btn--add')) {
            // Aumentar cantidad
            cartItems[productIndex].cantidad += 1;
        } else if (event.target.classList.contains('cart__item-btn--remove')) {
            // Reducir cantidad
            cartItems[productIndex].cantidad -= 1;
            if (cartItems[productIndex].cantidad <= 0) {
                // Eliminar el producto si la cantidad es 0 o menos
                cartItems.splice(productIndex, 1);
            }
        }
    }

    // Actualizar el localStorage con el carrito modificado
    localStorage.setItem('carrito', JSON.stringify(cartItems));

    // Recargar los productos del carrito en la página
    loadCartItems();
}

/**
 * Valida el carrito enviándolo al servidor.
 * @param {Array} carrito - Array de objetos que representan los productos en el carrito.
 * @returns {Promise} - Resolución con el estado y datos de la validación.
 */
function validarCarrito(carrito) {
    return fetch('../php/carrito.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(carrito),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error al validar el carrito:', error);
            throw error;
        });
}

// Función para mostrar los productos vistos recientemente
function mostrarProductosVistos() {
    const productosVistos = JSON.parse(localStorage.getItem('productosVistos')) || [];
    const container = document.getElementsByClassName('products__recently--viewed')[0];
    if (productosVistos.length > 0) {
        productosVistos.slice(-4).reverse().forEach(producto => {
            const productoHTML = `
                <div class="recent-product">
                        <img src="${producto.imagen}" alt="${producto.nombre}" />
                        <p>${producto.nombre}</p>
                        <p>${producto.precio}</p>
                </div>
            `;
            container.innerHTML += productoHTML;
        });
    } else {
        container.innerHTML = '<p>No has visto ningún producto recientemente.</p>';
    }
}

function cerrarSesion() {
    localStorage.clear(); // Limpia todo el localStorage
    window.location.href = '../html/login.html';
}
