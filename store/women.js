document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
        const size = button.closest(".product-card").querySelector("#size").value;
        alert(`Added to cart with size: ${size}`);
    });
});
