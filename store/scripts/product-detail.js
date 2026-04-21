// store/scripts/product-detail.js
document.addEventListener('DOMContentLoaded', function () {
    const minusBtn = document.querySelector('.minus');
    const plusBtn = document.querySelector('.plus');
    const quantityInput = document.querySelector('.quantity-input');
    const addToCartBtn = document.querySelector('.add-to-cart-btn');

    if (minusBtn && plusBtn && quantityInput) {
        minusBtn.addEventListener('click', () => {
            let value = parseInt(quantityInput.value);
            if (value > 1) quantityInput.value = value - 1;
        });

        plusBtn.addEventListener('click', () => {
            let value = parseInt(quantityInput.value);
            quantityInput.value = value + 1;
        });
    }

    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            const quantity = parseInt(quantityInput.value);
            alert(`Added ${quantity} item(s) to cart`);
        });
    }
});
