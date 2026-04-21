class AdvancedAvailabilityChecker {
    constructor() {
        this.stores = [];
        this.userLocation = null;
        this.initializeGeolocation();
    }

    async initializeGeolocation() {
        try {
            const position = await this.getCurrentPosition();
            this.userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            this.findNearbyStores();
        } catch (error) {
            console.error('Geolocation error:', error);
        }
    }

    async findNearbyStores() {
        try {
            const response = await fetch(`/api/stores/nearby?lat=${this.userLocation.lat}&lng=${this.userLocation.lng}`);
            this.stores = await response.json();
            this.displayStores();
        } catch (error) {
            console.error('Store lookup error:', error);
        }
    }

    displayStores() {
        const storesContainer = document.querySelector('.store-results');
        storesContainer.innerHTML = this.stores.map(store => `
            <div class="store-item">
                <h4>${store.name}</h4>
                <p>${store.address}</p>
                <div class="store-stock">
                    <span class="stock-status ${store.inStock ? 'in-stock' : 'out-of-stock'}">
                        ${store.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                    ${store.inStock ? `<span class="stock-count">${store.stockCount} available</span>` : ''}
                </div>
                <div class="store-actions">
                    <button onclick="reserveItem(${store.id})">Reserve Item</button>
                    <button onclick="getDirections(${store.id})">Get Directions</button>
                </div>
            </div>
        `).join('');
    }

    async reserveItem(storeId) {
        try {
            const response = await fetch('/api/reserve-item', {
                method: 'POST',
                body: JSON.stringify({
                    storeId,
                    productId: this.productId
                })
            });
            const result = await response.json();
            this.showReservationConfirmation(result);
        } catch (error) {
            console.error('Reservation error:', error);
        }
    }
} 