// store/scripts/product-modal.js
class ProductModal {
    constructor() {
        this.modal = document.getElementById('productModal');
        this.init();
    }

    init() {
        document.querySelectorAll('.product-card img').forEach(img => {
            img.addEventListener('click', (e) => this.openModal(e));
        });

        document.querySelector('.close-modal').addEventListener('click', () => {
            this.closeModal();
        });

        document.querySelectorAll('.size-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectSize(e));
        });

        document.querySelector('.qty-btn.minus').addEventListener('click', () => this.updateQuantity('decrease'));
        document.querySelector('.qty-btn.plus').addEventListener('click', () => this.updateQuantity('increase'));
    }

    openModal(e) {
        const product = e.target.closest('.product-card');
        const data = {
            title: product.dataset.title,
            price: product.dataset.price,
            description: product.dataset.description,
            mainImage: product.querySelector('img').src,
            sku: product.dataset.sku,
            category: product.dataset.category,
            images: JSON.parse(product.dataset.images || '[]')
        };

        this.populateModal(data);
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    populateModal(data) {
        const modal = this.modal;
        modal.querySelector('.product-title').textContent = data.title;
        modal.querySelector('.product-price').textContent = data.price;
        modal.querySelector('.product-description p').textContent = data.description;
        modal.querySelector('#modalMainImage').src = data.mainImage;
        modal.querySelector('.sku span').textContent = data.sku;
        modal.querySelector('.category span').textContent = data.category;

        const gallery = modal.querySelector('.thumbnail-gallery');
        gallery.innerHTML = data.images.map(img => `<img src="${img}" class="thumbnail" alt="">`).join('');
    }

    closeModal() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    selectSize(e) {
        document.querySelectorAll('.size-btn').forEach(btn =>
            btn.classList.remove('selected'));
        e.target.classList.add('selected');
    }

    updateQuantity(action) {
        const input = document.querySelector('.qty-input');
        let value = parseInt(input.value);

        if (action === 'increase' && value < 10) {
            input.value = value + 1;
        } else if (action === 'decrease' && value > 1) {
            input.value = value - 1;
        }
    }
}

const closeButton = document.querySelector('.close-modal');
if (closeButton) {
    closeButton.addEventListener('click', this.close.bind(this));
}
