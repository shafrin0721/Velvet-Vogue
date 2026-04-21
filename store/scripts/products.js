document.addEventListener('DOMContentLoaded', function () {
    // Initialize elements
    const filterButtons = document.querySelectorAll('.filter-btn');
    const products = document.querySelectorAll('.product-card');
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.dataset.category;

            products.forEach(product => {
                if (category === 'all' || product.dataset.category === category) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    });

    // Search functionality
    function searchProducts(searchTerm) {
        products.forEach(product => {
            const title = product.querySelector('h3')?.textContent.toLowerCase() || '';
            const description = product.querySelector('img')?.dataset.description.toLowerCase() || '';

            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }

    if (searchButton && searchInput) {
        searchButton.addEventListener('click', () => {
            const searchTerm = searchInput.value.toLowerCase();
            searchProducts(searchTerm);
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const searchTerm = searchInput.value.toLowerCase();
                searchProducts(searchTerm);
            }
        });
    }

    // Quick view functionality
    const quickViewButtons = document.querySelectorAll('.quick-view');
    const modal = document.getElementById('quickViewModal');
    const closeModal = document.querySelector('.close-modal');

    quickViewButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            const product = e.target.closest('.product-card');
            const img = product.querySelector('img');

            if (modal && img) {
                document.getElementById('modalImage').src = img.src;
                document.getElementById('modalTitle').textContent = img.dataset.name;
                document.getElementById('modalPrice').textContent = img.dataset.price;
                document.getElementById('modalDescription').textContent = img.dataset.description;

                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    if (closeModal && modal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Size selection
    const sizeButtons = document.querySelectorAll('.size-btn');
    sizeButtons.forEach(button => {
        button.addEventListener('click', () => {
            sizeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // Quantity controls
    const quantityInput = document.querySelector('.quantity-controls input');
    const minusBtn = document.querySelector('.qty-btn.minus');
    const plusBtn = document.querySelector('.qty-btn.plus');

    if (quantityInput && minusBtn && plusBtn) {
        minusBtn.addEventListener('click', () => {
            const currentValue = parseInt(quantityInput.value) || 1;
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });

        plusBtn.addEventListener('click', () => {
            const currentValue = parseInt(quantityInput.value) || 1;
            if (currentValue < 10) {
                quantityInput.value = currentValue + 1;
            }
        });
    }

    // Cart functionality
    const cartBtn = document.getElementById('cartBtn');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartCount = document.querySelector('.cart-count');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCart() {
        if (cartCount) {
            cartCount.textContent = cart.length;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const product = e.target.closest('.product-card');
            const img = product.querySelector('img');

            const productData = {
                id: Date.now(),
                name: img.dataset.name,
                price: img.dataset.price,
                image: img.src,
                quantity: 1
            };
            cart.push(productData);
            updateCart();
        });
    });

    // Wishlist functionality
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    document.querySelectorAll('.add-to-wishlist').forEach(button => {
        button.addEventListener('click', (e) => {
            const product = e.target.closest('.product-card');
            const img = product.querySelector('img');

            const productData = {
                id: Date.now(),
                name: img.dataset.name,
                price: img.dataset.price,
                image: img.src
            };

            const exists = wishlist.some(item => item.name === productData.name);
            if (!exists) {
                wishlist.push(productData);
                localStorage.setItem('wishlist', JSON.stringify(wishlist));
                button.innerHTML = '<i class="fas fa-heart"></i>';
            }
        });
    });

    // Initial cart count on load
    updateCart();
});
