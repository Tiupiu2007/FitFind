const products = [
  {
    id: "essential-oversize-tshirt",
    name: "Essential Oversize T-Shirt",
    category: "T-shirt",
    color: "Nero",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=85",
    badge: "Best price",
    offers: [
      { store: "Urban Basics", price: 19.99, badge: "Best price", url: "#" },
      { store: "Streetwear Lab", price: 24.90, badge: "", url: "#" },
      { store: "Minimal Wear", price: 27.50, badge: "", url: "#" }
    ]
  },
  {
    id: "heavyweight-basic-tshirt",
    name: "Heavyweight Basic T-Shirt",
    category: "T-shirt",
    color: "Bianco",
    image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=700&q=85",
    badge: "",
    offers: [
      { store: "Streetwear Lab", price: 24.90, badge: "", url: "#" },
      { store: "Minimal Wear", price: 29.90, badge: "", url: "#" }
    ]
  },
  {
    id: "oversize-hoodie",
    name: "Oversize Hoodie",
    category: "Felpe",
    color: "Grigio",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=85",
    badge: "−20%",
    offers: [
      { store: "Urban Basics", price: 39.99, badge: "−20%", url: "#" },
      { store: "Minimal Wear", price: 44.90, badge: "", url: "#" }
    ]
  },
  {
    id: "zip-hoodie-essential",
    name: "Zip Hoodie Essential",
    category: "Felpe",
    color: "Nero",
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=700&q=85",
    badge: "",
    offers: [
      { store: "Streetwear Lab", price: 44.90, badge: "", url: "#" },
      { store: "Urban Basics", price: 49.99, badge: "", url: "#" }
    ]
  },
  {
    id: "relaxed-cargo-pants",
    name: "Relaxed Cargo Pants",
    category: "Pantaloni",
    color: "Nero",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=700&q=85",
    badge: "",
    offers: [
      { store: "Urban Basics", price: 49.99, badge: "", url: "#" },
      { store: "Streetwear Lab", price: 54.90, badge: "", url: "#" }
    ]
  },
  {
    id: "wide-leg-trousers",
    name: "Wide Leg Trousers",
    category: "Pantaloni",
    color: "Grigio",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=700&q=85",
    badge: "Best price",
    offers: [
      { store: "Minimal Wear", price: 35.00, badge: "Best price", url: "#" },
      { store: "Urban Basics", price: 42.90, badge: "", url: "#" }
    ]
  },
  {
    id: "daily-runner",
    name: "Daily Runner",
    category: "Scarpe",
    color: "Bianco",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85",
    badge: "",
    offers: [
      { store: "Streetwear Lab", price: 59.99, badge: "", url: "#" },
      { store: "Minimal Wear", price: 64.90, badge: "", url: "#" }
    ]
  },
  {
    id: "minimal-sneakers",
    name: "Minimal Sneakers",
    category: "Scarpe",
    color: "Nero",
    image: "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=700&q=85",
    badge: "",
    offers: [
      { store: "Minimal Wear", price: 69.90, badge: "", url: "#" },
      { store: "Streetwear Lab", price: 74.90, badge: "", url: "#" }
    ]
  }
];

const searchInput = document.querySelector("#search");
const searchButton = document.querySelector("#go");
const maxPriceInput = document.querySelector("#max");
const sortSelect = document.querySelector("#sort");
const productGrid = document.querySelector("#grid");
const emptyState = document.querySelector("#empty");
const resultsTitle = document.querySelector("#title");
const modal = document.querySelector("#product-modal");
const modalClose = document.querySelector("#modal-close");
const modalImage = document.querySelector("#modal-image");
const modalCategory = document.querySelector("#modal-category");
const modalTitle = document.querySelector("#modal-title");
const modalBestPrice = document.querySelector("#modal-best-price");
const offersList = document.querySelector("#offers");

function normalize(text) {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function getBestOffer(product) {
  return [...product.offers].sort((a, b) => a.price - b.price)[0];
}

function getProducts() {
  const query = normalize(searchInput.value.trim());
  const maxPrice = Number(maxPriceInput.value);

  let result = products.filter(product => {
    const searchable = normalize(
      [product.name, product.category, product.color, ...product.offers.map(offer => offer.store)].join(" ")
    );
    const bestPrice = getBestOffer(product).price;

    return (!query || searchable.includes(query)) &&
           (!maxPrice || bestPrice <= maxPrice);
  });

  if (sortSelect.value === "asc") {
    result.sort((a, b) => getBestOffer(a).price - getBestOffer(b).price);
  }

  if (sortSelect.value === "desc") {
    result.sort((a, b) => getBestOffer(b).price - getBestOffer(a).price);
  }

  return result;
}

function getBadgeClass(badge) {
  if (!badge) return "";
  return badge.includes("%") || badge.includes("−") ? "discount" : "best";
}

function renderBadge(badge, location) {
  if (!badge) return "";
  const icon = getBadgeClass(badge) === "discount" ? "↘" : "★";
  return `<span class="${location}-badge ${getBadgeClass(badge)}"><span class="badge-icon">${icon}</span>${badge}</span>`;
}

function formatPrice(price) {
  return `${price.toFixed(2).replace(".", ",")}€`;
}

function renderProducts() {
  const result = getProducts();
  const query = searchInput.value.trim();

  resultsTitle.textContent = query ? `"${query}"` : "Tutto";

  productGrid.innerHTML = result.map(product => {
    const best = getBestOffer(product);

    return `
      <article class="card" data-product-id="${product.id}">
        <div class="visual">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
          ${renderBadge(product.badge, "image")}
        </div>

        <div class="info">
          <div class="store">da ${best.store}</div>
          <h3 class="name">${product.name}</h3>

          <div class="meta">
            <span>${product.category}</span>
            <span>•</span>
            <span>${product.color}</span>
          </div>

          <div class="bottom">
            <div class="price-area">
              <span class="price">da ${formatPrice(best.price)}</span>
              ${renderBadge(best.badge || product.badge, "price")}
            </div>
            <button class="view" type="button">Confronta</button>
          </div>
        </div>
      </article>
    `;
  }).join("");

  emptyState.classList.toggle("hidden", result.length !== 0);
  productGrid.classList.toggle("hidden", result.length === 0);
}

function openProduct(productId) {
  const product = products.find(item => item.id === productId);
  if (!product) return;

  const sortedOffers = [...product.offers].sort((a, b) => a.price - b.price);
  const best = sortedOffers[0];

  modalImage.src = product.image;
  modalImage.alt = product.name;
  modalCategory.textContent = `${product.category} · ${product.color}`;
  modalTitle.textContent = product.name;
  modalBestPrice.textContent = formatPrice(best.price);

  offersList.innerHTML = sortedOffers.map((offer, index) => `
    <div class="offer ${index === 0 ? "best-offer" : ""}">
      <div>
        <strong>${offer.store}</strong>
        ${index === 0 ? '<span class="offer-label">Miglior prezzo</span>' : ""}
      </div>
      <div class="offer-right">
        <strong>${formatPrice(offer.price)}</strong>
        <a href="${offer.url}" class="offer-button" target="_blank" rel="noopener">Vedi offerta</a>
      </div>
    </div>
  `).join("");

  modal.classList.remove("hidden");
  document.body.classList.add("modal-open");
}

function closeProduct() {
  modal.classList.add("hidden");
  document.body.classList.remove("modal-open");
}

productGrid.addEventListener("click", event => {
  const card = event.target.closest(".card");
  if (!card) return;
  openProduct(card.dataset.productId);
});

modalClose.addEventListener("click", closeProduct);

modal.addEventListener("click", event => {
  if (event.target === modal) closeProduct();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !modal.classList.contains("hidden")) {
    closeProduct();
  }
});

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
