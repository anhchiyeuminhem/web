const CART_STORAGE_KEY = 'mini_shop_cart';

const products = [
  { id: 1, name: 'Wireless Headphones', price: 1290000, category: 'Electronics', image: '🎧' },
  { id: 2, name: 'Smart Watch', price: 2490000, category: 'Electronics', image: '⌚' },
  { id: 3, name: 'Bluetooth Speaker', price: 890000, category: 'Electronics', image: '🔊' },
  { id: 4, name: 'Denim Jacket', price: 750000, category: 'Fashion', image: '🧥' },
  { id: 5, name: 'Running Shoes', price: 1150000, category: 'Fashion', image: '👟' },
  { id: 6, name: 'Baseball Cap', price: 190000, category: 'Fashion', image: '🧢' },
  { id: 7, name: 'JavaScript Handbook', price: 320000, category: 'Books', image: '📘' },
  { id: 8, name: 'Web Design Sketchbook', price: 150000, category: 'Books', image: '📓' }
];

let cart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]');
let activeCategory = 'All';
let searchQuery = '';

const productGrid = document.getElementById('productGrid');
const filterButtons = document.getElementById('filterButtons');
const searchInput = document.getElementById('searchInput');
const cartCountEl = document.getElementById('cartCount');
const cartTotalEl = document.getElementById('cartTotal');
const clearCartBtn = document.getElementById('clearCartBtn');

function formatVND(amount) {
  return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

function saveCart() {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  updateCartUI();
}

function updateCartUI() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  cartCountEl.textContent = totalItems;
  cartTotalEl.textContent = formatVND(totalPrice);
}

function renderProducts() {
  const filtered = products.filter((product) => {
    const matchCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  if (filtered.length === 0) {
    productGrid.innerHTML = '<p>No products found.</p>';
    return;
  }

  productGrid.innerHTML = filtered
    .map((product) => {
      const inCart = cart.find((item) => item.id === product.id);
      const btnLabel = inCart ? `Add to cart (${inCart.quantity} in cart)` : 'Add to cart';

      return `
        <article class="product-card" data-id="${product.id}">
          <div>
            <div class="product-image">${product.image}</div>
            <div class="product-category">${product.category}</div>
            <h3 class="product-name">${product.name}</h3>
            <div class="product-price">${formatVND(product.price)}</div>
          </div>
          <button class="add-to-cart-btn" type="button">${btnLabel}</button>
        </article>
      `;
    })
    .join('');
}

productGrid.addEventListener('click', (e) => {
  if (!e.target.classList.contains('add-to-cart-btn')) return;

  const card = e.target.closest('.product-card');
  if (!card) return;

  const productId = Number(card.dataset.id);
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const existingItem = cart.find((item) => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  renderProducts();
});

filterButtons.addEventListener('click', (e) => {
  if (!e.target.classList.contains('filter-btn')) return;

  document.querySelectorAll('.filter-btn').forEach((btn) => btn.classList.remove('active'));
  e.target.classList.add('active');

  activeCategory = e.target.dataset.category;
  renderProducts();
});

searchInput.addEventListener('input', (e) => {
  searchQuery = e.target.value.trim();
  renderProducts();
});

clearCartBtn.addEventListener('click', () => {
  cart = [];
  localStorage.removeItem(CART_STORAGE_KEY);
  updateCartUI();
  renderProducts();
});

updateCartUI();
renderProducts();