<div id="recently-viewed-container">
    <h3>Productos Recientemente Vistos</h3>
    <div class="recently-viewed-products"></div>
</div>

<script>
    (function() {
        const container = document.querySelector('.recently-viewed-products');
        const viewedProducts = JSON.parse(localStorage.getItem('recentlyViewed')) || [];

        if (viewedProducts.length > 0) {
            // Muestra los últimos 5 productos en orden inverso
            viewedProducts.slice(-5).reverse().forEach(product => {
                const productHTML = `
                    <div class="recent-product">
                        <a href="${product.link}">
                            <img src="${product.image}" alt="${product.title}" />
                            <p>${product.title}</p>
                            <p>${product.price}</p>
                        </a>
                    </div>`;
                container.innerHTML += productHTML;
            });
        } else {
            container.innerHTML = '<p>No has visto ningún producto recientemente.</p>';
        }
    })();
</script>

<style>
    .recently-viewed-products {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }
    .recent-product {
        text-align: center;
        max-width: 150px;
    }
    .recent-product img {
        max-width: 100%;
        height: auto;
    }
</style>
