// =========================================
// DIGITAL MOLECULES PRODUCT CATALOG ENGINE
// Version 1.0
// =========================================

const productsPerPage = 12;

let products = [];
let filteredProducts = [];
let currentPage = 1;

const grid = document.getElementById("productsGrid");
const searchInput = document.getElementById("searchInput");
const pagination = document.getElementById("pagination");

// ==============================
// Load Products
// ==============================

async function loadProducts() {

    try {

        const response = await fetch("data/products.json");

        products = await response.json();

        filteredProducts = [...products];

        renderProducts();

        renderPagination();

    } catch (error) {

        console.error("Unable to load products.");

    }

}

// ==============================
// Render Products
// ==============================

function renderProducts() {

    grid.innerHTML = "";

    const start = (currentPage - 1) * productsPerPage;

    const end = start + productsPerPage;

    const pageProducts = filteredProducts.slice(start, end);

    pageProducts.forEach(product => {

        grid.innerHTML += `

<div class="product-card">

<div class="structure">

<img src="images/products/${product.structureImage}"
alt="${product.name}">

</div>

<div class="product-content">

<h3>${product.name}</h3>

<div class="info-row">

<span class="info-title">
Catalog
</span>

<span>
${product.id}
</span>

</div>

<div class="info-row">

<span class="info-title">
Formula
</span>

<span>
${product.formula}
</span>

</div>

<div class="info-row">

<span class="info-title">
Mol. Weight
</span>

<span>
${product.molecularWeight}
</span>

</div>

<div class="info-row">

<span class="info-title">
CAS
</span>

<span>
${product.casNumber}
</span>

</div>

<span class="stock">

${product.stock}

</span>

<div class="product-buttons">

<a
href="product.html?id=${product.id}"
class="view-btn">

View Details

</a>

<a
href="contact.html"
class="quote-btn">

Request Quote

</a>

</div>

<div class="watermark">

DIGITAL MOLECULES

</div>

</div>

</div>

`;

    });

}
// ==============================
// Pagination
// ==============================

function renderPagination() {

    pagination.innerHTML = "";

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    if (totalPages <= 1) return;

    for (let i = 1; i <= totalPages; i++) {

        const button = document.createElement("button");

        button.textContent = i;

        if (i === currentPage) {
            button.classList.add("active");
        }

        button.addEventListener("click", () => {

            currentPage = i;

            renderProducts();

            renderPagination();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

        pagination.appendChild(button);

    }

}

// ==============================
// Search
// ==============================

searchInput.addEventListener("input", function () {

    const keyword = this.value.toLowerCase().trim();

    filteredProducts = products.filter(product => {

        return (
            product.name.toLowerCase().includes(keyword) ||
            product.id.toLowerCase().includes(keyword) ||
            product.casNumber.toLowerCase().includes(keyword) ||
            product.formula.toLowerCase().includes(keyword)
        );

    });

    currentPage = 1;

    renderProducts();

    renderPagination();

});

// ==============================
// Initialize
// ==============================

loadProducts();
