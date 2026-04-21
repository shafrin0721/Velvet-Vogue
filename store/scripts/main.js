document.addEventListener('DOMContentLoaded', () => {
    initProductCards();
    initTestimonialSlider();
    initCartPreview();
    initNewsletterForm();
    cart.loadCart();
    initNavigationToggle();
    initSmoothScroll();
    initCartCountUI();
    loadTestimonials();
});

// ------------------ Product Cards ------------------ //
function initProductCards() {
    document.querySelectorAll('.quick-view').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.closest('.product-card').dataset.productId;
            openQuickView(productId);
        });
    });

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.closest('.product-card').dataset.productId;
            addToCart(productId);
        });
    });
}

// ------------------ Testimonial Slider ------------------ //
function initTestimonialSlider() {
    const slider = document.querySelector('.testimonial-slider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.testimonial-slide');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }

    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 5000);
}

// ------------------ Cart Preview ------------------ //
function initCartPreview() {
    const cartButton = document.querySelector('.cart-icon');
    const cartPreview = document.querySelector('#cartPreview');
    if (cartButton && cartPreview) {
        cartButton.addEventListener('click', () => {
            cartPreview.classList.toggle('open');
        });
    }
}

// ------------------ Newsletter Form ------------------ //
function initNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;
        try {
            await subscribeToNewsletter(email);
            showSuccessMessage('Thank you for subscribing!');
        } catch {
            showErrorMessage('Subscription failed. Try again.');
        }
    });
}

// ------------------ Navigation Toggle ------------------ //
function initNavigationToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
}

// ------------------ Smooth Scroll ------------------ //
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ------------------ Cart Count UI ------------------ //
function initCartCountUI() {
    let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
    const cartCountElement = document.querySelector('.cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    function updateCartCount() {
        if (cartCountElement) {
            cartCountElement.textContent = cartCount;
        }
    }

    updateCartCount();

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            cartCount++;
            localStorage.setItem('cartCount', cartCount);
            updateCartCount();
            button.classList.add('added');
            setTimeout(() => button.classList.remove('added'), 1000);
        });
    });
}

// ------------------ Product Filter ------------------ //
function filterProducts(category) {
    document.querySelectorAll('.product-item').forEach(product => {
        product.style.display = (category === 'all' || product.dataset.category === category) ? 'block' : 'none';
    });
}

// ------------------ Product Search ------------------ //
function searchProducts() {
    const searchTerm = document.querySelector('.search-input').value.toLowerCase();
    document.querySelectorAll('.product-item').forEach(product => {
        const title = product.querySelector('.product-title').textContent.toLowerCase();
        const description = product.querySelector('.product-description').textContent.toLowerCase();
        product.style.display = (title.includes(searchTerm) || description.includes(searchTerm)) ? 'block' : 'none';
    });
}

// ------------------ Cart Object ------------------ //
const cart = {
    items: [],

    addItem(product) {
        this.items.push(product);
        this.saveCart();
        this.updateCartUI();
    },

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartUI();
    },

    saveCart() {
        localStorage.setItem('cartItems', JSON.stringify(this.items));
    },

    loadCart() {
        const savedItems = localStorage.getItem('cartItems');
        if (savedItems) {
            this.items = JSON.parse(savedItems);
            this.updateCartUI();
        }
    },

    updateCartUI() {
        const cartContainer = document.querySelector('.cart-items');
        const totalElement = document.querySelector('.cart-total');
        if (!cartContainer) return;

        cartContainer.innerHTML = '';
        let total = 0;

        this.items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>$${item.price}</p>
                    <button onclick="cart.removeItem(${item.id})">Remove</button>
                </div>
            `;
            cartContainer.appendChild(itemElement);
            total += item.price;
        });

        if (totalElement) {
            totalElement.textContent = `Total: $${total.toFixed(2)}`;
        }
    }
};

// ------------------ Testimonials ------------------ //
function deleteTestimonial(id) {
    fetch(`store/delete_testimonial.php?id=${id}`, { method: 'DELETE' })
        .then(res => res.json())
        .then(data => {
            alert(data.message || 'Deleted');
            loadTestimonials();
        })
        .catch(error => {
            console.error('Delete error:', error);
            alert('Failed to delete testimonial.');
        });
}

function editTestimonial(id, name, rating, testimonial) {
    const form = document.getElementById('testimonialForm');
    form.dataset.editId = id;
    form.querySelector('#name').value = name;
    form.querySelector('#testimonial').value = testimonial;
    const ratingInput = form.querySelector(`input[name="rating"][value="${rating}"]`);
    if (ratingInput) ratingInput.checked = true;
}

function updateTestimonial(id, name, rating, testimonial) {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', name);
    formData.append('rating', rating);
    formData.append('testimonial', testimonial);

    fetch('store/update_testimonial.php', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message || 'Updated');
        loadTestimonials();
        document.getElementById('testimonialForm').reset();
    })
    .catch(error => {
        console.error('Update error:', error);
        alert('Failed to update testimonial.');
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('testimonialForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const rating = parseInt(document.querySelector('input[name="rating"]:checked')?.value, 10);
        const testimonial = document.getElementById('testimonial').value.trim();

        if (!rating) {
            alert('Please select a rating.');
            return;
        }

        const editId = form.dataset.editId;
        if (editId) {
            updateTestimonial(editId, name, rating, testimonial);
            delete form.dataset.editId;
        } else {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('rating', rating);
            formData.append('testimonial', testimonial);

            fetch('./store/add_testimonial.php', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                alert(data.message || 'Thank you for your testimonial!');
                form.reset();
                loadTestimonials();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to submit testimonial.');
            });
        }
    });
});

let currentIndex = 0;
let testimonials = [];

function loadTestimonials() {
    fetch('store/get_testimonials.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            testimonials = data;
            displayTestimonial(currentIndex);
        })
        .catch(error => {
            console.error('Load testimonials error:', error);
        });
}

function displayTestimonial(index) {
    const display = document.getElementById('testimonialDisplay');
    if (!display || !testimonials.length) return;

    const t = testimonials[index];
    display.innerHTML = `
        <h3>${t.name}</h3>
        <p>${t.testimonial}</p>
        <p>Rating: ${'⭐'.repeat(t.rating)}</p>
        <button onclick="editTestimonial(${t.id}, '${t.name}', ${t.rating}, \`${t.testimonial}\`)">Edit</button>
        <button onclick="deleteTestimonial(${t.id})">Delete</button>
    `;
}

document.addEventListener('DOMContentLoaded', function() {
    const someElement = document.getElementById('someElementId'); // Replace with your actual element ID
    if (someElement) {
        someElement.addEventListener('click', function() {
            // Your event handling code
        });
    } else {
        console.error('Element not found: someElementId'); // Debugging line
    }
});

