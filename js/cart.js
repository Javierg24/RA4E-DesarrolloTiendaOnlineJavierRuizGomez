document.addEventListener('DOMContentLoaded', function () {
    loadCartItems();  // Cargar los productos al inicio

    // Agregar eventos a los botones de aumentar y disminuir cantidad
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('cart__item-btn--add') || event.target.classList.contains('cart__item-btn--remove')) {
            handleQuantityChange(event);  // Llamar a la función para actualizar la cantidad
        }
    });

    // Función para actualizar el carrito en el localStorage
    function updateCart(cartItems) {
        localStorage.setItem('carrito', JSON.stringify(cartItems));
    }

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
        const product = cartItems.find(item => item.id == productId);                
        if (product) {
            if (event.target.classList.contains('cart__item-btn--add')) {
                product.cantidad += 1; // Aumentar cantidad
            } else if (event.target.classList.contains('cart__item-btn--remove')) {
                product.cantidad -= 1; // Reducir cantidad
                if (product.cantidad <= 0) {                    
                    const updatedCartItems = cartItems.filter(item => item.id != productId);
                    localStorage.setItem('carrito', JSON.stringify(updatedCartItems));
                } else {                    
                    localStorage.setItem('carrito', JSON.stringify(cartItems));
                }
            } else {                
                localStorage.setItem('carrito', JSON.stringify(cartItems));
            }            
            loadCartItems();
        }
    }
});
