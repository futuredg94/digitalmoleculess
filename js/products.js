/* =========================
   Digital Molecules V2.0
   Products Script
   ========================= */

(function () {
    "use strict";

    let products = [];
    let filteredProducts = [];

    document.addEventListener("DOMContentLoaded", init);

    async function init() {
        try {
            const response = await fetch("data/products.json");
            if (!response.ok) throw new Error("Failed to load product data");

            products = await response.json();
            filteredProducts = [...products];

            bindUI();
            renderProducts();
        } catch (error) {
            console.error(error);
            showError("Unable to load product catalog.");
        }
    }

    /* ===== UI Bindings ===== */
    function bindUI() {
        const searchInput = document.getElementById("search");
        const sortSelect = document.getElementById("sort");
        const resetBtn = document.getElementById("reset");

        if (searchInput) {
            searchInput.addEventListener("input", handleSearch);
        }

        if (sortSelect) {
            sortSelect.addEventListener("change", handleSort);
        }

        if (resetBtn) {
            resetBtn.addEventListener("click", resetFilters);
        }
    }

    /* ===== Search ===== */
    function handleSearch(e) {
        const query = e.target.value.toLowerCase().trim();

        filteredProducts = products.filter(p => {
            return (
                (p.name && p.name.toLowerCase().includes(query)) ||
                (p.cas && p.cas.toLowerCase().includes(query))
            );
        });

        applySort();
        renderProducts();
    }

    /* ===== Sort ===== */
    function handleSort() {
        applySort();
        renderProducts();
    }

    function applySort() {
        const sortValue = document.getElementById("sort").value;

        filteredProducts.sort((a, b) => {
            switch (sortValue) {
                case "name":
                    return a.name.localeCompare(b.name);

                case "name-desc":
                    return b.name.localeCompare(a.name);

                case "mw":
                    return (a.mw || 0) - (b.mw || 0);

                case "mw-desc":
                    return (b.mw || 0) - (a.mw || 0);

                default:
                    return 0;
            }
        });
    }

    /* ===== Reset ===== */
    function resetFilters() {
        document.getElementById("search").value = "";
        document.getElementById("sort").value = "name";

        filteredProducts = [...products];
        applySort();
        renderProducts();
    }

    /* ===== Render Products ===== */
    function renderProducts() {
    const grid = document.getElementById("product-grid");
    const countEl = document.getElementById("product-count");
    const emptyState = document.getElementById("empty-state");

    if (!grid) return;

    grid.innerHTML = "";

    if (!products.length) {
        grid.innerHTML = "<p>Loading products...</p>";
        return;
    }

    if (filteredProducts.length === 0) {
        emptyState.style.display = "block";
        countEl.textContent = "0 products found";
        return;
    } else {
        emptyState.style.display = "none";
    }

    countEl.textContent = `${filteredProducts.length} product${filteredProducts.length > 1 ? "s" : ""} found`;

    filteredProducts.forEach(product => {
        const card = createProductCard(product);
        grid.appendChild(card);
    });
}

    /* ===== Create Product Card ===== */
    function createProductCard(product) {
        const card = document.createElement("div");
        card.className = "product-card";

        const link = document.createElement("a");
        link.href = `product.html?id=${encodeURIComponent(product.id)}`;

        const imageWrapper = document.createElement("div");
        imageWrapper.className = "product-image";

        const img = document.createElement("img");
        img.src = product.image || "images/products/default.png";
        img.alt = product.name;

        imageWrapper.appendChild(img);

        const info = document.createElement("div");
        info.className = "product-info";

        const name = document.createElement("div");
        name.className = "product-name";
        name.textContent = product.name;

        const meta = document.createElement("div");
        meta.className = "product-meta";
        meta.textContent = buildMeta(product);

        info.appendChild(name);
        info.appendChild(meta);

        link.appendChild(imageWrapper);
        link.appendChild(info);

        card.appendChild(link);

        return card;
    }

    function buildMeta(product) {
        let parts = [];

        if (product.cas) parts.push(`CAS: ${product.cas}`);
        if (product.mw) parts.push(`MW: ${product.mw}`);

        return parts.join(" | ");
    }

    /* ===== Error Handling ===== */
    function showError(message) {
        const grid = document.getElementById("product-grid");
        if (grid) {
            grid.innerHTML = `<p>${message}</p>`;
        }
    }

})();
