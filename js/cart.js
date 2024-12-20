document.addEventListener('DOMContentLoaded', function () {

    const token = localStorage.getItem('token');
    if (!token){
        alert('No estas logueado');
        cerrarSesion();
    }
    const botonFinalizarCompra = document.getElementsByClassName('cart__checkout-btn')[0];

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

    loadCartItems(); // Cargar los productos al inicio
    mostrarProductosVistos(); // Mostrar productos recientemente vistos

    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('cart__item-btn--add') || event.target.classList.contains('cart__item-btn--remove')) {
            handleQuantityChange(event); // Llamar a la función para actualizar la cantidad
        }
    });
    actualizarCantidadCarrito();

    const botonCerrarSesion = document.getElementsByClassName('navbar__button')[0];
    botonCerrarSesion.addEventListener('click', cerrarSesion);

});

// Función para cargar los productos del carrito
function loadCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('carrito')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    let total = 0;

    cartItemsContainer.innerHTML = '';

    cartItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart__item');

        itemElement.innerHTML = `                    
                <div class="cart__item-info">
                    <img src="${item.imagen}" alt="${item.nombre}" class="cart__item-image">
                        <div class="cart__item-description">
                        <h2 class="cart__item-title">${item.nombre}</h2>
                        <p class="cart__item-price">$${item.precio}</p>
                    </div>
                </div>
                <div class="cart__item-controls">
                    <button class="cart__item-btn cart__item-btn--remove" data-id="${item.id}">-</button>
                    <span class="cart__item-quantity">${item.cantidad}</span>
                    <button class="cart__item-btn cart__item-btn--add" data-id="${item.id}">+</button>
                </div>
            `;

        cartItemsContainer.appendChild(itemElement);
        total += item.precio * item.cantidad;
    });

    cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
}

function handleQuantityChange(event) {
    const cartItems = JSON.parse(localStorage.getItem('carrito')) || [];
    const productId = event.target.getAttribute('data-id');
    const productIndex = cartItems.findIndex(item => item.id == productId);

    if (productIndex !== -1) {
        if (event.target.classList.contains('cart__item-btn--add')) {
            cartItems[productIndex].cantidad += 1;
        } else if (event.target.classList.contains('cart__item-btn--remove')) {
            cartItems[productIndex].cantidad -= 1;
            if (cartItems[productIndex].cantidad <= 0) {
                cartItems.splice(productIndex, 1);
            }
        }
    }

    localStorage.setItem('carrito', JSON.stringify(cartItems));
    loadCartItems();
}

// Función para validar el carrito
function validarCarrito(carrito) {
    return fetch('../php/procesar.php', {
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
    const container = document.getElementsByClassName('products__recently--viewed--container')[0];
    if (productosVistos.length > 0) {
        productosVistos.slice(-4).reverse().forEach(producto => {
            const productoHTML = `
                <div class="recent-product">
                    <img src="${producto.imagen}" alt="${producto.nombre}" />
                    <p>${producto.nombre}</p>
                    <p>${producto.precio}</p>
                    <button class="recent-product__button" data-id="${producto.id}">Ver producto</button>
                </div>
            `;
            container.innerHTML += productoHTML;
        });
    } else {
        container.innerHTML = '<p>No has visto ningún producto recientemente.</p>';
    }

    abrirProducto();
}

function abrirProducto() {
    const botones = document.querySelectorAll('.recent-product__button');
    botones.forEach(boton => {
        boton.addEventListener('click', function () {
            const productId = boton.dataset.id;
            window.location.href = `../html/product.html?id=${productId}`;
        });
    });
}

function actualizarCantidadCarrito() {
    const cartAmountElement = document.getElementById('cart__amount');
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalCantidad = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    cartAmountElement.textContent = totalCantidad;
}

function cerrarSesion() {
    localStorage.clear();
    window.location.href = '../html/login.html';
}
