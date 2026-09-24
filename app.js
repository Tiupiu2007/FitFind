const products = [
  { name: "Essential Oversize T-Shirt", store: "Urban Basics", category: "T-shirt", price: 19.99, color: "Nero", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=85", badge: "Best price" },
  { name: "Heavyweight Basic T-Shirt", store: "Streetwear Lab", category: "T-shirt", price: 24.90, color: "Bianco", image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=700&q=85", badge: "" },
  { name: "Oversize Hoodie", store: "Urban Basics", category: "Felpe", price: 39.99, color: "Grigio", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=85", badge: "−20%" },
  { name: "Zip Hoodie Essential", store: "Streetwear Lab", category: "Felpe", price: 44.90, color: "Nero", image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=700&q=85", badge: "" },
  { name: "Relaxed Cargo Pants", store: "Urban Basics", category: "Pantaloni", price: 49.99, color: "Nero", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=700&q=85", badge: "" },
  { name: "Wide Leg Trousers", store: "Minimal Wear", category: "Pantaloni", price: 35.00, color: "Grigio", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=700&q=85", badge: "Best price" },
  { name: "Daily Runner", store: "Streetwear Lab", category: "Scarpe", price: 59.99, color: "Bianco", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85", badge: "" },
  { name: "Minimal Sneakers", store: "Minimal Wear", category: "Scarpe", price: 69.90, color: "Nero", image: "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=700&q=85", badge: "" }
];

const searchInput = document.querySelector("#search");
const searchButton = document.querySelector("#go");
const maxPriceInput = document.querySelector("#max");
const sortSelect = document.querySelector("#sort");
const productGrid = document.querySelector("#grid");
const emptyState = document.querySelector("#empty");
const resultsTitle = document.querySelector("#title");

function normalize(text) {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function getProducts() {
  const query = normalize(searchInput.value.trim());
  const maxPrice = Number(maxPriceInput.value);

  let result = products.filter(product => {
    const searchable = normalize(
      [product.name, product.store, product.category, product.color].join(" ")
    );

    return (!query || searchable.includes(query)) &&
           (!maxPrice || product.price <= maxPrice);
  });

  if (sortSelect.value === "asc") result.sort((a, b) => a.price - b.price);
  if (sortSelect.value === "desc") result.sort((a, b) => b.price - a.price);

  return result;
}

function getBadgeClass(badge) {
  if (!badge) return "";
  return badge.toLowerCase().includes("%") ? "discount" : "best";
}

function renderBadge(badge, location) {
  if (!badge) return "";
  const icon = getBadgeClass(badge) === "discount" ? "↘" : "★";
  return `<span class="${location}-badge ${getBadgeClass(badge)}"><span class="badge-icon">${icon}</span>${badge}</span>`;
}

function renderProducts() {
  const result = getProducts();
  const query = searchInput.value.trim();

  resultsTitle.textContent = query ? `"${query}"` : "Tutto";

  productGrid.innerHTML = result.map(product => `
    <article class="card">
      <div class="visual">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        ${renderBadge(product.badge, "image")}
      </div>

      <div class="info">
        <div class="store">${product.store}</div>
        <h3 class="name">${product.name}</h3>

        <div class="meta">
          <span>${product.category}</span>
          <span>•</span>
          <span>${product.color}</span>
        </div>

        <div class="bottom">
          <div class="price-area">
            <span class="price">${product.price.toFixed(2).replace(".", ",")}€</span>
            ${renderBadge(product.badge, "price")}
          </div>
          <a class="view" href="#" onclick="return false;">Vedi</a>
        </div>
      </div>
    </article>
  `).join("");

  emptyState.classList.toggle("hidden", result.length !== 0);
  productGrid.classList.toggle("hidden", result.length === 0);
}

searchButton.addEventListener("click", renderProducts);

searchInput.addEventListener("keydown", event => {
  if (event.key === "Enter") renderProducts();
});

searchInput.addEventListener("input", renderProducts);
maxPriceInput.addEventListener("input", renderProducts);
sortSelect.addEventListener("change", renderProducts);

document.querySelectorAll("nav button").forEach(button => {
  button.addEventListener("click", () => {
    searchInput.value = button.dataset.q;
    renderProducts();
    document.querySelector(".results").scrollIntoView({ behavior: "smooth" });
  });
});

renderProducts();